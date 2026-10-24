import { RichText } from "@/components/RichText";
import { Container, Label } from "@/components/ui";
import type { LegalSection } from "@/content/en";
import { site, type Locale } from "@/content/site";

const body = "text-body font-light text-mist";

/** Privacy and Cookie Policy pages: label, title, intro, then headed sections. */
export function LegalPage({
  locale,
  page,
}: {
  locale: Locale;
  page: { title: string; updated: string; intro: string; sections: LegalSection[] };
}) {
  const { legal } = site(locale);
  return (
    <Container className="pt-[144px] pb-10 md:pt-[168px] md:pb-20">
      <article className="max-w-[720px]">
        <Label>
          {legal.draft} · {legal.updatedLabel} {page.updated}
        </Label>
        <h1 className="mt-4 text-h1 font-regular text-snow">{page.title}</h1>
        <p className={`mt-6 ${body}`}>{page.intro}</p>

        {page.sections.map((section) => (
          <section key={section.heading} className="mt-12 border-t border-line pt-8 md:mt-16">
            <h2 className="text-h4 font-regular text-snow">{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p} className={`mt-4 ${body}`}>
                <RichText text={p} />
              </p>
            ))}
            {section.list && (
              <ul className="mt-4 space-y-3">
                {section.list.map((item) => (
                  <li key={item} className={`grid grid-cols-[auto_1fr] gap-x-4 ${body}`}>
                    <span className="mt-[11px] size-1.5 rounded-full bg-terminal" aria-hidden="true" />
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {section.after?.map((p) => (
              <p key={p} className={`mt-4 ${body}`}>
                <RichText text={p} />
              </p>
            ))}
          </section>
        ))}
      </article>
    </Container>
  );
}
