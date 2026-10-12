import { useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { ProjectPage } from "@/components/project-page";
import { projectFromHash } from "@/data/project-case-studies";
import { ScrollSmoother, ScrollTrigger } from "@/lib/gsap";
import "./project-page.css";
import { useLanguage } from "@/i18n/language-context";

export function PortfolioRouter({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [project, setProject] = useState(() => projectFromHash(location.hash));
  const projectRef = useRef(project);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = project ? `${project.name} — Yurlz Studio` : t.pageTitle;
    return () => { document.title = previousTitle; };
  }, [project, t.pageTitle]);

  useEffect(() => {
    function navigate(hash: string, updateHistory: boolean) {
      const next = projectFromHash(hash);
      if (next?.id === projectRef.current?.id) return;

      if (updateHistory) history.pushState(null, "", hash || "#home");
      projectRef.current = next;
      ScrollTrigger.clearScrollMemory("manual");
      flushSync(() => setProject(next));
      window.scrollTo({ top: 0, behavior: "instant" });
      ScrollSmoother.get()?.scrollTop(0);
      ScrollTrigger.refresh();

      if (next) {
        document.getElementById("project-title")?.focus({ preventScroll: true });
        return;
      }
      const target = document.getElementById(hash.replace(/^#/, "") || "home");
      if (!target) return;
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.scrollTo(target, false, "top top");
      else target.scrollIntoView({ block: "start", behavior: "instant" });
    }

    function handleLink(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return;
      if (!projectFromHash(url.hash) && !(projectRef.current && /^#(?:home|projects|about|skillset|contact)$/.test(url.hash))) return;
      event.preventDefault();
      navigate(url.hash, true);
    }
    function handleHistory() { navigate(location.hash, false); }

    document.addEventListener("click", handleLink);
    window.addEventListener("popstate", handleHistory);
    window.addEventListener("hashchange", handleHistory);
    return () => {
      document.removeEventListener("click", handleLink);
      window.removeEventListener("popstate", handleHistory);
      window.removeEventListener("hashchange", handleHistory);
    };
  }, []);

  return project ? <ProjectPage key={project.id} project={project} /> : children;
}
