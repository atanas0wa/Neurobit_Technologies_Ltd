import type { CSSProperties } from "react";
import { site, type Locale } from "@/content/site";
import { CodeTyping } from "./CodeTyping";
import { Section } from "./Section";

type Token = [kind: "k" | "f" | "p", text: string];

/*
 * The code beside the About text. Identifiers stay in English like real code;
 * the two comments come from content so they read in the page's language.
 */
function lines(comments: readonly string[]): (Token[] | string | null)[] {
  return [
    `// ${comments[0]}`,
    [["k", "const "], ["p", "idea = "], ["k", "await "], ["f", "talk"], ["p", "(you);"]],
    null,
    `// ${comments[1]}`,
    [["k", "const "], ["p", "scope = "], ["f", "understand"], ["p", "(idea.why);"]],
    null,
    [["k", "if "], ["p", "(!scope.worthBuilding) {"]],
    [["p", "  "], ["k", "return "], ["f", "tellYouHonestly"], ["p", "();"]],
    [["p", "}"]],
    null,
    [["f", "ship"], ["p", "(scope.firstVersion);"]],
    [["f", "handOver"], ["p", "(everything);"]],
  ];
}

const tone = { k: "text-terminal", f: "text-snow font-medium", p: "text-snow" } as const;

export function About({ locale }: { locale: Locale }) {
  const { about } = site(locale);
  return (
    <Section
      id="about"
      side="right"
      title={about.title}
      more={about.paragraphs.map((paragraph, i) => (
        <p
          key={paragraph}
          className={`mt-5 max-w-[560px] text-body font-light ${i === 0 ? "text-snow" : "text-mist"}`}
        >
          {paragraph}
        </p>
      ))}
    >
      <CodeTyping>
        <figure aria-label={about.code.label} className="overflow-hidden rounded-3xl border border-line bg-panel lg:mt-2">
          <figcaption className="border-b border-line px-5 py-3 font-mono text-[13px] text-mist">{about.code.file}</figcaption>
          <pre className="px-3 py-5 font-mono text-[13px] leading-[1.75] sm:px-5 sm:text-[14px] md:py-6">
            <code className="grid">
              {lines(about.code.comments).map((line, i, all) => (
                <span key={i} className="grid grid-cols-[2.25rem_1fr]">
                  <span aria-hidden="true" className="select-none pr-3 text-right text-slate">
                    {i + 1}
                  </span>
                  <span className="code-line whitespace-pre-wrap break-words" style={{ "--i": i } as CSSProperties}>
                    {line === null
                      ? " "
                      : typeof line === "string"
                        ? <span className="text-mist">{line}</span>
                        : line.map(([kind, text], j) => (
                            <span key={j} className={tone[kind]}>
                              {text}
                            </span>
                          ))}
                    {i === all.length - 1 && <span className="code-caret" aria-hidden="true" />}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        </figure>
      </CodeTyping>
    </Section>
  );
}
