import { site, type Locale } from "@/content/site";
import { WideSection } from "./Section";

export function Services({ locale }: { locale: Locale }) {
  const { services } = site(locale);
  return (
    <WideSection id="services" title={services.title}>
      <ul className="border-b border-line">
        {services.items.map((item) => (
          <li key={item.label} className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-6 md:py-12">
            <h3 className="text-h3 font-regular text-snow md:col-span-5">{item.label}</h3>
            <p className="max-w-[560px] text-body font-light text-mist md:col-span-6 md:col-start-7 md:pt-2">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </WideSection>
  );
}
