import { site, type Locale } from "@/content/site";
import { Section } from "./Section";

export function Stack({ locale }: { locale: Locale }) {
  const { stack } = site(locale);
  return (
    <Section id="stack" label={stack.label} title={stack.title} intro={stack.intro}>
      <div className="rounded-3xl border border-line bg-panel p-4 sm:p-5 md:p-8">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6">
          {stack.groups.map((group) => (
            <div key={group.name}>
              <dt className="flex items-center gap-2 font-mono text-label font-medium uppercase text-terminal">
                <span className="size-1.5 rounded-full bg-terminal" aria-hidden="true" />
                {group.name}
              </dt>
              <dd className="mt-4">
                <ul className="space-y-2.5 border-l border-line pl-3 sm:pl-4">
                  {group.items.map((item) => (
                    <li key={item} className="font-mono text-[13px] font-medium uppercase tracking-[0.06em] text-mist sm:text-[14px]">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
