import { site, type Locale } from "@/content/site";
import { Section } from "./Section";

export function About({ locale }: { locale: Locale }) {
  const { about } = site(locale);
  const { location } = about;
  return (
    <Section
      id="about"
      side="right"
      label={about.label}
      title={about.title}
      more={about.paragraphs.map((paragraph, i) => (
        <p
          key={paragraph}
          className={`mt-5 max-w-[560px] text-body font-light ${i === 0 ? "text-snow" : "text-mist"}`}
        >
          {paragraph}
        </p>
      ))}
    >
      <figure className="w-full max-w-[560px] font-mono text-label font-medium uppercase text-mist lg:mt-4">
        <div className="flex justify-between gap-4">
          <span>{location.coordinates[0]}</span>
          <span>{location.coordinates[1]}</span>
        </div>
        <div className="relative my-4 aspect-square" aria-hidden="true">
          <div className="dot-grid absolute inset-0" />
          <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
            <g fill="none" className="stroke-cyan">
              {[56, 112, 168].map((r) => (
                <circle key={r} cx="200" cy="200" r={r} strokeOpacity={0.28 - r / 1000} strokeDasharray={r === 168 ? "2 6" : undefined} />
              ))}
              <path d="M200 16 V184 M200 216 V384 M16 200 H184 M216 200 H384" strokeOpacity="0.35" />
            </g>
            <g strokeOpacity="0.5" fill="none" className="stroke-signal">
              <path d="M200 200 L318 104 M200 200 L96 296 M200 200 L330 262" />
            </g>
            <g className="fill-signal">
              <circle cx="318" cy="104" r="2.5" />
              <circle cx="96" cy="296" r="2.5" />
              <circle cx="330" cy="262" r="2.5" />
            </g>
          </svg>
          <span className="absolute top-1/2 left-1/2 flex size-3 -translate-1/2">
            <span className="absolute inset-0 animate-ping rounded-full bg-terminal opacity-50 motion-reduce:animate-none" />
            <span className="relative size-3 rounded-full bg-terminal" />
          </span>
        </div>
        <figcaption className="flex flex-wrap justify-between gap-x-6 gap-y-2">
          <span className="text-terminal">{location.place}</span>
          <span className="sm:text-right">
            {location.timezone}
            <br />
            {location.overlap}
          </span>
        </figcaption>
      </figure>
    </Section>
  );
}
