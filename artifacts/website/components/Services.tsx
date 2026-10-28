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
          <li
            key={item.label}
            className="grid gap-3 border-t border-line py-6 md:grid-cols-12 md:gap-x-6 md:gap-y-3 md:py-8 lg:gap-y-6"
          >
            {/*
             * Phones: title, text, art stacked. Tablets: title and text on the left, art on the right.
             * From lg: title over art on the left, text on the right; the side pieces centre on each other.
             */}
            <h3 className="text-h3 font-regular text-snow md:col-span-7 lg:col-span-5">{item.label}</h3>
            <p className="max-w-[560px] text-pretty text-body font-light text-mist md:col-span-7 md:col-start-1 md:row-start-2 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center">
              {item.body}
            </p>
            {ART[i] && (
              <div className="mt-3 md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 md:mt-0 md:self-center lg:col-span-5 lg:col-start-1 lg:row-span-1 lg:row-start-2 lg:self-auto">
                <ServiceArt kind={ART[i]} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </WideSection>
  );
}
