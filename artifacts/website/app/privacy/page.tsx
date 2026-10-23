import type { Metadata } from "next";
import { RichText } from "@/components/RichText";
import { Container, Label } from "@/components/ui";
import { privacy } from "@/content/site";

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
  alternates: { canonical: "/privacy/" },
};

const body = "text-body font-light text-mist";

export default function PrivacyPage() {
  return (
    <Container className="pt-[144px] pb-10 md:pt-[168px] md:pb-20">
      <article className="max-w-[720px]">
        <Label>Legal · Updated {privacy.updated}</Label>
        <h1 className="mt-4 text-h1 font-regular text-snow">{privacy.title}</h1>
        <p className={`mt-6 ${body}`}>{privacy.intro}</p>

        {privacy.sections.map((section) => (
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
