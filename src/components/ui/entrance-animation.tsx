import { useEffect, useRef, type RefObject } from "react";
import portrait from "@/assets/minha-foto.jpg";
import styles from "./entrance-animation.module.css";

type EntranceAnimationProps = {
  contentRef: RefObject<HTMLDivElement>;
  portraitRef: RefObject<HTMLDivElement>;
  onReveal: () => void;
  onComplete: () => void;
};

const expoInOut = "cubic-bezier(0.87, 0, 0.13, 1)";

export function EntranceAnimation({ contentRef, portraitRef, onReveal, onComplete }: EntranceAnimationProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const gapRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const movingImageRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screen = screenRef.current;
    const gap = gapRef.current;
    const image = imageRef.current;
    const movingImage = movingImageRef.current;
    const background = backgroundRef.current;
    const content = contentRef.current;
    const targetPortrait = portraitRef.current;
    if (!screen || !gap || !image || !movingImage || !background || !content || !targetPortrait) {
      onComplete();
      return;
    }

    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const controller = new AbortController();
    const animations: Animation[] = [];
    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const previousInert = content.inert;
    const previousRestoration = history.scrollRestoration;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    let finished = false;

    content.inert = true;
    if (scrollbarWidth > 0) {
      const padding = Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${padding + scrollbarWidth}px`;
    }
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    function restorePage() {
      content!.inert = previousInert;
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      history.scrollRestoration = previousRestoration;
    }

    function complete() {
      if (finished || controller.signal.aborted) return;
      finished = true;
      restorePage();
      onComplete();
    }

    function wait(duration: number) {
      return new Promise<void>((resolve) => {
        const timeout = window.setTimeout(done, duration);
        function done() {
          window.clearTimeout(timeout);
          controller.signal.removeEventListener("abort", done);
          resolve();
        }
        controller.signal.addEventListener("abort", done, { once: true });
      });
    }

    function animate(element: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) {
      const animation = element.animate(keyframes, { fill: "forwards", ...options });
      animations.push(animation);
      return animation.finished;
    }

    function rectangle(rect: { left: number; top: number; width: number; height: number }): Keyframe {
      return { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` };
    }

    async function runEntrance() {
      await Promise.race([document.fonts.ready, wait(600)]);
      if (controller.signal.aborted || finished) return;

      const letters = Array.from(screen!.querySelectorAll(`.${styles.letter}`));
      const letterAnimations = letters.map((letter, index) => animate(letter, [
        { transform: "translateY(115%)" },
        { transform: "translateY(0)" },
      ], { duration: 1250, delay: index * 25, easing: expoInOut }));
      await Promise.all(letterAnimations);
      await Promise.race([image!.decode().catch(() => undefined), wait(1200)]);
      if (controller.signal.aborted || finished) return;

      const wordmark = gap!.parentElement!;
      screen!.dataset.phase = "image";
      const photoHeight = gap!.getBoundingClientRect().height;
      const availableWidth = window.innerWidth * 0.92 - wordmark.getBoundingClientRect().width;
      const photoWidth = Math.max(1, Math.min(photoHeight * 16 / 9, availableWidth));
      image!.style.width = `${photoWidth}px`;
      await Promise.all([
        animate(gap!, [{ width: "0px" }, { width: `${photoWidth}px` }], { duration: 1250, easing: expoInOut }),
        animate(gap!.previousElementSibling!, [
          { transform: "translateX(0)" },
          { transform: "translateX(-0.05em)" },
        ], { duration: 1250, easing: expoInOut }),
        animate(gap!.nextElementSibling!, [
          { transform: "translateX(0)" },
          { transform: "translateX(0.05em)" },
        ], { duration: 1250, easing: expoInOut }),
      ]);
      await wait(650);
      if (controller.signal.aborted || finished) return;

      const photoRect = gap!.getBoundingClientRect();
      Object.assign(movingImage!.style, rectangle(photoRect), { visibility: "visible" });
      image!.style.visibility = "hidden";
      screen!.dataset.phase = "revealing";
      onReveal();
      const target = targetPortrait!.getBoundingClientRect();
      await Promise.all([
        animate(wordmark, [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(-24px)" },
        ], { duration: 350, easing: "ease-out" }),
        animate(background!, [{ opacity: 1 }, { opacity: 0 }], { duration: 450, easing: "ease-out" }),
        animate(movingImage!, [rectangle(photoRect), rectangle(target)], {
          duration: 1400,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        }),
      ]);
      complete();
    }

    function updateMotionPreference() {
      if (motionMedia.matches) complete();
    }

    const safetyTimeout = window.setTimeout(complete, 8500);
    motionMedia.addEventListener("change", updateMotionPreference);
    if (motionMedia.matches) complete();
    else runEntrance().catch(() => complete());

    return () => {
      controller.abort();
      animations.forEach((animation) => animation.cancel());
      window.clearTimeout(safetyTimeout);
      motionMedia.removeEventListener("change", updateMotionPreference);
      restorePage();
    };
  }, [contentRef, portraitRef, onReveal, onComplete]);

  return (
    <div ref={screenRef} data-slot="entrance-animation" className={styles.screen} aria-hidden="true">
      <div ref={backgroundRef} className={styles.background} />
      <div className={styles.wordmark}>
        <span className={styles.word}>
          {Array.from("Yur").map((letter, index) => (
            <span key={index} className={styles.letterMask}><span className={styles.letter}>{letter}</span></span>
          ))}
        </span>
        <span ref={gapRef} className={styles.photoGap}>
          <img ref={imageRef} src={portrait} alt="" draggable={false} className={styles.inlineImage} />
        </span>
        <span className={styles.word}>
          {Array.from("lz").map((letter, index) => (
            <span key={index} className={styles.letterMask}><span className={styles.letter}>{letter}</span></span>
          ))}
        </span>
      </div>
      <div ref={movingImageRef} className={styles.movingImage}>
        <img src={portrait} alt="" draggable={false} />
      </div>
    </div>
  );
}
