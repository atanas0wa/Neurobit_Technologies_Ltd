import { localePath, site, type Locale } from "@/content/site";
import { ButtonLink, Container } from "./ui";

/* Type-led hero: the headline carries the page, the subline and CTA sit under a rule. */
export function Hero({ locale }: { locale: Locale }) {
  const { hero } = site(locale);
  return (
    <section aria-labelledby="hero-title">
      <Container className="pt-[168px] pb-12 md:pt-[220px] md:pb-20">
        <h1 id="hero-title" className="max-w-[20ch] text-balance text-h1 font-regular text-snow">
          {hero.headline}
        </h1>

        <div className="mt-12 grid gap-8 border-t border-line pt-8 md:mt-16 md:grid-cols-12 md:items-end md:gap-6">
          <p className="max-w-[600px] text-body font-light text-mist md:col-span-7">{hero.subline}</p>
          <div className="md:col-span-5 md:justify-self-end">
            <ButtonLink data-primary-cta href={localePath(locale, hero.primary.href)}>
              {hero.primary.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
