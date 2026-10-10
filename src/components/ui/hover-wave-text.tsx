import { Fragment, type CSSProperties } from "react";

/** The reference's 400ms color wave, with a 16ms delay between letters. */
export function HoverWaveText({ text }: { text: string }) {
  let characterIndex = 0;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, wordIndex) => (
          <Fragment key={wordIndex}>
            {wordIndex > 0 && " "}
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((character, index) => (
                <span
                  key={index}
                  className="hover-wave-character"
                  style={{ "--wave-index": characterIndex++ } as CSSProperties}
                >
                  {character}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}
