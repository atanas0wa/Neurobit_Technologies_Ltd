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
