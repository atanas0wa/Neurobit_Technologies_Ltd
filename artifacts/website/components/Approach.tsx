import { site, type Locale } from "@/content/site";
import type { StepArtKind } from "./StepArt";
import { StepRing } from "./StepRing";
import { WideSection } from "./Section";

/*
 * The steps on a slowly turning curved ring (StepRing): the card that turns
 * into the centre is the step in focus, and the panel under the ring rolls in
 * its word and description.
 */
// Illustrations follow the order of approach.steps.
const ART: StepArtKind[] = ["analysis", "design", "build", "launch", "support"];

export function Approach({ locale }: { locale: Locale }) {
  const { approach } = site(locale);
  return (
    <WideSection id="process" title={approach.title}>
      <StepRing
        label={approach.title}
        steps={approach.steps.map((step, i) => ({ ...step, art: ART[i] }))}
        prev={approach.prev}
        next={approach.next}
        pause={approach.pause}
        play={approach.play}
      />
    </WideSection>
  );
}
