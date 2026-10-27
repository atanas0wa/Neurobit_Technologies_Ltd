import { site, type Locale } from "@/content/site";
import { WideSection } from "./Section";

export function WhyUs({ locale }: { locale: Locale }) {
  const { whyUs } = site(locale);
  const { testimonials } = whyUs;
  return (
    <WideSection id="why-us" title={whyUs.title}>
      <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
        {whyUs.points.map((point) => (
          <li key={point.title} className="border-t border-line pt-6">
            <h3 className="text-[24px] font-regular leading-[1.25] tracking-[-0.02em] text-balance text-snow">
              {point.title}
            </h3>
            <p className="mt-3 max-w-[400px] text-body font-light text-mist">{point.body}</p>
          </li>
        ))}
      </ul>

      {/* Testimonials: hidden until content/*.ts has real entries in whyUs.testimonials.items. */}
      {testimonials.items.length > 0 && (
        <div className="mt-16 md:mt-20">
          <h3 className="text-[20px] font-regular tracking-[-0.02em] text-snow">{testimonials.label}</h3>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
            {testimonials.items.map((item) => (
              <li key={item.name} className="rounded-3xl border border-line bg-panel p-6 md:p-8">
                <figure>
                  <blockquote className="text-[20px] font-light tracking-[-0.01em] text-snow">“{item.quote}”</blockquote>
                  <figcaption className="mt-6 text-[15px] font-light text-mist">
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
