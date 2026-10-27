import { site, type Locale } from "@/content/site";
import { WideSection } from "./Section";

/* Native <details> accordion: works without JavaScript; the first item starts open. */
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
    <WideSection id="faq" title={faq.title}>
      <div className="border-b border-line">
        {faq.items.map((item, i) => (
          <details key={item.question} open={i === 0} className="faq-item group border-t border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 md:py-8 [&::-webkit-details-marker]:hidden">
              <h3 className="text-[22px] font-regular tracking-[-0.02em] text-snow md:text-[24px]">{item.question}</h3>
              <span
                aria-hidden="true"
                className="relative flex size-[44px] shrink-0 items-center justify-center rounded-full border border-line text-mist transition-colors group-hover:border-mist group-hover:text-snow"
              >
                <span className="absolute h-px w-3.5 bg-current" />
                <span className="absolute h-3.5 w-px bg-current transition-transform group-open:rotate-90 motion-reduce:transition-none" />
              </span>
            </summary>
            <p className="max-w-[720px] pb-8 text-body font-light text-mist">{item.answer}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </WideSection>
  );
}
