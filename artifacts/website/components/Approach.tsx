import { site, type Locale } from "@/content/site";
import { ScrollSignal } from "./ScrollSignal";
import { WideSection } from "./Section";

/*
 * The process as a delivery pipeline: each step is a stage on one rail.
 * ScrollSignal fills the rail and marks stages done as the page scrolls;
 * the latest stage reached keeps pulsing like a running job. The <ol> keeps
 * the order for assistive tech, so the stages carry no visible numbers.
 */
export function Approach({ locale }: { locale: Locale }) {
  const { approach } = site(locale);
  return (
    <WideSection id="process" title={approach.title}>
      <ScrollSignal>
        <ol className="relative border-b border-line">
          <span aria-hidden="true" className="signal-rail hidden md:block">
            <span className="signal-rail-fill" />
          </span>
          {approach.steps.map((step) => (
            <li
              key={step.title}
              data-step
              className="grid gap-x-6 gap-y-3 border-t border-line py-8 md:grid-cols-12 md:items-baseline md:py-10"
            >
              <span className="md:col-span-1 md:text-h3">
                <span className="signal-node" aria-hidden="true">
                  <svg viewBox="0 0 12 12" className="signal-check">
                    <path d="M3 6.2 5 8.2 9 3.8" />
                  </svg>
                </span>
              </span>
              <h3 className="text-h3 font-regular text-snow md:col-span-4">{step.title}</h3>
              <p className="max-w-[560px] text-pretty text-body font-light text-mist md:col-span-7">{step.body}</p>
            </li>
          ))}
        </ol>
      </ScrollSignal>
    </WideSection>
  );
}
