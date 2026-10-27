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
          <li key={item.label} className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-6 md:py-12">
            <h3 className="text-h3 font-regular text-snow md:col-span-5">{item.label}</h3>
            <p className="max-w-[560px] text-pretty text-body font-light text-mist md:col-span-6 md:col-start-7 md:row-span-2 md:pt-2">
              {item.body}
            </p>
            {ART[i] && (
              <div className="mt-4 md:col-span-5 md:col-start-1 md:row-start-2 md:mt-4">
                <ServiceArt kind={ART[i]} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </WideSection>
  );
}
