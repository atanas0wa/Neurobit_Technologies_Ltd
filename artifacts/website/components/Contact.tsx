import { contact } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section
      id="contact"
      label={contact.label}
      title={contact.title}
      intro={contact.intro}
      more={
        <dl className="mt-10 space-y-5">
          {contact.details.map((detail) => (
            <div key={detail.label}>
              <dt className="font-mono text-label font-medium uppercase text-mist">{detail.label}</dt>
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
        <ContactForm />
      </div>
    </Section>
  );
}
