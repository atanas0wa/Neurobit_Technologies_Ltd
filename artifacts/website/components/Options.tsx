import { localePath, site, type Locale } from "@/content/site";
import { GlowCards } from "./GlowCards";
import { WideSection } from "./Section";
import { ButtonLink } from "./ui";

/* Ways to work with us: three engagement types, no prices, on cards that glow under the pointer (GlowCards). */
export function Options({ locale }: { locale: Locale }) {
  const { options } = site(locale);
  return (
    <WideSection id="options" title={options.title}>
      <GlowCards>
        <ul className="grid gap-4 md:gap-6 xl:grid-cols-3">
          {options.items.map((item) => (
            <li key={item.title} data-card className="glow-card rounded-3xl border border-line bg-panel p-6 md:p-8">
              <h3 className="text-[24px] font-regular tracking-[-0.02em] text-snow">{item.title}</h3>
              <p className="mt-3 max-w-[560px] text-pretty text-body font-light text-mist">{item.body}</p>
            </li>
          ))}
        </ul>
      </GlowCards>
      <div className="mt-10 flex justify-center">
        <ButtonLink data-primary-cta href={localePath(locale, options.cta.href)}>
          {options.cta.label}
        </ButtonLink>
      </div>
    </WideSection>
  );
}
