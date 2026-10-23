import { hero } from "@/content/site";
import { HeroNetwork } from "./HeroNetwork";
import { ArrowLink, ButtonLink, Container } from "./ui";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <Container className="grid min-h-svh items-center gap-10 pt-[120px] pb-0 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 font-mono text-label font-medium uppercase text-terminal">
            <span className="relative flex size-[7px]" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-terminal opacity-60 motion-reduce:animate-none" />
              <span className="relative size-[7px] rounded-full bg-terminal" />
            </span>
            {hero.status}
          </p>

          <h1 id="hero-title" className="mt-5 max-w-[11ch] text-display font-regular text-snow">
            {hero.headline}
          </h1>

          <p className="mt-6 max-w-[560px] text-body font-light text-mist">{hero.subline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink data-primary-cta href={hero.primary.href}>
              {hero.primary.label}
            </ButtonLink>
            <ArrowLink href={hero.secondary.href}>{hero.secondary.label}</ArrowLink>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-label font-medium uppercase text-mist">
            {hero.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-cyan" aria-hidden="true" />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[5/4] w-full lg:col-span-5 lg:aspect-[4/5]">
          <HeroNetwork tiers={hero.diagramTiers} />
        </div>
      </Container>
    </section>
  );
}
