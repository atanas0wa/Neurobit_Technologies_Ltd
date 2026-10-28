import type { CSSProperties } from "react";
import { site, type Locale } from "@/content/site";
import { ScrollSignal } from "./ScrollSignal";
import { WideSection } from "./Section";

/*
 * A rolling list of the steps. Each row: a large step word, a mono tag at the
 * top right with the signal dot (ScrollSignal fires it as the page scrolls
 * past), and the description under the word.
 *
 * Motion lives in globals.css (.roll-*): rows rise in one after another when
 * the list first comes into view; hovering a row rolls its word letter by
 * letter like a slot machine and draws a Snow line along its bottom edge. On
 * touch screens the row the signal has reached rolls instead. Without JS or
 * with reduced motion the list is plain and still.
 *
 * The word is split into letters for the roll, so screen readers get the
 * whole word from a hidden copy. The <ol> carries the order for assistive tech.
 */
export function Approach({ locale }: { locale: Locale }) {
  const { approach } = site(locale);
  return (
    <WideSection id="process" title={approach.title}>
      <ScrollSignal>
        <ol className="border-t border-line">
          {approach.steps.map((step, i) => (
            <li
              key={step.title}
              data-step
              style={{ "--row": i } as CSSProperties}
              className="roll-row relative grid gap-x-6 gap-y-4 border-b border-line py-8 md:grid-cols-12 md:py-10"
            >
              <p className="flex items-center gap-3 font-mono text-label font-medium uppercase text-mist transition-colors duration-300 md:order-2 md:col-span-4 md:self-start md:justify-end md:pt-3">
                <span className="signal-dot" aria-hidden="true" />
                <span>
                  {String(i + 1).padStart(2, "0")} · {step.tag}
                </span>
              </p>
              <div className="min-w-0 md:order-1 md:col-span-8">
                <h3 className="text-h1 font-regular text-snow">
                  <span className="sr-only">{step.title}</span>
                  <span className="roll-word" aria-hidden="true">
                    {Array.from(step.title).map((char, j) => (
                      <span key={j} className="roll-char" data-char={char} style={{ "--i": j } as CSSProperties}>
                        {char}
                      </span>
                    ))}
                  </span>
                </h3>
                <p className="mt-4 max-w-[560px] text-pretty text-body font-light text-mist">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </ScrollSignal>
    </WideSection>
  );
}
