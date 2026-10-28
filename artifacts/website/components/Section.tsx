import type { ReactNode } from "react";
import { Container } from "./ui";

/*
 * Section block: large headline → light body, then content.
 * `side` puts the text column left or right; sections alternate down the page.
 */
export function Section({
  id,
  title,
  intro,
  side = "left",
  more,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  side?: "left" | "right";
  /** Extra content under the intro, in the text column. */
  more?: ReactNode;
  children: ReactNode;
}) {
  const right = side === "right";
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-10 md:py-20">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className={`min-w-0 lg:col-span-5 ${right ? "lg:order-2 lg:col-start-8" : ""}`}>
          <h2 id={`${id}-title`} className="text-balance text-h2 font-regular text-snow">
            {title}
          </h2>
          {intro && <p className="mt-5 max-w-[560px] text-body font-light text-mist">{intro}</p>}
          {more}
        </div>
        <div className={`min-w-0 lg:col-span-6 ${right ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>{children}</div>
      </Container>
    </section>
  );
}

/** Full-width variant: header on one side, content spanning the row below. */
export function WideSection({
  id,
  title,
  intro,
  side = "left",
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  side?: "left" | "right";
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-10 md:py-20">
      <Container>
        <header className={`max-w-[640px] ${side === "right" ? "lg:ml-auto" : ""}`}>
          <h2 id={`${id}-title`} className="text-balance text-h2 font-regular text-snow">
            {title}
          </h2>
          {intro && <p className="mt-5 max-w-[560px] text-body font-light text-mist">{intro}</p>}
        </header>
        <div className="mt-10 md:mt-16">{children}</div>
      </Container>
    </section>
  );
}
