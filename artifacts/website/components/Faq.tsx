import { site, type Locale } from "@/content/site";
import { FaqItem } from "./FaqItem";
import { Container } from "./ui";

/*
 * FAQ: the title holds a narrow left column (sticky from lg) and the cards take the wider right one.
 * All closed until clicked, one open at a time; answers type in each time they open (FaqItem).
 */
export function Faq({ locale }: { locale: Locale }) {
  const { faq } = site(locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-10 md:py-20">
      <Container className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:gap-6">
        <h2 id="faq-title" className="text-balance text-h2 font-regular text-snow lg:sticky lg:top-[120px] lg:col-span-4 lg:self-start">
          {faq.title}
        </h2>
        <div className="min-w-0 space-y-2 lg:col-span-8">
          {faq.items.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} label={faq.answerLabel} />
          ))}
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
