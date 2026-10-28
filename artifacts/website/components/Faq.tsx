import { site, type Locale } from "@/content/site";
import { FaqItem } from "./FaqItem";
import { WideSection } from "./Section";

/* FAQ cards: one open at a time, the first open by default; answers type in on first open (FaqItem). */
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
    <WideSection id="faq" title={faq.title} narrow>
      <div className="space-y-2">
        {faq.items.map((item, i) => (
          <FaqItem key={item.question} question={item.question} answer={item.answer} label={faq.answerLabel} defaultOpen={i === 0} />
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </WideSection>
  );
}
