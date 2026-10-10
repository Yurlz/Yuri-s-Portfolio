import {
  createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState,
  type ReactNode, type RefObject,
} from "react";
import { useMotionValue, type MotionValue } from "framer-motion";
import { gsap, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";

type SmoothScrollContextValue = {
  smoother: ScrollSmoother | null;
  lock: () => () => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  smoother: null,
  lock: () => () => undefined,
});

export function SmoothScroll({ children, contentRef, enabled }: {
  children: ReactNode;
  contentRef: RefObject<HTMLDivElement>;
  enabled: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const locksRef = useRef(new Set<symbol>());
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

  const lock = useCallback(() => {
    const token = Symbol("scroll-lock");
    locksRef.current.add(token);
    smootherRef.current?.paused(true);
    return () => {
      locksRef.current.delete(token);
      if (locksRef.current.size === 0) smootherRef.current?.paused(false);
    };
  }, []);

  useLayoutEffect(() => {
    if (!enabled || !wrapperRef.current || !contentRef.current) return;
    const media = gsap.matchMedia();
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let restoreFrame = 0;
    media.add("(prefers-reduced-motion: no-preference)", (context) => {
      window.cancelAnimationFrame(restoreFrame);
      const previousBodyHeight = document.body.style.height;
      let lastPosition = 0;
      let instance!: ScrollSmoother;
      // Own cleanup so the current position is captured before GSAP reverts the scroller.
      context.ignore(() => {
        instance = ScrollSmoother.create({
          wrapper: wrapperRef.current!,
          content: contentRef.current!,
          smooth: 1.05,
          smoothTouch: 0.12,
          ease: "power3.out",
          effects: false,
          onFocusIn: (self, event) => {
            // Menu/dialog focus must not move the portfolio underneath the overlay.
            if (locksRef.current.size || !(event.target instanceof Node) ||
              !contentRef.current?.contains(event.target)) return false;
            return !self.paused();
          },
        });
      });
      smootherRef.current = instance;
      lastPosition = instance.scrollTop();
      function trackPosition() {
        // Capture direct anchor jumps too, before reduced-motion layout changes can clamp scrolling.
        if (!motionPreference.matches) lastPosition = instance.scrollTop();
      }
      gsap.ticker.add(trackPosition);
      if (locksRef.current.size) instance.paused(true);
      setSmoother(instance);

      let sections: { element: HTMLElement; top: number }[] = [];
      let measureFrame = 0;
      function measureSections() {
        const position = instance.scrollTop();
        sections = Array.from(contentRef.current!.querySelectorAll<HTMLElement>("main > section"))
          .map((element) => ({ element, top: element.getBoundingClientRect().top + position }));
      }
      function refreshSections() {
        window.cancelAnimationFrame(measureFrame);
        measureFrame = window.requestAnimationFrame(measureSections);
      }
      measureSections();
      ScrollTrigger.addEventListener("refresh", refreshSections);
      return () => {
        const position = motionPreference.matches ? lastPosition : instance.scrollTop();
        gsap.ticker.remove(trackPosition);
        const anchor = [...sections].reverse().find((section) => section.top <= position);
        window.cancelAnimationFrame(measureFrame);
        ScrollTrigger.removeEventListener("refresh", refreshSections);
        if (ScrollSmoother.get() === instance) instance.kill();
        smootherRef.current = null;
        setSmoother(null);
        // Reduced motion shortens About; retain the visible section rather than an old page offset.
        let destination = position;
        if (anchor?.element.isConnected) {
          const rect = anchor.element.getBoundingClientRect();
          const offset = Math.min(position - anchor.top, Math.max(0, rect.height - 1));
          destination = rect.top + window.scrollY + offset;
        }
        // MatchMedia refreshes ScrollTrigger after cleanup; restore once that refresh ends.
        restoreFrame = window.requestAnimationFrame(() => {
          if (smootherRef.current) return;
          document.body.style.height = previousBodyHeight;
          window.scrollTo({ top: destination, behavior: "instant" });
        });
      };
    });
    return () => {
      media.revert();
      window.cancelAnimationFrame(restoreFrame);
    };
  }, [enabled, contentRef]);

  useEffect(() => {
    if (!enabled) return;
    const previousRestoration = history.scrollRestoration;
    ScrollTrigger.clearScrollMemory("manual");
    let frame = 0;
    function navigate(target: HTMLElement, animated: boolean) {
      window.cancelAnimationFrame(frame);
      // Wait for a menu to close and release its scroll lock before navigating.
      frame = window.requestAnimationFrame(() => {
        const instance = smootherRef.current;
        if (instance) instance.scrollTo(target, animated, "top top");
        else target.scrollIntoView({
          behavior: animated && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant",
          block: "start",
        });
      });
    }

    function targetForHash(hash: string) {
      try { return document.getElementById(decodeURIComponent(hash.slice(1))) ?? null; }
      catch { return null; }
    }

    function handleAnchor(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      const target = targetForHash(url.hash);
      if (!target) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      navigate(target, true);
    }

    function restoreHash() {
      const target = targetForHash(location.hash || "#home");
      if (target) navigate(target, false);
    }

    if (location.hash) restoreHash();
    document.addEventListener("click", handleAnchor);
    window.addEventListener("popstate", restoreHash);
    window.addEventListener("hashchange", restoreHash);
    return () => {
      ScrollTrigger.clearScrollMemory(previousRestoration);
      window.cancelAnimationFrame(frame);
      document.removeEventListener("click", handleAnchor);
      window.removeEventListener("popstate", restoreHash);
      window.removeEventListener("hashchange", restoreHash);
    };
  }, [enabled]);

  const value = useMemo(() => ({ smoother, lock }), [smoother, lock]);
  return (
    <SmoothScrollContext.Provider value={value}>
      <div ref={wrapperRef} id="smooth-wrapper">{children}</div>
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function useSmoothScrollLock(locked: boolean) {
  const { lock } = useSmoothScroll();
  useLayoutEffect(() => locked ? lock() : undefined, [locked, lock]);
}

/** Keep existing Motion animations aligned with the content's smoothed position. */
export function useSmoothScrollProgress(
  target: RefObject<HTMLElement>, start: string, end: string, nativeProgress: MotionValue<number>,
) {
  const { smoother } = useSmoothScroll();
  const progress = useMotionValue(0);
  useLayoutEffect(() => {
    if (!smoother || !target.current) return;
    const trigger = ScrollTrigger.create({
      trigger: target.current,
      start,
      end,
      onUpdate: (self) => progress.set(self.progress),
      onRefresh: (self) => progress.set(self.progress),
    });
    progress.set(trigger.progress);
    return () => trigger.kill();
  }, [smoother, target, start, end, progress]);
  return smoother ? progress : nativeProgress;
}
