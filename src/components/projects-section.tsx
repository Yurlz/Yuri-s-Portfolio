import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProjectWaveText } from "@/components/ui/project-wave-text";
import { projects, type Project } from "@/data/projects";
import { projectPath } from "@/data/project-case-studies";
import { cn } from "@/lib/utils";

function ProjectPreview({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Preview of ${project.name}`}
        loading="lazy"
        className="aspect-[3/2] h-full w-full object-cover"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={project.name}
      className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: project.coverBackground, color: project.coverForeground }}
    >
      <div aria-hidden="true" className="absolute inset-5 border border-current opacity-20" />
      <span aria-hidden="true" className="text-5xl font-medium tracking-[-0.065em] sm:text-6xl">
        {project.name}
      </span>
      <span aria-hidden="true" className="absolute bottom-8 left-8 text-[10px] tracking-[0.18em]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span aria-hidden="true" className="absolute right-8 top-8 h-2 w-2 rounded-full bg-current" />
    </div>
  );
}

export function ProjectsSection() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 1024px) and (hover: hover)").matches);
  const [activeProject, setActiveProject] = useState<string | null>(() => isDesktop ? projects[0]?.id ?? null : null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const updateLayout = () => {
      setIsDesktop(media.matches);
      setActiveProject(media.matches ? projects[0]?.id ?? null : null);
    };

    updateLayout();
    media.addEventListener("change", updateLayout);
    return () => media.removeEventListener("change", updateLayout);
  }, []);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-12 sm:px-10 sm:pt-16 lg:px-12"
    >
      <h2
        id="projects-heading"
        className="mb-8 text-[clamp(2.5rem,6vw,6rem)] font-medium leading-[1.05] tracking-[-0.065em] text-black sm:mb-10"
      >
        Selected Projects
      </h2>

      <div
        className="project-list border-t border-neutral-300"
        onPointerLeave={(event) => {
          if (
            event.pointerType === "mouse" &&
            !event.currentTarget.querySelector("a:focus-visible")
          ) {
            setActiveProject(isDesktop ? projects[0]?.id ?? null : null);
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setActiveProject(isDesktop ? projects[0]?.id ?? null : null);
          }
        }}
      >
        {projects.map((project, index) => {
          const isActive = !isDesktop || activeProject === project.id;
          const fields = [
            { label: "Role", value: project.role },
            { label: "Timeline", value: project.timeline },
            { label: "Years", value: project.year },
            { label: "Team", value: project.team },
          ];

          return (
            <article
              key={project.id}
              data-active={isActive}
              className="project-row relative overflow-hidden border-b border-neutral-300 py-6"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") {
                  setActiveProject(project.id);
                }
              }}
              onFocus={() => setActiveProject(project.id)}
            >
              <h3 className="lg:mr-[370px]">
                <a
                  href={projectPath(project)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  <span
                    className={cn(
                      "project-name text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.045em] transition-colors duration-300",
                      isActive ? "text-[#283EC9]" : "text-neutral-500",
                    )}
                  >
                    <ProjectWaveText text={project.name} />
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "project-action flex shrink-0 items-center gap-3 border px-3 py-2.5 text-xs font-medium transition-colors duration-300 sm:gap-4 sm:px-4 sm:text-sm",
                      isActive ? "border-black text-black" : "border-neutral-300 text-neutral-400",
                    )}
                  >
                    <ProjectWaveText text="View project" />
                    <ArrowRight className="h-4 w-4 stroke-[1.5] transition-transform duration-300" />
                  </span>
                </a>
              </h3>

              <div
                id={`project-details-${project.id}`}
                aria-hidden={!isActive}
                className="project-expanded"
              >
                <div className="project-expanded-inner">
                  <dl className="project-details mt-8 grid grid-cols-2 gap-x-6 gap-y-5 lg:absolute lg:bottom-6 lg:left-0 lg:right-[370px] lg:mt-0 lg:grid-cols-[minmax(0,2fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1.1fr)] lg:gap-x-6">
                    {fields.map((field) => (
                      <div key={field.label} className="min-w-0">
                        <dt className="mb-2 text-[10px] font-normal uppercase tracking-[0.07em] text-neutral-500 sm:text-[11px]">
                          <ProjectWaveText text={field.label} />
                        </dt>
                        <dd className="text-sm leading-snug text-black">
                          <ProjectWaveText text={field.value ?? "—"} />
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="project-preview mt-6 w-full lg:absolute lg:right-0 lg:top-6 lg:mt-0 lg:w-[330px]">
                    <a
                      href={projectPath(project)}
                      aria-label={`Open ${project.name} project`}
                      tabIndex={isActive ? 0 : -1}
                      className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                    >
                      <ProjectPreview project={project} index={index} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
