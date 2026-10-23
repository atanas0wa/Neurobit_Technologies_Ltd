import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
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
    </>
  );
}
