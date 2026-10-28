import { site, type Locale } from "@/content/site";
import { ServiceArt, type ServiceArtKind } from "./ServiceArt";
import { WideSection } from "./Section";

// Illustrations follow the order of services.items: web, mobile, AI.
const ART: ServiceArtKind[] = ["web", "mobile", "ai"];

export function Services({ locale }: { locale: Locale }) {
  const { services } = site(locale);
  return (
    <WideSection id="services" title={services.title}>
      <ul className="border-b border-line">
        {services.items.map((item, i) => (
          <li key={item.label} className="grid gap-3 border-t border-line py-8 md:py-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-6">
            <h3 className="text-h3 font-regular text-snow lg:col-span-5">{item.label}</h3>
            {/* From lg the text sits beside the title and art, centred on them so neither side leaves a gap. */}
            <p className="max-w-[560px] text-pretty text-body font-light text-mist lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:self-center">
              {item.body}
            </p>
            {ART[i] && (
              <div className="mt-3 md:mt-4 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:mt-0">
                <ServiceArt kind={ART[i]} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </WideSection>
  );
}
