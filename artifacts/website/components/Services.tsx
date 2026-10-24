import { site, type Locale } from "@/content/site";
import { WideSection } from "./Section";

export function Services({ locale }: { locale: Locale }) {
  const { services } = site(locale);
  return (
    <WideSection id="services" label={services.label} title={services.title} intro={services.intro}>
      <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2 md:gap-y-16">
        {services.items.map((item, i) => (
          <li key={item.label}>
            <p className="font-mono text-label font-medium uppercase text-terminal">
              {String(i + 1).padStart(2, "0")} / {item.label}
            </p>
            <h3 className="mt-3 text-h4 font-regular text-snow">{item.title}</h3>
            <p className="mt-3 max-w-[560px] text-body font-light text-mist">{item.body}</p>
          </li>
        ))}
      </ul>
    </WideSection>
  );
}
