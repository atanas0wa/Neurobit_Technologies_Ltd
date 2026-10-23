import type { ReactNode } from "react";
import { Container, Label } from "./ui";

/*
 * Section block: mono label → large headline → light body, then content.
 * `side` puts the text column left or right; sections alternate down the page.
 */
export function Section({
  id,
  label,
  title,
  intro,
  side = "left",
  children,
}: {
  id: string;
  label: string;
  title: string;
  intro?: string;
  side?: "left" | "right";
  children: ReactNode;
}) {
  const right = side === "right";
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-10 md:py-20">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <header className={`lg:col-span-5 ${right ? "lg:order-2 lg:col-start-8" : ""}`}>
          <Label>{label}</Label>
          <h2 id={`${id}-title`} className="mt-4 text-h2 font-regular text-snow">
            {title}
          </h2>
          {intro && <p className="mt-5 max-w-[560px] text-body font-light text-mist">{intro}</p>}
        </header>
        <div className={`lg:col-span-6 ${right ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>{children}</div>
      </Container>
    </section>
  );
}

/** Full-width variant: header on one side, content spanning the row below. */
export function WideSection({
  id,
  label,
  title,
  intro,
  side = "left",
  children,
}: {
  id: string;
  label: string;
  title: string;
  intro?: string;
  side?: "left" | "right";
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-10 md:py-20">
      <Container>
        <header className={`max-w-[640px] ${side === "right" ? "lg:ml-auto" : ""}`}>
          <Label>{label}</Label>
          <h2 id={`${id}-title`} className="mt-4 text-h2 font-regular text-snow">
            {title}
          </h2>
          {intro && <p className="mt-5 max-w-[560px] text-body font-light text-mist">{intro}</p>}
        </header>
        <div className="mt-10 md:mt-16">{children}</div>
      </Container>
    </section>
  );
}
