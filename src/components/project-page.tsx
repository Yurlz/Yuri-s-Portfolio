import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll, useSmoothScroll } from "@/components/smooth-scroll";
import { StudioFooter, StudioPolicyDialog, type StudioPolicy } from "@/components/studio-footer";
import { HoverWaveText } from "@/components/ui/hover-wave-text";
import { getProjectCaseStudy, projectPath } from "@/data/project-case-studies";
import { projects, type Project } from "@/data/projects";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function ProjectCase({ project }: { project: Project }) {
  const layoutRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { smoother } = useSmoothScroll();
  const study = getProjectCaseStudy(project);
  const hasCustomGallery = Boolean(study.gallery?.length);
  const showProjectArtwork = !hasCustomGallery || study.preserveArtwork === true;
  const index = projects.findIndex((item) => item.id === project.id);
  const next = projects[(index + 1) % projects.length];

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(infoRef.current!.querySelectorAll("[data-project-intro]"), {
        y: 30, opacity: 0, duration: 0.85, stagger: 0.075, ease: "power3.out", delay: 0.2,
      });
      layoutRef.current!.querySelectorAll<HTMLElement>("[data-project-image]").forEach((element) => {
        gsap.from(element, {
          opacity: 0, y: 35, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
      });
    }, layoutRef);
    let active = true;
    void document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); };
  }, [project.id]);

  useLayoutEffect(() => {
    if (!smoother) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({
        trigger: layoutRef.current,
        start: "top 94px",
        end: "bottom bottom",
        pin: infoRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    }, layoutRef);
    return () => media.revert();
  }, [smoother, project.id]);

  useEffect(() => {
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    const gallery = layoutRef.current?.querySelector(".project-case-gallery");
    if (gallery) observer.observe(gallery);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return (
    <article ref={layoutRef} className="project-case-layout" data-case-smooth={Boolean(smoother)}>
      <div ref={infoRef} className="project-case-info">
        <div>
          <div className="project-case-top" data-project-intro>
            <a href="#projects" className="project-case-back hover-wave"><ArrowLeft size={14} aria-hidden="true" /><HoverWaveText text="All projects" /></a>
            <span className="project-case-number">{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          </div>
          <div className="project-case-title-mask"><h1 id="project-title" tabIndex={-1} data-project-intro>{project.name}</h1></div>
          <div className="project-case-description">
            <div className="project-case-year" data-project-intro>
              <p>[ {project.year ?? "Selected work"} ]</p>
              {project.timeline && <p className="project-case-duration">{project.timeline}</p>}
            </div>
            <div>
              <ul className="project-case-disciplines" aria-label="Project disciplines" data-project-intro>
                {study.disciplines.map((discipline) => <li key={discipline}>{discipline}</li>)}
              </ul>
              <p className="project-case-summary" data-project-intro>{study.description}</p>
              {project.team && <p className="project-case-team" data-project-intro><span>Team</span>{project.team}</p>}
              {project.href && <a href={project.href} target="_blank" rel="noreferrer" className="project-case-visit hover-wave" data-project-intro><HoverWaveText text={project.hrefLabel ?? "Visit project"} /><ArrowUpRight size={16} aria-hidden="true" /></a>}
            </div>
          </div>
        </div>
      </div>

      <div className="project-case-gallery" aria-label={`${project.name} project gallery`}>
        {showProjectArtwork && project.image && <figure className="project-case-artwork" data-project-image>
          <img src={project.image} alt={`${project.name} — project artwork`} loading="eager" decoding="async" onLoad={() => ScrollTrigger.refresh()} />
        </figure>}

        {(!hasCustomGallery || study.preservePalette === true) && <figure className="project-case-artwork" data-project-image>
          <div className="project-case-palette" aria-label={`${project.name} colour palette`}>
            {study.palette.map((colour) => <div key={colour} style={{ backgroundColor: colour }}>
              <span className="project-case-colour" style={{ color: Number.parseInt(colour.slice(1, 3), 16) * 0.299 + Number.parseInt(colour.slice(3, 5), 16) * 0.587 + Number.parseInt(colour.slice(5, 7), 16) * 0.114 > 150 ? "#1a1a1a" : "#f7f5f0" }}>{colour}</span>
            </div>)}
          </div>
        </figure>}

        {study.gallery?.map((image, imageIndex) => <figure className="project-case-artwork" key={image.src} data-project-image>
          <img src={image.src} alt={image.alt} loading={imageIndex === 0 && !showProjectArtwork ? "eager" : "lazy"} decoding="async" onLoad={() => ScrollTrigger.refresh()} />
        </figure>)}

        {showProjectArtwork && project.image && <figure className="project-case-artwork" data-project-image>
          <div className="project-case-detail-image"><img src={project.image} alt={`Detail of the ${project.name} visual identity`} loading="lazy" /></div>
        </figure>}

        <nav className="project-case-gallery-nav" aria-label="More projects">
          <a href="#projects" className="hover-wave"><ArrowLeft size={16} aria-hidden="true" /><HoverWaveText text="All projects" /></a>
          <a href={projectPath(next)} className="hover-wave"><HoverWaveText text={next.name} /><ArrowRight size={16} aria-hidden="true" /></a>
        </nav>
      </div>
    </article>
  );
}

export function ProjectPage({ project }: { project: Project }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [policy, setPolicy] = useState<StudioPolicy | null>(null);

  return (
    <SmoothScroll enabled contentRef={contentRef}>
      <div id="smooth-content" ref={contentRef} className="project-case-page selection:bg-black selection:text-white">
        <SiteHeader contentRef={contentRef} fixed />
        <main className="project-case-container"><ProjectCase project={project} /></main>
        <StudioFooter onPolicyClick={setPolicy} />
        <StudioPolicyDialog policy={policy} onClose={() => setPolicy(null)} />
      </div>
    </SmoothScroll>
  );
}
