import { useEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { SkillsetPreview, type SkillsetPreviewVariant } from "@/components/ui/skillset-preview";
import { useSmoothScroll, useSmoothScrollProgress } from "@/components/smooth-scroll";

interface Skill {
  title: string;
  description: string;
  preview: SkillsetPreviewVariant;
}

const skills: Skill[] = [
  {
    title: "Web Design",
    description:
      "Thoughtful websites that bring brands to life, with clear structure and a seamless experience on every screen.",
    preview: "web",
  },
  {
    title: "UX | UI",
    description:
      "Intuitive interfaces built around real people, from user flows and prototypes to the final detail.",
    preview: "interface",
  },
  {
    title: "Graphic Design",
    description:
      "Distinctive identities and visual communication designed to make brands recognizable and memorable.",
    preview: "graphic",
  },
];

export function SkillsetSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { smoother } = useSmoothScroll();
  const hasTrackedPointer = useRef(false);
  const [canHover, setCanHover] = useState(false);
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const cursorEnabled = canHover && !reducedMotion;
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 78%", "start 6%"],
  });
  const smoothProgress = useSmoothScrollProgress(listRef, "top 78%", "top 6%", scrollYProgress);
  const revealLimit = useMotionValue(1);
  const revealProgress = useTransform(() =>
    Math.min(1, smoothProgress.get() / revealLimit.get()),
  );
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springOptions = { stiffness: 260, damping: 28, mass: 0.8 };
  const cursorX = useSpring(pointerX, springOptions);
  const cursorY = useSpring(pointerY, springOptions);
  const cursorVelocity = useVelocity(cursorX);
  const cursorRotation = useTransform(cursorVelocity, (velocity) =>
    Math.max(-14, Math.min(14, velocity * 0.0037)),
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measureScrollRange = () => {
      const listTop = list.getBoundingClientRect().top + (smoother?.scrollTop() ?? window.scrollY);
      const start = listTop - window.innerHeight * 0.78;
      const end = listTop - window.innerHeight * 0.06;
      const pageEnd = document.documentElement.scrollHeight - window.innerHeight;
      // Keep the final item readable when this section is followed only by the footer.
      const availableEnd = Math.min(end, pageEnd);
      revealLimit.set(Math.max(0.001, Math.min(1, (availableEnd - start) / (end - start))));
    };

    measureScrollRange();
    const observer = new ResizeObserver(measureScrollRange);
    observer.observe(document.body);
    window.addEventListener("resize", measureScrollRange);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureScrollRange);
    };
  }, [revealLimit, smoother]);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setCanHover(media.matches);
    updatePointer();
    media.addEventListener("change", updatePointer);
    return () => media.removeEventListener("change", updatePointer);
  }, []);

  useEffect(() => {
    if (!cursorEnabled) {
      setActiveSkill(null);
      hasTrackedPointer.current = false;
    }
  }, [cursorEnabled]);

  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    if (!cursorEnabled || event.pointerType !== "mouse") return;
    pointerX.set(event.clientX);
    pointerY.set(event.clientY);
    if (!hasTrackedPointer.current) {
      cursorX.jump(event.clientX);
      cursorY.jump(event.clientY);
      hasTrackedPointer.current = true;
    }
  };

  return (
    <section
      id="skillset"
      aria-labelledby="skillset-heading"
      className="min-h-[100svh] w-full bg-[#0D0D0B] py-16 text-[#F7F5F0] selection:bg-[#283EC9] selection:text-white lg:pb-32 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-12">
        <h2
          id="skillset-heading"
          className="mb-8 text-[clamp(2.5rem,6vw,6rem)] font-medium leading-[1.05] tracking-[-0.065em] sm:mb-10"
        >
          Skillset
        </h2>

        <ol
          ref={listRef}
          className="skillset-list overflow-hidden border-t border-[#918E89]"
          onPointerMove={trackPointer}
          onPointerLeave={() => {
            setActiveSkill(null);
            hasTrackedPointer.current = false;
          }}
        >
          {skills.map((skill, index) => (
            <SkillRow
              key={skill.title}
              skill={skill}
              index={index}
              progress={revealProgress}
              reducedMotion={reducedMotion}
              dimmed={cursorEnabled && activeSkill !== null && activeSkill !== index}
              onPointerEnter={(event) => {
                if (cursorEnabled && event.pointerType === "mouse") {
                  trackPointer(event);
                  setActiveSkill(index);
                }
              }}
            />
          ))}
        </ol>
      </div>

      {cursorEnabled && createPortal(
        <div aria-hidden="true" className="skillset-cursor pointer-events-none fixed inset-0 z-10 overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 will-change-transform"
            style={{ x: cursorX, y: cursorY, rotate: cursorRotation }}
          >
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                data-preview={skill.preview}
                data-visible={activeSkill === index}
                className="skillset-preview absolute left-0 top-0 h-[220px] w-[320px] overflow-hidden border border-white/10 shadow-2xl shadow-black/30"
              >
                <SkillsetPreview variant={skill.preview} />
              </div>
            ))}
          </motion.div>
        </div>,
        document.body,
      )}
    </section>
  );
}

function SkillRow({
  skill,
  index,
  progress,
  reducedMotion,
  dimmed,
  onPointerEnter,
}: {
  skill: Skill;
  index: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  dimmed: boolean;
  onPointerEnter: (event: PointerEvent<HTMLLIElement>) => void;
}) {
  const reveal = useTransform(progress, (value) => {
    const localProgress = Math.max(0, Math.min(1, value * skills.length - index));
    return 1 - Math.pow(1 - localProgress, 3);
  });
  const offset = useTransform(reveal, [0, 1], ["28%", "0%"]);

  return (
    <li className="skillset-row" onPointerEnter={onPointerEnter}>
      <motion.div
        className="skillset-row-reveal will-change-transform"
        style={{ opacity: reducedMotion ? 1 : reveal, x: reducedMotion ? "0%" : offset }}
      >
        <div
          data-dimmed={dimmed}
          className="skillset-row-content grid grid-cols-[2rem_minmax(0,1fr)] gap-x-5 gap-y-3 py-8 lg:min-h-[160px] lg:grid-cols-[5.5rem_minmax(0,1.25fr)_minmax(0,1fr)] lg:items-baseline lg:gap-x-6 lg:gap-y-0 lg:py-12"
        >
          <span aria-hidden="true" className="pt-1.5 text-xs text-[#A7A39D] sm:text-sm lg:pt-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-[clamp(1.75rem,2.5vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.04em]">
            {skill.title}
          </h3>
          <p className="col-start-2 text-sm leading-[1.7] text-[#D6D3CE] sm:text-[15px] lg:col-start-3">
            {skill.description}
          </p>
        </div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="skillset-row-rule h-px w-full origin-right bg-[#918E89]"
        style={{ scaleX: reducedMotion ? 1 : reveal }}
      />
    </li>
  );
}
