import { site, type Locale } from "@/content/site";
import { Container } from "./ui";

/* Centered text block between the hero and services: the problem we solve. */
export function Problem({ locale }: { locale: Locale }) {
  const { problem } = site(locale);
  return (
    <section aria-labelledby="problem-title" className="py-10 md:py-20">
      <Container className="mx-auto max-w-[760px] text-center">
        <h2 id="problem-title" className="text-h4 font-regular text-snow">
          {problem.lead}
        </h2>
        {problem.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mx-auto mt-6 max-w-[640px] text-body font-light text-mist">
            {paragraph}
          </p>
        ))}
      </Container>
    </section>
  );
}
