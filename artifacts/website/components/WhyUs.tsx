import { site, type Locale } from "@/content/site";
import { Icon } from "./Icon";
import { WideSection } from "./Section";
import { Label } from "./ui";

export function WhyUs({ locale }: { locale: Locale }) {
  const { whyUs } = site(locale);
  const { testimonials } = whyUs;
  return (
    <WideSection id="why-us" side="right" label={whyUs.label} title={whyUs.title}>
      <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
        {whyUs.points.map((point) => (
          <li key={point.title} className="border-t border-line pt-6">
            <Icon name={point.icon} className="text-terminal" />
            <h3 className="mt-5 text-[20px] font-regular tracking-[-0.02em] text-snow">{point.title}</h3>
            <p className="mt-1.5 max-w-[400px] text-body font-light text-mist">{point.body}</p>
          </li>
        ))}
      </ul>

      {/* Testimonials: hidden until content/*.ts has real entries in whyUs.testimonials.items. */}
      {testimonials.items.length > 0 && (
        <div className="mt-16 md:mt-20">
          <Label>{testimonials.label}</Label>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
            {testimonials.items.map((item) => (
              <li key={item.name} className="rounded-3xl border border-line bg-panel p-6 md:p-8">
                <figure>
                  <blockquote className="text-[20px] font-light tracking-[-0.01em] text-snow">“{item.quote}”</blockquote>
                  <figcaption className="mt-6 font-mono text-label font-medium uppercase text-mist">
                    {item.name} · {item.role}, {item.company}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      )}
    </WideSection>
  );
}
