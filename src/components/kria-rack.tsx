import { useEffect, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import blackBack from "@/assets/kria-rack/black-back.webp";
import blackFront from "@/assets/kria-rack/black-front.webp";
import offwhiteBack from "@/assets/kria-rack/offwhite-back.webp";
import offwhiteFront from "@/assets/kria-rack/offwhite-front.webp";
import { useLanguage } from "@/i18n/language-context";
import { interpolate } from "@/i18n/translations";
import "./kria-rack.css";

// Position of a print on the shirt, in % of the garment box.
type Print = { src: string; left: number; top: number; width: number };

type Garment = {
  id: string;
  name: string;
  // Mockups: transparent images sharing the same framing (hanger hook at the top).
  frontImage: string;
  backImage: string;
  // Optional artwork placed over the mockup, e.g.
  // front: { src: chestPrint, left: 56, top: 30, width: 14 }
  front?: Print;
  back?: Print;
};

const garments: Garment[] = [
  { id: "black", name: "Dragon Soul Tee — Black", frontImage: blackFront, backImage: blackBack },
  { id: "offwhite", name: "Dragon Soul Tee — Off-white", frontImage: offwhiteFront, backImage: offwhiteBack },
  { id: "crest", name: "Dragon Crest Tee — Black", frontImage: blackFront, backImage: blackBack },
];

const SPACING = 11; // distance between hangers, in cqw
const HOVER_SHIFT = 9.5; // how far neighbours slide away from the hovered piece
const SIDE_ANGLE = -66; // resting rotation of a piece on the rack

function Shirt({ garment, side }: { garment: Garment; side: "front" | "back" }) {
  const print = side === "front" ? garment.front : garment.back;

  return (
    <span className="kria-rack-face" data-side={side}>
      <img className="kria-rack-mockup" src={side === "front" ? garment.frontImage : garment.backImage} alt="" draggable={false} />
      {print && <img
        className="kria-rack-print"
        src={print.src}
        alt=""
        draggable={false}
        style={{ left: `${print.left}%`, top: `${print.top}%`, width: `${print.width}%` }}
      />}
    </span>
  );
}

export function KriaRack() {
  const { t } = useLanguage();
  const copy = t.projects.rack;
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [side, setSide] = useState<"front" | "back">("front");
  const count = garments.length;
  const open = selected !== null;
  const current = open ? garments[selected] : null;

  const select = (index: number | null) => {
    setSelected(index === null ? null : (index + count) % count);
    setSide("front");
    setHovered(null);
  };

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") select(null);
      if (event.key === "ArrowLeft") select(selected - 1);
      if (event.key === "ArrowRight") select(selected + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    // Pointer focus makes the browser scroll the smooth-scroll wrapper, moving the
    // rack between press and release so the click misses. Keyboard focus is unaffected.
    <section className="kria-rack" aria-label={copy.label} data-open={open} onMouseDown={(event) => event.preventDefault()}>
      <div className="kria-rack-stage" onPointerLeave={() => setHovered(null)}>
        <div className="kria-rack-bar" aria-hidden="true" />

        {garments.map((garment, index) => {
          const isSelected = selected === index;
          const base = (index - (count - 1) / 2) * SPACING;
          let x = base;
          let angle = SIDE_ANGLE;
          if (open) {
            x = isSelected ? 0 : base + Math.sign(index - selected) * 26;
            angle = isSelected && side === "back" ? 180 : 0;
          } else if (hovered !== null) {
            x = base + Math.sign(index - hovered) * HOVER_SHIFT;
            if (hovered === index) angle = 0;
          }
          const style = {
            "--x": x,
            "--angle": `${angle}deg`,
            zIndex: isSelected || hovered === index ? count + 1 : index + 1,
          } as CSSProperties;

          return (
            <button
              key={garment.id}
              type="button"
              className="kria-rack-item"
              style={style}
              data-selected={isSelected}
              data-hidden={open && !isSelected}
              tabIndex={open && !isSelected ? -1 : 0}
              aria-label={isSelected ? `${garment.name} — ${side === "front" ? copy.back : copy.front}` : interpolate(copy.view, { name: garment.name })}
              onPointerEnter={(event) => { if (!open && event.pointerType === "mouse") setHovered(index); }}
              // Keyboard focus only: reacting to a tap's focus would move the piece mid-click.
              onFocus={(event) => { if (!open && event.currentTarget.matches(":focus-visible")) setHovered(index); }}
              onBlur={() => setHovered((value) => (value === index ? null : value))}
              onClick={() => {
                if (!isSelected) select(index);
                else setSide(side === "front" ? "back" : "front");
              }}
            >
              <span className="kria-rack-swing">
                <Shirt garment={garment} side="front" />
                <Shirt garment={garment} side="back" />
              </span>
            </button>
          );
        })}

        <p className="kria-rack-caption" aria-live="polite">
          {open ? "" : hovered !== null ? garments[hovered].name : copy.hint}
        </p>

        <div className="kria-rack-detail" aria-hidden={!open}>
          <button type="button" className="kria-rack-close" onClick={() => select(null)} tabIndex={open ? 0 : -1}>
            {copy.close}<X size={12} aria-hidden="true" />
          </button>
          <button type="button" className="kria-rack-arrow" data-direction="previous" aria-label={copy.previous} onClick={() => select((selected ?? 0) - 1)} tabIndex={open ? 0 : -1}>
            <ArrowLeft size={15} aria-hidden="true" />
          </button>
          <button type="button" className="kria-rack-arrow" data-direction="next" aria-label={copy.next} onClick={() => select((selected ?? 0) + 1)} tabIndex={open ? 0 : -1}>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
          <div className="kria-rack-info">
            <h2>{current?.name}</h2>
            <div className="kria-rack-toggle" role="group" aria-label={copy.side}>
              {(["front", "back"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={side === option}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setSide(option)}
                >
                  {copy[option]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
