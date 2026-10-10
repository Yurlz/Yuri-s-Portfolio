"use client";

import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

type TextOpacity = "none" | "soft" | "medium";
type ViewType = "word" | "letter";

export interface TextGradientScrollProps {
  text: string;
  type?: ViewType;
  className?: string;
  textOpacity?: TextOpacity;
  scrollProgress?: MotionValue<number>;
  highlightColor?: string;
}

interface RevealProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const TextGradientScrollContext = createContext({
  textOpacity: "soft" as TextOpacity,
  reducedMotion: false,
  highlightColor: null as string | null,
});

export function TextGradientScroll({
  text,
  className,
  type = "letter",
  textOpacity = "soft",
  scrollProgress,
  highlightColor,
}: TextGradientScrollProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const words = text.trim().split(/\s+/).filter(Boolean);
  const letterCount = words.reduce((count, word) => count + Array.from(word).length, 0);
  let letterIndex = 0;
  const progress = scrollProgress ?? scrollYProgress;
  const waveStyle = highlightColor
    ? ({
        "--text-wave-accent": highlightColor,
        "--text-wave-ink": "#000000",
        "--text-wave-muted": textOpacity === "none"
          ? "transparent"
          : textOpacity === "soft"
            ? "rgba(0, 0, 0, 0.1)"
            : "rgba(0, 0, 0, 0.2)",
      } as CSSProperties)
    : undefined;

  return (
    <TextGradientScrollContext.Provider
      value={{ textOpacity, reducedMotion, highlightColor: highlightColor ?? null }}
    >
      <p ref={ref} className={cn("relative m-0", className)} style={waveStyle}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {words.map((word, index) => {
            const wordLength = Array.from(word).length;
            const range: [number, number] = type === "letter"
              ? [letterIndex / letterCount, (letterIndex + wordLength) / letterCount]
              : [index / words.length, (index + 1) / words.length];
            letterIndex += wordLength;

            return (
              <Fragment key={index}>
                {type === "word" ? (
                  <span className="inline-block whitespace-nowrap">
                    <Reveal progress={progress} range={range}>
                      {word}
                    </Reveal>
                  </span>
                ) : (
                  <Letter progress={progress} range={range}>
                    {word}
                  </Letter>
                )}
                {index < words.length - 1 && " "}
              </Fragment>
            );
          })}
        </span>
      </p>
    </TextGradientScrollContext.Provider>
  );
}

function Letter({
  children,
  progress,
  range,
}: Omit<RevealProps, "children"> & { children: string }) {
  const characters = Array.from(children);
  const step = (range[1] - range[0]) / characters.length;

  return (
    <span className="inline-block whitespace-nowrap">
      {characters.map((character, index) => (
        <Reveal
          key={index}
          progress={progress}
          range={[range[0] + index * step, range[0] + (index + 1) * step]}
        >
          {character}
        </Reveal>
      ))}
    </span>
  );
}

function Reveal({ children, progress, range }: RevealProps) {
  const { highlightColor, reducedMotion } = useContext(TextGradientScrollContext);

  if (highlightColor) {
    return reducedMotion ? (
      <span className="text-wave-character" data-lit="">{children}</span>
    ) : (
      <WaveReveal progress={progress} range={range}>{children}</WaveReveal>
    );
  }

  return <OpacityReveal progress={progress} range={range}>{children}</OpacityReveal>;
}

function WaveReveal({ children, progress, range }: RevealProps) {
  const threshold = range[1];
  const [isLit, setIsLit] = useState(() => progress.get() >= threshold);

  useMotionValueEvent(progress, "change", (value) => {
    setIsLit(value >= threshold);
  });

  useEffect(() => {
    setIsLit(progress.get() >= threshold);
  }, [progress, threshold]);

  return (
    <span className="text-wave-character" data-lit={isLit ? "" : undefined}>
      {children}
    </span>
  );
}

function OpacityReveal({ children, progress, range }: RevealProps) {
  const opacity = useTransform(progress, range, [0, 1]);
  const { textOpacity, reducedMotion } = useContext(TextGradientScrollContext);

  return (
    <span className="inline-grid">
      <span
        className={cn("col-start-1 row-start-1", {
          "opacity-0": textOpacity === "none",
          "opacity-10": textOpacity === "soft",
          "opacity-30": textOpacity === "medium",
        })}
      >
        {children}
      </span>
      <motion.span
        className="col-start-1 row-start-1"
        style={{
          opacity: reducedMotion ? 1 : opacity,
          transition: reducedMotion ? "none" : "opacity 0.5s ease",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
