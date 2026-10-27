import { localePath, site, type Locale } from "@/content/site";
import { HeroNetwork } from "./HeroNetwork";
import { ButtonLink, Container } from "./ui";

/*
 * Headline and the neuron network side by side; the subline and CTA sit under
 * a rule. On phones the network moves below the CTA so the action stays early.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { hero } = site(locale);
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <Container className="grid gap-10 pt-[152px] pb-12 md:pt-[184px] md:pb-20 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
        <h1
          id="hero-title"
          className="max-w-[18ch] text-balance text-h1 font-regular text-snow lg:col-span-7 lg:row-start-1 lg:self-end"
        >
          {hero.headline}
        </h1>

        <div className="border-t border-line pt-8 lg:col-span-7 lg:row-start-2 lg:mt-12">
          <p className="max-w-[560px] text-body font-light text-mist">{hero.subline}</p>
          <ButtonLink data-primary-cta href={localePath(locale, hero.primary.href)} className="mt-8">
            {hero.primary.label}
          </ButtonLink>
        </div>

        <div className="relative aspect-[5/4] w-full lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-[520px]">
          <HeroNetwork />
        </div>
      </Container>
    </section>
  );
}
