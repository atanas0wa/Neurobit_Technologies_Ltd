import { localePath, site, type Locale } from "@/content/site";
import { WideSection } from "./Section";
import { ButtonLink } from "./ui";

/* Ways to work with us: three engagement types, no prices. */
export function Options({ locale }: { locale: Locale }) {
  const { options } = site(locale);
  return (
    <WideSection id="options" label={options.label} title={options.title}>
      <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
        {options.items.map((item, i) => (
          <li key={item.title} className="flex flex-col rounded-3xl border border-line bg-panel p-6 md:p-8">
            <p className="font-mono text-label font-medium uppercase text-terminal">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-6 text-[24px] font-regular tracking-[-0.02em] text-snow">{item.title}</h3>
            <p className="mt-3 text-body font-light text-mist">{item.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex justify-center">
        <ButtonLink data-primary-cta href={localePath(locale, options.cta.href)}>
          {options.cta.label}
        </ButtonLink>
      </div>
    </WideSection>
  );
}
