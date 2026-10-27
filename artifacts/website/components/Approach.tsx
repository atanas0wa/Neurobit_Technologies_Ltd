import { site, type Locale } from "@/content/site";
import { WideSection } from "./Section";

export function Approach({ locale }: { locale: Locale }) {
  const { approach } = site(locale);
  return (
    <WideSection id="process" title={approach.title}>
      <ol className="border-b border-line">
        {approach.steps.map((step, i) => (
          <li
            key={step.title}
            className="grid gap-x-6 gap-y-3 border-t border-line py-8 md:grid-cols-12 md:items-baseline md:py-10"
          >
            <span className="font-mono text-[14px] font-medium tracking-[0.06em] text-terminal md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-h3 font-regular text-snow md:col-span-4">{step.title}</h3>
            <p className="max-w-[560px] text-body font-light text-mist md:col-span-7">{step.body}</p>
          </li>
        ))}
      </ol>
    </WideSection>
  );
}
