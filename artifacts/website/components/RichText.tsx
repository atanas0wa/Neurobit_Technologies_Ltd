import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const link = "text-snow underline underline-offset-4 transition-colors hover:text-mist";

/** Renders the two inline formats used in content: [text](url) and **bold**. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    parts.push(text.slice(last, index));
    const [, label, href, strong] = match;
    if (strong) {
      parts.push(
        <strong key={index} className="font-regular text-snow">
          {strong}
        </strong>,
      );
    } else if (href.startsWith("/")) {
      parts.push(
        <Link key={index} href={href} className={link}>
          {label}
        </Link>,
      );
    } else {
      const external = href.startsWith("http");
      parts.push(
        <a
          key={index}
          href={href}
          className={link}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>,
      );
    }
    last = index + match[0].length;
  }
  parts.push(text.slice(last));
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
