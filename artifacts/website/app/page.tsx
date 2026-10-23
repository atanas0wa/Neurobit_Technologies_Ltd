import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stack } from "@/components/Stack";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Approach />
      <Stack />
      <About />
      <Contact />
    </>
  );
}
