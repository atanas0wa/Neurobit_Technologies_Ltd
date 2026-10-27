import { localePath, site, type Locale } from "@/content/site";
import { WideSection } from "./Section";
import { ButtonLink } from "./ui";

/* Ways to work with us: three engagement types, no prices. */
export function Options({ locale }: { locale: Locale }) {
  const { options } = site(locale);
  return (
    <WideSection id="options" title={options.title}>
      <ul className="grid gap-4 lg:grid-cols-3 md:gap-6">
        {options.items.map((item) => (
          <li key={item.title} className="rounded-3xl border border-line bg-panel p-6 md:p-8">
            <h3 className="text-[24px] font-regular tracking-[-0.02em] text-snow">{item.title}</h3>
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
