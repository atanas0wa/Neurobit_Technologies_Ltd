import { site, type Locale } from "@/content/site";
import { Icon } from "./Icon";
import { WideSection } from "./Section";

export function Services({ locale }: { locale: Locale }) {
  const { services } = site(locale);
  return (
    <WideSection id="services" label={services.label} title={services.title}>
      <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
        {services.items.map((item) => (
          <li key={item.label} className="rounded-3xl border border-line bg-panel p-6 md:p-8">
            <Icon name={item.icon} className="text-terminal" />
            <h3 className="mt-6 text-[24px] font-regular tracking-[-0.02em] text-snow">{item.label}</h3>
            <p className="mt-3 text-body font-light text-mist">{item.body}</p>
          </li>
        ))}
      </ul>
    </WideSection>
  );
}
