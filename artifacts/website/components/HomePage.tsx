import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stack } from "@/components/Stack";
import type { Locale } from "@/content/site";

/** Homepage section order, shared by both languages. */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Services locale={locale} />
      <Approach locale={locale} />
      <Stack locale={locale} />
      <About locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
