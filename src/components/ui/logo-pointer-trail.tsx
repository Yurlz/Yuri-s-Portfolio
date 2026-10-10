import { useEffect, useRef } from "react";
import logo from "@/assets/logo.svg";

const stampCount = 6;
const stampSpacing = 90;
const revealDuration = 240;
const holdDuration = 360;
const fadeDuration = 240;
const fadeStart = revealDuration + holdDuration;
const totalDuration = fadeStart + fadeDuration;

type TrailStamp = {
  element: HTMLElement;
  image: HTMLImageElement;
  animation: Animation | null;
};

export function LogoPointerTrail() {
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trail = trailRef.current;
    const portrait = trail?.parentElement;
    if (!trail || !portrait) return;

    const pointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stamps: TrailStamp[] = Array.from(trail.children).flatMap((element) => {
      const image = element.querySelector("img");
      return element instanceof HTMLElement && image
        ? [{ element, image, animation: null }]
        : [];
    });
    const activeStamps: TrailStamp[] = [];
    let enabled = pointerMedia.matches && !motionMedia.matches;
    let hovering = false;
    let nextStamp = 0;
    let previousX = 0;
    let previousY = 0;
    let distance = 0;
    let fadingStamp: TrailStamp | null = null;

    function cancelStamps() {
      stamps.forEach((stamp) => {
        stamp.animation?.cancel();
        stamp.animation = null;
      });
      activeStamps.length = 0;
      fadingStamp = null;
      hovering = false;
      distance = 0;
    }

    function updatePreferences() {
      enabled = pointerMedia.matches && !motionMedia.matches;
      if (!enabled) cancelStamps();
    }

    function fadeOldest(stamp: TrailStamp) {
      const animation = stamp.animation;
      if (!animation || animation.currentTime === null || animation.playState === "finished") return;
      animation.currentTime = Math.max(Number(animation.currentTime), fadeStart);
      animation.playbackRate = 2.5;
      if (fadingStamp && fadingStamp !== stamp) fadingStamp.animation?.finish();
      fadingStamp = stamp;
    }

    function placeStamp(x: number, y: number) {
      const stamp = stamps[nextStamp];
      if (!stamp) return;
      nextStamp = (nextStamp + 1) % stamps.length;

      if (activeStamps.length >= 4) fadeOldest(activeStamps.shift()!);
      const existingIndex = activeStamps.indexOf(stamp);
      if (existingIndex !== -1) activeStamps.splice(existingIndex, 1);
      if (fadingStamp === stamp) fadingStamp = null;

      // Keep the logo just to the right of the cursor, as in the reference.
      stamp.element.style.transform = `translate3d(${x + 4}px, ${y - 43}px, 0)`;
      stamp.animation?.cancel();
      stamp.animation = stamp.image.animate([
        {
          opacity: 1,
          transform: "scale(0.98)",
          maskPosition: "100% 0%",
          easing: "cubic-bezier(0.45, 0, 0.25, 1)",
        },
        {
          opacity: 1,
          transform: "scale(1)",
          maskPosition: "0% 0%",
          offset: revealDuration / totalDuration,
        },
        {
          opacity: 1,
          maskPosition: "0% 0%",
          offset: fadeStart / totalDuration,
          easing: "cubic-bezier(0.55, 0, 0.45, 1)",
        },
        { opacity: 0, transform: "scale(0.97)", maskPosition: "0% 0%" },
      ], { duration: totalDuration, fill: "both" });
      activeStamps.push(stamp);
    }

    function trackPointer(event: PointerEvent) {
      if (!enabled || event.pointerType !== "mouse" || !portrait) return;
      const rect = portrait.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      if (!hovering) {
        hovering = true;
        previousX = event.clientX;
        previousY = event.clientY;
        distance = 0;
        placeStamp(x, y);
        return;
      }

      distance += Math.hypot(event.clientX - previousX, event.clientY - previousY);
      previousX = event.clientX;
      previousY = event.clientY;
      if (distance >= stampSpacing) {
        distance = 0;
        placeStamp(x, y);
      }
    }

    function leavePortrait() {
      hovering = false;
      distance = 0;
      stamps.forEach(({ animation }) => {
        if (!animation || animation.currentTime === null || animation.playState === "finished") return;
        animation.currentTime = Math.max(Number(animation.currentTime), fadeStart);
      });
      activeStamps.length = 0;
      fadingStamp = null;
    }

    portrait.addEventListener("pointermove", trackPointer, { passive: true });
    portrait.addEventListener("pointerleave", leavePortrait);
    portrait.addEventListener("pointercancel", leavePortrait);
    window.addEventListener("blur", leavePortrait);
    window.addEventListener("scroll", leavePortrait, { passive: true });
    pointerMedia.addEventListener("change", updatePreferences);
    motionMedia.addEventListener("change", updatePreferences);

    return () => {
      cancelStamps();
      portrait.removeEventListener("pointermove", trackPointer);
      portrait.removeEventListener("pointerleave", leavePortrait);
      portrait.removeEventListener("pointercancel", leavePortrait);
      window.removeEventListener("blur", leavePortrait);
      window.removeEventListener("scroll", leavePortrait);
      pointerMedia.removeEventListener("change", updatePreferences);
      motionMedia.removeEventListener("change", updatePreferences);
    };
  }, []);

  return (
    <div ref={trailRef} aria-hidden="true" className="logo-pointer-trail">
      {Array.from({ length: stampCount }, (_, index) => (
        <div key={index} className="logo-trail-stamp">
          <img src={logo} alt="" width={80} height={60} draggable={false} className="logo-trail-image" />
        </div>
      ))}
    </div>
  );
}
