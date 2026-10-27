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
        <dl className="mt-10 space-y-5">
          {contact.details.map((detail) => (
            <div key={detail.label}>
              <dt className="text-[14px] font-light text-mist">{detail.label}</dt>
              <dd className="mt-1.5 text-[20px] font-light tracking-[-0.01em] text-snow">
                {detail.href ? (
                  <a href={detail.href} className="transition-colors hover:text-mist">
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
      <div className="lg:pt-10">
        <ContactForm copy={contact.form} email={company.email} privacyHref={localePath(locale, "/privacy/")} />
      </div>
    </Section>
  );
}
