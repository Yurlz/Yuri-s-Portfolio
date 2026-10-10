import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  icon: string;
}

interface LogoMarqueeProps {
  logos: Logo[];
  direction: "left" | "right";
  label: string;
}

export function LogoMarquee({ logos, direction, label }: LogoMarqueeProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="logo-marquee relative overflow-hidden"
    >
      <ul className="sr-only">
        {logos.map((logo) => (
          <li key={logo.icon}>{logo.name}</li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className={cn("logo-marquee-track flex w-max", {
          "logo-marquee-track-right": direction === "right",
        })}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16">
            {logos.map((logo) => (
              <div
                key={logo.icon}
                className="flex w-36 shrink-0 items-center justify-center gap-3 text-neutral-500 sm:w-44"
              >
                <img
                  src={`/logos/${logo.icon}.svg`}
                  alt=""
                  width={30}
                  height={30}
                  className="h-7 w-7 shrink-0 opacity-[0.55] sm:h-8 sm:w-8"
                />
                <span className="whitespace-nowrap text-base font-semibold tracking-[-0.045em] sm:text-xl">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
