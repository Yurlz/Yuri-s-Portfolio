import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { HoverWaveText } from "@/components/ui/hover-wave-text";
import { contactEmail, socialLinks } from "@/data/contact";
import { useSmoothScrollLock } from "@/components/smooth-scroll";

export type StudioPolicy = "privacy" | "terms";

export function StudioFooter({ onPolicyClick }: { onPolicyClick: (policy: StudioPolicy) => void }) {
  const reducedMotion = useReducedMotion() ?? false;
  const links = socialLinks.length ? socialLinks : [
    { label: "PROJECTS", href: "#projects" },
    { label: "ABOUT", href: "#about" },
  ];

  return (
    <footer className="studio-footer">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-12">
        <motion.a
          href="#home"
          className="footer-wordmark"
          aria-label="Yurlz Studio — back to top"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 1400 166" aria-hidden="true" className="footer-wordmark-svg">
            <text x="0" y="141" textLength="1240" lengthAdjust="spacingAndGlyphs">YURLZ.STUDIO</text>
            <circle cx="1333" cy="90" r="62" fill="none" stroke="currentColor" strokeWidth="11" />
            <text x="1333" y="124" textAnchor="middle" className="footer-registered">R</text>
          </svg>
        </motion.a>

        <div className="footer-content">
          <p className="footer-tagline">SOMEWHERE BETWEEN<br />STRUCTURE AND INSTINCT.</p>
          <nav className="footer-links" aria-label="Footer">
            <a className="hover-wave" href={`mailto:${contactEmail}`}>
              <HoverWaveText text={contactEmail.toUpperCase()} />
            </a>
            {links.map((link) => (
              <a
                key={link.label}
                className="hover-wave"
                href={link.href}
                target={link.href.startsWith("https:") ? "_blank" : undefined}
                rel={link.href.startsWith("https:") ? "noopener noreferrer" : undefined}
              >
                <HoverWaveText text={link.label} />
              </a>
            ))}
            <button className="hover-wave" type="button" onClick={() => onPolicyClick("privacy")}>
              <HoverWaveText text="PRIVACY" />
            </button>
            <button className="hover-wave" type="button" onClick={() => onPolicyClick("terms")}>
              <HoverWaveText text="TERMS" />
            </button>
          </nav>
        </div>
        <p className="footer-copyright">© {new Date().getFullYear()} Yurlz Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function StudioPolicyDialog({ policy, onClose }: { policy: StudioPolicy | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useSmoothScrollLock(Boolean(policy));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (policy && !dialog.open) dialog.showModal();
    if (!policy && dialog.open) dialog.close();
    if (!policy) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [policy]);

  return (
    <dialog
      ref={dialogRef}
      className="studio-policy"
      aria-labelledby="studio-policy-heading"
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
    >
      <button type="button" className="studio-policy-close" onClick={onClose} aria-label="Close">
        <X aria-hidden="true" size={22} />
      </button>
      <p className="contact-eyebrow">YURLZ.STUDIO®</p>
      <h2 id="studio-policy-heading">{policy === "terms" ? "Terms of use" : "Privacy"}</h2>
      {policy === "terms" ? (
        <>
          <p>This portfolio presents design work by Yuri Rocha / Yurlz Studio. The work is shown for reference and remains the property of its respective owners.</p>
          <p>Sending an inquiry starts a conversation. Project scope, timelines, pricing, and usage rights are agreed separately before work begins.</p>
        </>
      ) : (
        <>
          <p>The contact form prepares a message in your own email app. This website does not submit or store the details you enter in the form.</p>
          <p>If you send that email, your name, email address, and any details you include are used to reply to your inquiry. For questions about your message, write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
        </>
      )}
    </dialog>
  );
}
