import { site, type Locale } from "@/content/site";
import { ScrollSignal } from "./ScrollSignal";
import { WideSection } from "./Section";

/*
 * Each step has a dot that lights up as the page scrolls past it (ScrollSignal);
 * the latest one reached keeps a soft pulse. The <ol> keeps the order for
 * assistive tech, so the steps carry no visible numbers.
 */
export function Approach({ locale }: { locale: Locale }) {
  const { approach } = site(locale);
  return (
    <WideSection id="process" title={approach.title}>
      <ScrollSignal>
        <ol className="border-b border-line">
          {approach.steps.map((step) => (
            <li
              key={step.title}
              data-step
              className="grid gap-x-6 gap-y-3 border-t border-line py-8 md:grid-cols-12 md:items-baseline md:py-10"
            >
              <span className="md:col-span-1 md:text-h3">
                <span className="signal-dot" aria-hidden="true" />
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
