import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { createPortal } from "react-dom";
import { HoverWaveText } from "@/components/ui/hover-wave-text";
import { useSmoothScrollLock } from "@/components/smooth-scroll";
import { contactEmail } from "@/data/contact";
import styles from "./site-header.module.css";

const menuLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skillset", href: "#skillset" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader({ contentRef }: { contentRef: RefObject<HTMLDivElement> }) {
  const [open, setOpen] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  useSmoothScrollLock(open);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.inert = !open;
    if (!open) return;

    const previousFocus = document.activeElement;
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const inactiveBranches: { element: HTMLElement; inert: boolean }[] = [];

    // Keep the header and menu interactive while the rest of the page is inactive.
    let branch: HTMLElement | null = placeholderRef.current;
    while (branch && branch !== contentRef.current && branch.parentElement) {
      const parent: HTMLElement = branch.parentElement;
      for (const sibling of Array.from(parent.children)) {
        if (!(sibling instanceof HTMLElement) || sibling === branch ||
          sibling === frameRef.current || sibling === scrimRef.current) continue;
        inactiveBranches.push({ element: sibling, inert: sibling.inert });
        sibling.inert = true;
      }
      branch = parent;
    }

    if (scrollbarWidth > 0) {
      const padding = Number.parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${padding + scrollbarWidth}px`;
    }
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    panel.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === "Tab") {
        const controls = [
          ...Array.from(panel!.querySelectorAll<HTMLElement>("a[href], button")),
          triggerRef.current,
        ].filter((element): element is HTMLElement => element !== null);
        const index = controls.indexOf(document.activeElement as HTMLElement);
        const next = index < 0 ? (event.shiftKey ? controls.length - 1 : 0) :
          (index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
        event.preventDefault();
        controls[next]?.focus({ preventScroll: true });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousPaddingRight;
      inactiveBranches.forEach(({ element, inert }) => { element.inert = inert; });
      if (previousFocus instanceof HTMLElement && previousFocus !== document.body && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      } else triggerRef.current?.focus({ preventScroll: true });
    };
  }, [open, contentRef]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  const header = (
      <header data-menu-open={open} className={`${styles.header} hero-header mx-auto flex h-[74px] w-full max-w-[1440px] shrink-0 items-center justify-between px-6 sm:px-10 lg:px-12`}>
        <a href="#home" onClick={() => setOpen(false)} className={`${styles.brand} text-sm font-semibold uppercase tracking-widest`}>
          YURLZ®
        </a>
        <button
          ref={triggerRef}
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
          className={styles.trigger}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>
  );

  return (
    <>
      <div ref={placeholderRef} className="h-[74px] shrink-0">{!open && header}</div>
      {open && createPortal(header, document.body)}
      {createPortal(<>
      <div ref={scrimRef} aria-hidden="true" className={styles.scrim} data-menu-scrim={open ? "open" : "closed"} onClick={() => setOpen(false)} />
      <div ref={frameRef} className={styles.frame}>
        <nav
          id="site-menu"
          ref={panelRef}
          aria-label="Menu principal"
          aria-hidden={!open}
          tabIndex={-1}
          data-menu={open ? "open" : "closed"}
          className={styles.panel}
        >
          <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 sm:px-10 lg:px-12">
            <ul>
              {menuLinks.map(({ label, href }, index) => (
                <li key={href} data-menu-item style={{ "--menu-i": index } as CSSProperties}>
                  <a href={href} onClick={() => setOpen(false)} tabIndex={open ? undefined : -1} className={`${styles.link} hover-wave`}>
                    <HoverWaveText text={label} />
                  </a>
                </li>
              ))}
            </ul>
            <div data-menu-item style={{ "--menu-i": menuLinks.length } as CSSProperties} className={styles.email}>
              <a href={`mailto:${contactEmail}`} onClick={() => setOpen(false)} tabIndex={open ? undefined : -1}>
                {contactEmail}
              </a>
            </div>
          </div>
        </nav>
      </div>
      </>, document.body)}
    </>
  );
}
