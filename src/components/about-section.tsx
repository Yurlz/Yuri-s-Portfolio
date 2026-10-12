import { useLayoutEffect, useRef } from "react";
import { useMotionValue, useScroll, useTransform } from "framer-motion";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { ScrollTrigger } from "@/lib/gsap";
import { useLanguage } from "@/i18n/language-context";

const designTools = [
  { name: "Figma", icon: "figma" },
  { name: "Adobe", icon: "adobe" },
  { name: "Photoshop", icon: "adobephotoshop" },
  { name: "Illustrator", icon: "adobeillustrator" },
  { name: "Framer", icon: "framer" },
  { name: "Webflow", icon: "webflow" },
];

const developmentTools = [
  { name: "React", icon: "react" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Vite", icon: "vite" },
  { name: "GitHub", icon: "github" },
  { name: "WordPress", icon: "wordpress" },
];

export function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { smoother } = useSmoothScroll();
  const smoothProgress = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const textProgress = useTransform(smoother ? smoothProgress : scrollYProgress, [0, 0.9], [0, 1]);

  useLayoutEffect(() => {
    if (!smoother || !sectionRef.current || !panelRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: panelRef.current,
      pinType: "transform",
      pinSpacing: false,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => smoothProgress.set(self.progress),
      onRefresh: (self) => smoothProgress.set(self.progress),
    });
    smoothProgress.set(trigger.progress);
    return () => trigger.kill();
  }, [smoother, smoothProgress]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label={t.about.label}
      data-smooth={Boolean(smoother)}
      className="about-scroll-section relative h-[260svh]"
    >
      <div ref={panelRef} className="about-sticky-panel sticky top-0 flex h-[100svh] items-center">
        <div className="about-content mx-auto w-full max-w-[1440px] px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-16">
          <TextGradientScroll
            text={t.about.introduction}
            type="letter"
            textOpacity="medium"
            scrollProgress={textProgress}
            highlightColor="#283EC9"
            className="about-copy mx-auto max-w-[1140px] text-center text-[clamp(1.625rem,2.4vw,2.5rem)] font-medium leading-[1.3] tracking-[-0.04em] text-black"
          />

          <div className="about-tools mt-8 border-t border-neutral-300 pt-6 sm:mt-16 sm:pt-10">
            <p className="mb-5 text-center text-[10px] font-normal uppercase tracking-[0.08em] text-neutral-500 sm:mb-6 sm:text-xs">
              {t.about.tools}
            </p>
            <div className="about-logo-rows flex flex-col gap-5 sm:gap-8">
              <LogoMarquee logos={designTools} direction="right" label={t.about.designTools} />
              <LogoMarquee
                logos={developmentTools}
                direction="left"
                label={t.about.developmentTools}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
