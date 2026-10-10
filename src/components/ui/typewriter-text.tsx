"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
  highlightColor?: string;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
  highlightColor,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const isComplete = currentIndex >= currentText.length;
    if (!isDeleting && isComplete && !loop) return;

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        } else if (!isComplete) {
          setDisplayText((prev) => prev + currentText[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      },
      isDeleting ? deleteSpeed : isComplete ? delay : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    textArray.length,
  ]);

  return (
    <span
      className={cn("typewriter", className)}
      data-highlight={Boolean(highlightColor)}
      data-deleting={isDeleting}
      style={highlightColor ? { "--typewriter-highlight": highlightColor } as CSSProperties : undefined}
    >
      <span className="typewriter-text">
        {highlightColor ? Array.from(displayText).map((character, index) => (
          <span key={index} className="typewriter-character">{character}</span>
        )) : displayText}
      </span>
      <span aria-hidden="true" className="typewriter-cursor animate-pulse">{cursor}</span>
    </span>
  );
}
