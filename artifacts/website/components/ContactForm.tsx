"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Content } from "@/content/en";
import { buttonClass } from "./ui";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const field =
  "mt-2 block w-full border-0 border-b border-slate bg-transparent px-0 py-2 text-body font-light text-snow transition-colors hover:border-mist focus:border-signal";
const fieldLabel = "block text-[14px] font-light text-mist";

/* Copy comes in as props so the client bundle carries only one language. */
export function ContactForm({
  copy,
  email,
  privacyHref,
}: {
  copy: Content["contact"]["form"];
  email: string;
  privacyHref: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    // Without a Formspree ID (local dev, Replit preview) hand the message to the visitor's email app.
    if (!FORMSPREE_ID) {
      const data = new FormData(form);
      const company = data.get("company");
      const body = `${data.get("message")}\n\n${data.get("name")} <${data.get("email")}>${company ? `\n${company}` : ""}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-8">
      <input type="hidden" name="_subject" value={copy.subject} />
      {/* Honeypot: hidden from people, filled in by naive bots. Formspree drops those submissions. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
        <div>
          <label htmlFor="contact-name" className={fieldLabel}>
            {copy.name}
          </label>
          <input id="contact-name" name="name" type="text" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="contact-email" className={fieldLabel}>
            {copy.email}
          </label>
          <input id="contact-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className={fieldLabel}>
          {copy.company} <span>({copy.optional})</span>
        </label>
        <input id="contact-company" name="company" type="text" autoComplete="organization" className={field} />
      </div>

      <div>
        <label htmlFor="contact-message" className={fieldLabel}>
          {copy.message}
        </label>
        <textarea id="contact-message" name="message" required rows={5} className={`${field} resize-y`} />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          data-primary-cta
          disabled={status === "sending"}
          className={`${buttonClass} cursor-pointer disabled:cursor-wait disabled:opacity-70`}
        >
          {status === "sending" ? copy.sending : copy.submit}
        </button>
        <p role="status" aria-live="polite" className="text-[15px] font-light">
          {status === "sent" && <span className="text-terminal">{copy.success}</span>}
          {status === "mailto" && (
            <span className="text-snow">
              {copy.mailto}{" "}
              <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-mist">
                {email}
              </a>
              .
            </span>
          )}
          {status === "error" && (
            <span className="text-snow">
              {copy.error}{" "}
              <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-mist">
                {email}
              </a>
              .
            </span>
          )}
        </p>
      </div>

      <p className="max-w-[560px] text-[14px] font-light leading-normal text-mist">
        {copy.notice.before}{" "}
        <Link href={privacyHref} className="text-snow underline underline-offset-4 hover:text-mist">
          {copy.notice.link}
        </Link>
        {copy.notice.after} {copy.processor}
      </p>
    </form>
  );
}
