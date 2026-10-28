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
        <dl className="mt-10 space-y-6">
          {contact.details.map((detail) => (
            <div key={detail.label}>
              <dt className="text-[14px] font-light text-mist">{detail.label}</dt>
              <dd className="mt-1.5 text-[20px] font-light tracking-[-0.01em] text-snow">
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="underline decoration-slate/60 decoration-1 underline-offset-[6px] transition-colors hover:decoration-signal"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <address className="not-italic">{detail.value}</address>
                )}
              </dd>
            </div>
          ))}
        </dl>
      }
    >
      {/* "Discuss your project" lands here, so phones open straight on the form;
          from lg the margin keeps the section title in view beside it. */}
      <div id="contact-form" className="lg:scroll-mt-[120px] lg:pt-4">
        <ContactForm copy={contact.form} email={company.email} privacyHref={localePath(locale, "/privacy/")} />
      </div>
    </Section>
  );
}
