import Link from "next/link";
import { company, localePath, site, type Locale } from "@/content/site";
import { Logo } from "./Logo";
import { Container } from "./ui";

const heading = "text-[14px] font-medium text-snow";
const link = "transition-colors hover:text-snow";

export function Footer({ locale }: { locale: Locale }) {
  const { footer, ui } = site(locale);
  return (
    <footer className="border-t border-line">
      <Container className="grid gap-10 py-12 md:grid-cols-12 md:gap-6 md:py-16">
        <div className="md:col-span-4">
          <Logo href={localePath(locale, "/")} label={ui.home} />
          <p className="mt-4 max-w-[320px] text-[15px] font-light text-mist">{footer.tagline}</p>
        </div>

        <div className="md:col-span-3">
          <h2 className={heading}>{footer.columns.company}</h2>
          <address className="mt-4 space-y-1 text-[15px] font-light not-italic text-mist">
            <p className="text-snow">{footer.legalName}</p>
            <p>{footer.registration}</p>
          </address>
        </div>

        <div className="md:col-span-3">
          <h2 className={heading}>{footer.columns.contact}</h2>
          <ul className="mt-4 space-y-1 text-[15px] font-light text-mist">
            <li>
              <a href={`mailto:${company.email}`} className={link}>
                {company.email}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.devEmail}`} className={link}>
                {company.devEmail}
              </a>
            </li>
          </ul>
          {/* Icon button like the theme toggle; the mark is drawn in 1.25px strokes to match the site's line icons. */}
          <a
            href={company.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={footer.linkedin}
            title="LinkedIn"
            className="group mt-5 flex size-[44px] items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-mist hover:text-snow"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <path d="M8 10.5V16.5M12 16.5V10.5M12 13.25C12 11.733 13.007 10.5 14.5 10.5S17 11.733 17 13.25V16.5" />
              <circle cx="8" cy="7.75" r="0.6" fill="currentColor" />
            </svg>
          </a>
        </div>

        <div className="md:col-span-2">
          <h2 className={heading}>{footer.columns.legal}</h2>
          <ul className="mt-4 space-y-1 text-[15px] font-light text-mist">
            {footer.legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={localePath(locale, item.href)} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container>
        <div className="border-t border-line py-6 text-[14px] font-light text-mist">
          <p>
            © {new Date().getFullYear()} {company.legalNameEn}. {footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
