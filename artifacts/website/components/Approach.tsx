import type { CSSProperties } from "react";
import { site, type Locale } from "@/content/site";
import { ScrollSignal } from "./ScrollSignal";
import { StepArt, type StepArtKind } from "./StepArt";
import { WideSection } from "./Section";

/*
 * A rolling list of the steps. Each row: a large step word on the left; on the
 * right a mono tag led by the signal dot, lit while the row is active, and the
 * description, which comes in as the word rolls.
 *
 * Motion lives in globals.css (.roll-*): rows rise in one after another when
 * the list first comes into view; hovering a row rolls its word letter by
 * letter like a slot machine, brings in its description and draws a Snow line
 * along its bottom edge. Rows take keyboard focus so the same works without a
 * mouse. On touch screens the row the signal has reached rolls instead, and
 * the others keep their description dimmed. Without JS or with reduced
 * motion every description is shown and the list is still.
 *
 * From lg a small illustration of each step (StepArt) fills the gap between
 * word and description, dimmed unless its row is active.
 *
 * The word is split into letters for the roll, so screen readers get the
 * whole word from a hidden copy. The <ol> carries the order for assistive tech.
 */
// Illustrations follow the order of approach.steps.
const ART: StepArtKind[] = ["analysis", "design", "build", "launch", "support"];

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
              <h3 className="min-w-0 text-h3 font-regular text-snow md:col-span-7 md:col-start-1 md:row-span-2 md:row-start-1 lg:col-span-4">
                <span className="sr-only">{step.title}</span>
                <span className="roll-word" aria-hidden="true">
                  {Array.from(step.title).map((char, j) => (
                    <span key={j} className="roll-char" data-char={char} style={{ "--i": j } as CSSProperties}>
                      {char}
                    </span>
                  ))}
                </span>
              </h3>
              {ART[i] && (
                <div className="hidden lg:col-span-3 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:flex lg:items-center lg:justify-center">
                  <StepArt kind={ART[i]} />
                </div>
              )}
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
