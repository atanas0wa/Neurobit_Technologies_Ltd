import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Options } from "@/components/Options";
import { Problem } from "@/components/Problem";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import type { Locale } from "@/content/site";

/** Homepage section order, shared by both languages. */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Problem locale={locale} />
      <Services locale={locale} />
      <WhyUs locale={locale} />
      <About locale={locale} />
      <Approach locale={locale} />
      <Options locale={locale} />
      <Faq locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
