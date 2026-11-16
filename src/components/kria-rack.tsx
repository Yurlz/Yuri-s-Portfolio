import { useEffect, useId, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import printCrest from "@/assets/kria-rack/print-crest.png";
import printFlame from "@/assets/kria-rack/print-flame.png";
import printLine from "@/assets/kria-rack/print-line.png";
import printNpc from "@/assets/kria-rack/print-npc.png";
import { useLanguage } from "@/i18n/language-context";
import { interpolate } from "@/i18n/translations";
import "./kria-rack.css";

// Position of a print on the shirt, in % of the garment box.
type Print = { src: string; left: number; top: number; width: number };

type Garment = {
  id: string;
  name: string;
  colour: string;
  // Light garments get dark seams, dark garments get light seams.
  dark: boolean;
  front?: Print;
  back?: Print;
  // Optional full mockups (transparent PNG, hanger included or not).
  // When set, they replace the drawn shirt for that side.
  frontImage?: string;
  backImage?: string;
};

const garments: Garment[] = [
  {
    id: "flame",
    name: "Dragon Soul Tee — Black",
    colour: "#151515",
    dark: true,
    front: { src: printFlame, left: 56.5, top: 31, width: 18 },
  },
  {
    id: "line",
    name: "Dragon Soul Tee — Off-white",
    colour: "#f3efe4",
    dark: false,
    front: { src: printLine, left: 60, top: 30.5, width: 11 },
    back: { src: printNpc, left: 29, top: 29, width: 42 },
  },
  {
    id: "crest",
    name: "Dragon Crest Tee — Black",
    colour: "#151515",
    dark: true,
    front: { src: printCrest, left: 59.5, top: 31, width: 12 },
  },
];

const SPACING = 11; // distance between hangers, in cqw
const HOVER_SHIFT = 8.5; // how far neighbours slide away from the hovered piece
const SIDE_ANGLE = -66; // resting rotation of a piece on the rack

function Shirt({ garment, side }: { garment: Garment; side: "front" | "back" }) {
  const gradient = useId();
  const image = side === "front" ? garment.frontImage : garment.backImage;
  const print = side === "front" ? garment.front : garment.back;
  const seam = garment.dark ? "rgba(255,255,255,0.13)" : "rgba(0,0,0,0.14)";
  const inside = garment.dark ? "#070707" : "#cfcabd";

  return (
    <span className="kria-rack-face" data-side={side}>
      {image ? <img className="kria-rack-mockup" src={image} alt="" draggable={false} /> : <>
        <svg viewBox="0 -78 400 518" aria-hidden="true">
          <defs>
            <linearGradient id={gradient} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#000" stopOpacity={garment.dark ? 0.5 : 0.16} />
              <stop offset="0.22" stopColor="#000" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff" stopOpacity={garment.dark ? 0.05 : 0.25} />
              <stop offset="0.78" stopColor="#000" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity={garment.dark ? 0.5 : 0.16} />
            </linearGradient>
          </defs>
          <path d="M200 -10V-30C200 -46 223 -42 223 -57C223 -74 196 -76 190 -59" fill="none" stroke="#9b9b98" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M146 24L200 -8L254 24" fill="none" stroke="#4a3120" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
          {side === "front" && <path d="M150 18C168 8 232 8 250 18C232 56 168 56 150 18Z" fill={inside} />}
          <path
            d={side === "front"
              ? "M150 18C168 56 232 56 250 18L300 30L392 110L345 172L305 142V425Q200 437 95 425V142L55 172L8 110L100 30Z"
              : "M150 18C172 32 228 32 250 18L300 30L392 110L345 172L305 142V425Q200 437 95 425V142L55 172L8 110L100 30Z"}
            fill={garment.colour}
          />
          <path
            d="M150 18C172 32 228 32 250 18L300 30L392 110L345 172L305 142V425Q200 437 95 425V142L55 172L8 110L100 30Z"
            fill={`url(#${gradient})`}
          />
          <g fill="none" stroke={seam} strokeWidth="2" strokeLinecap="round">
            {side === "front"
              ? <path d="M143 22C163 68 237 68 257 22" />
              : <path d="M144 22C170 42 230 42 256 22" />}
            <path d="M95 142C92 110 96 70 112 40M305 142C308 110 304 70 288 40" />
            <path d="M14 117L62 165M386 117L338 165" />
            <path d="M95 414Q200 426 305 414" />
          </g>
        </svg>
        {print && <img
          className="kria-rack-print"
          src={print.src}
          alt=""
          draggable={false}
          style={{ left: `${print.left}%`, top: `${print.top}%`, width: `${print.width}%` }}
        />}
      </>}
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
  const hasBack = Boolean(current?.back || current?.backImage);

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
              aria-label={isSelected && hasBack ? `${garment.name} — ${side === "front" ? copy.back : copy.front}` : interpolate(copy.view, { name: garment.name })}
              onPointerEnter={(event) => { if (!open && event.pointerType === "mouse") setHovered(index); }}
              // Keyboard focus only: reacting to a tap's focus would move the piece mid-click.
              onFocus={(event) => { if (!open && event.currentTarget.matches(":focus-visible")) setHovered(index); }}
              onBlur={() => setHovered((value) => (value === index ? null : value))}
              onClick={() => {
                if (!isSelected) select(index);
                else if (hasBack) setSide(side === "front" ? "back" : "front");
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
                  disabled={option === "back" && !hasBack}
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
