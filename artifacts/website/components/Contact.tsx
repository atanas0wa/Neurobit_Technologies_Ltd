import { company, localePath, site, type Locale } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { Section } from "./Section";

export function Contact({ locale }: { locale: Locale }) {
  const { contact } = site(locale);
  return (
    <Section
      id="contact"
      title={contact.title}
      intro={contact.intro}
      more={
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {contact.details.map((detail) => {
            const body = (
              <span className="min-w-0">
                <span className="block text-[14px] font-light text-mist">{detail.label}</span>
                <span className="mt-1 block truncate text-[18px] font-light tracking-[-0.01em] text-snow">{detail.value}</span>
              </span>
            );
            return (
              <li key={detail.label}>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-panel px-5 py-4 transition-colors hover:border-slate"
                  >
                    {body}
                    <span
                      aria-hidden="true"
                      className="text-mist transition-transform group-hover:translate-x-0.5 group-hover:text-snow motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </a>
                ) : (
                  <address className="block rounded-2xl border border-line bg-panel px-5 py-4 not-italic">{body}</address>
                )}
              </li>
            );
          })}
        </ul>
      }
    >
      <div className="lg:pt-4">
        <ContactForm copy={contact.form} email={company.email} privacyHref={localePath(locale, "/privacy/")} />
      </div>
    </Section>
  );
}
