import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import cursorImage from "@/assets/ponteiro.svg";

export function SmoothCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cursorX = useSpring(pointerX, { stiffness: 420, damping: 34, mass: 0.55 });
  const cursorY = useSpring(pointerY, { stiffness: 420, damping: 34, mass: 0.55 });

  useEffect(() => {
    const pointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updatePreferences() {
      const shouldEnable = pointerMedia.matches && !motionMedia.matches;
      setEnabled(shouldEnable);
      if (shouldEnable) {
        document.documentElement.dataset.smoothCursor = "true";
      } else {
        delete document.documentElement.dataset.smoothCursor;
        visibleRef.current = false;
        setVisible(false);
      }
    }

    function trackPointer(event: PointerEvent) {
      if (!pointerMedia.matches || motionMedia.matches || event.pointerType !== "mouse") return;
      const x = event.clientX - 26;
      const y = event.clientY - 2;
      if (!visibleRef.current) {
        cursorX.jump(x);
        cursorY.jump(y);
        visibleRef.current = true;
        setVisible(true);
        return;
      }
      pointerX.set(x);
      pointerY.set(y);
    }

    function hideCursor() {
      visibleRef.current = false;
      setVisible(false);
    }

    updatePreferences();
    window.addEventListener("pointermove", trackPointer, { passive: true });
    window.addEventListener("blur", hideCursor);
    document.addEventListener("mouseleave", hideCursor);
    pointerMedia.addEventListener("change", updatePreferences);
    motionMedia.addEventListener("change", updatePreferences);

    return () => {
      window.removeEventListener("pointermove", trackPointer);
      window.removeEventListener("blur", hideCursor);
      document.removeEventListener("mouseleave", hideCursor);
      pointerMedia.removeEventListener("change", updatePreferences);
      motionMedia.removeEventListener("change", updatePreferences);
      delete document.documentElement.dataset.smoothCursor;
    };
  }, [cursorX, cursorY, pointerX, pointerY]);

  if (!enabled) return null;

  return createPortal(
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: cursorX, y: cursorY, opacity: visible ? 1 : 0 }}
    >
      <img src={cursorImage} alt="" width={28} height={28} draggable={false} />
    </motion.div>,
    document.body,
  );
}
