"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Content } from "@/content/en";
import { buttonClass } from "./ui";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const field =
  "mt-2 block w-full rounded-xl border border-line bg-void px-4 py-3 text-body font-light text-snow transition-[border-color,box-shadow] duration-150 hover:border-slate focus:border-signal focus:outline-none focus:ring-4 focus:ring-signal/20";
const fieldLabel = "block text-[14px] font-medium text-snow";

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
    <form onSubmit={onSubmit} className="relative space-y-6 rounded-3xl border border-line bg-panel p-6 md:p-8">
      <input type="hidden" name="_subject" value={copy.subject} />
      {/* Honeypot: hidden from people, filled in by naive bots. Formspree drops those submissions. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
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
          {copy.company} <span className="font-light text-mist">({copy.optional})</span>
        </label>
        <input id="contact-company" name="company" type="text" autoComplete="organization" className={field} />
      </div>

      <div>
        <label htmlFor="contact-message" className={fieldLabel}>
          {copy.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={copy.messagePlaceholder}
          className={`${field} min-h-36 resize-y placeholder:text-mist`}
        />
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          data-primary-cta
          disabled={status === "sending"}
          className={`${buttonClass} cursor-pointer px-6 py-3 text-[15px] disabled:cursor-wait disabled:opacity-70 max-sm:w-full max-sm:justify-center max-sm:px-4 max-sm:text-center`}
        >
          {status === "sending" ? copy.sending : FORMSPREE_ID ? copy.submit : copy.submitMailto}
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`text-[15px] font-light ${
            status === "sent" || status === "mailto" || status === "error"
              ? `rounded-xl border px-4 py-3 ${status === "sent" ? "border-terminal/40 bg-terminal/10" : "border-line bg-void"}`
              : ""
          }`}
        >
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
        {copy.notice.after}
        {FORMSPREE_ID && ` ${copy.processor}`}
      </p>
    </form>
  );
}
