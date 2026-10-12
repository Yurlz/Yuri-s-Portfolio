import { useRef, type CSSProperties, type PointerEvent } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.svg";
import { useLanguage } from "@/i18n/language-context";

const depthLayers = Array.from({ length: 22 }, (_, index) => index);

export function SignatureSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "100px" });
  const reducedMotion = useReducedMotion() ?? false;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 90, damping: 24 });

  function trackPointer(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 44);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 32);
  }

  return (
    <section
      ref={sectionRef}
      id="signature"
      aria-label={t.signature.label}
      className="signature-section"
      data-animating={inView && !reducedMotion}
      onPointerMove={trackPointer}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className="signature-stage" aria-hidden="true">
        <motion.div className="signature-object-position" style={{ x, y }}>
          <div className="signature-object-float">
            <div
              className="signature-sculpture"
              style={{ "--signature-mask": `url("${logo}")` } as CSSProperties}
            >
              {depthLayers.map((index) => (
                <span
                  key={index}
                  className="signature-layer"
                  style={{ "--depth-index": index } as CSSProperties}
                />
              ))}
              <span className="signature-face" />
            </div>
          </div>
        </motion.div>
        <div className="signature-shadow" />
      </div>

      <div className="signature-note mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-12">
        <a className="signature-back" href="#home" aria-label={t.signature.backToTop}>
          <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} />
        </a>
        <p className="mt-5 max-w-[31ch] text-sm font-medium leading-[1.65] sm:text-[15px]">
          {t.signature.description}
        </p>
      </div>
    </section>
  );
}
