"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const measurementRef = useRef<HTMLSpanElement>(null);
  const [wordWidth, setWordWidth] = useState<number>();

  useLayoutEffect(() => {
    const element = measurementRef.current;
    if (!element) return;

    const measure = () => setWordWidth(element.getBoundingClientRect().width);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [currentWord]);

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (isAnimating || words.length < 2) return;

    const timeout = window.setTimeout(startAnimation, duration);
    return () => window.clearTimeout(timeout);
  }, [isAnimating, duration, startAnimation, words.length]);

  return (
    <motion.span
      initial={false}
      animate={{ width: wordWidth }}
      transition={{ width: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className={cn(
        "relative inline-block box-content text-left text-neutral-900 dark:text-neutral-100 px-2",
        className
      )}
    >
      <span
        ref={measurementRef}
        aria-hidden="true"
        className="pointer-events-none invisible inline-block whitespace-pre"
      >
        {currentWord}
      </span>
      <AnimatePresence
        onExitComplete={() => {
          setIsAnimating(false);
        }}
      >
        <motion.span
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          exit={{
            opacity: 0,
            y: -40,
            x: 40,
            filter: "blur(8px)",
            scale: 2,
          }}
          className="absolute inset-0 z-10 inline-block whitespace-nowrap"
          style={{ padding: "inherit" }}
          key={currentWord}
        >
          {/* edit suggested by Sajal: https://x.com/DewanganSajal */}
          {currentWord.split(" ").map((word, wordIndex) => (
            <motion.span
              key={word + wordIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: wordIndex * 0.3,
                duration: 0.3,
              }}
              className="inline-block whitespace-nowrap"
            >
              {wordIndex > 0 && <span>&nbsp;</span>}
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={word + letterIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: wordIndex * 0.3 + letterIndex * 0.05,
                    duration: 0.2,
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};
