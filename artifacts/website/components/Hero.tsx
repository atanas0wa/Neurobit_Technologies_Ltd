import { localePath, site, type Locale } from "@/content/site";
import { HeroNetwork } from "./HeroNetwork";
import { ButtonLink, Container } from "./ui";

export function Hero({ locale }: { locale: Locale }) {
  const { hero } = site(locale);
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <Container className="grid min-h-svh items-center gap-10 pt-[120px] pb-0 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="max-w-[16ch] text-balance text-h1 font-regular text-snow">
            {hero.headline}
          </h1>

          <p className="mt-6 max-w-[560px] text-body font-light text-mist">{hero.subline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink data-primary-cta href={localePath(locale, hero.primary.href)}>
              {hero.primary.label}
            </ButtonLink>
          </div>
        </div>

        <div className="relative aspect-[5/4] w-full lg:col-span-5 lg:aspect-[4/5]">
          <HeroNetwork tiers={hero.diagramTiers} />
        </div>
      </Container>
    </section>
  );
}
