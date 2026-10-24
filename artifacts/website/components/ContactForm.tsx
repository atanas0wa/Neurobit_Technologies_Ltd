"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { company, contact } from "@/content/site";
import { buttonClass } from "./ui";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const field =
  "mt-2 block w-full border-0 border-b border-slate bg-transparent px-0 py-2 text-body font-light text-snow transition-colors hover:border-mist focus:border-signal";
const fieldLabel = "block font-mono text-label font-medium uppercase text-mist";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const copy = contact.form;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    // Without a Formspree ID (local dev, Replit preview) hand the message to the visitor's email app.
    if (!FORMSPREE_ID) {
      const data = new FormData(form);
      const body = `${data.get("message")}\n\n${data.get("name")} <${data.get("email")}>`;
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(body)}`;
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
        <label htmlFor="contact-message" className={fieldLabel}>
          {copy.message}
        </label>
        <p id="contact-message-hint" className="mt-1.5 text-[15px] font-light text-mist">
          {copy.messageHint}
        </p>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          aria-describedby="contact-message-hint"
          className={`${field} resize-y`}
        />
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
              <a href={`mailto:${company.email}`} className="underline underline-offset-4 hover:text-mist">
                {company.email}
              </a>
              .
            </span>
          )}
          {status === "error" && (
            <span className="text-snow">
              {copy.error}{" "}
              <a href={`mailto:${company.email}`} className="underline underline-offset-4 hover:text-mist">
                {company.email}
              </a>
              .
            </span>
          )}
        </p>
      </div>

      <p className="max-w-[560px] text-[14px] font-light leading-normal text-mist">
        {copy.consent.before}{" "}
        <Link href="/privacy/" className="text-snow underline underline-offset-4 hover:text-mist">
          {copy.consent.link}
        </Link>
        {copy.consent.after}
      </p>
    </form>
  );
}
