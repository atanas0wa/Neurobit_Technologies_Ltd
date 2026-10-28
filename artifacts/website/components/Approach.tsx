import type { CSSProperties } from "react";
import { site, type Locale } from "@/content/site";
import { ScrollSignal } from "./ScrollSignal";
import { WideSection } from "./Section";

/*
 * A rolling list of the steps. Each row: a large step word on the left; on the
 * right a mono tag led by the signal dot (ScrollSignal fires it as the page
 * scrolls past) and the description, which comes in as the word rolls.
 *
 * Motion lives in globals.css (.roll-*): rows rise in one after another when
 * the list first comes into view; hovering a row rolls its word letter by
 * letter like a slot machine, brings in its description and draws a Snow line
 * along its bottom edge. Rows take keyboard focus so the same works without a
 * mouse. On touch screens the row the signal has reached rolls instead, and
 * the others keep their description dimmed. Without JS or with reduced
 * motion every description is shown and the list is still.
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
              tabIndex={0}
              className="roll-row relative grid content-start gap-x-6 gap-y-4 border-b border-line py-8 focus-visible:outline-offset-[-2px] md:grid-cols-12 md:py-10"
            >
              <p className="roll-tag flex items-center gap-3 font-mono text-label font-medium uppercase text-mist transition-colors duration-500 md:col-span-5 md:col-start-8 md:row-start-1 md:pt-4">
                <span className="signal-dot" aria-hidden="true" />
                {step.tag}
              </p>
              <h3 className="min-w-0 text-h3 font-regular text-snow md:col-span-7 md:col-start-1 md:row-span-2 md:row-start-1">
                <span className="sr-only">{step.title}</span>
                <span className="roll-word" aria-hidden="true">
                  {Array.from(step.title).map((char, j) => (
                    <span key={j} className="roll-char" data-char={char} style={{ "--i": j } as CSSProperties}>
                      {char}
                    </span>
                  ))}
                </span>
              </h3>
              <p className="roll-body max-w-[560px] text-pretty text-body font-light text-mist md:col-span-5 md:col-start-8 md:row-start-2">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </ScrollSignal>
    </WideSection>
  );
}
