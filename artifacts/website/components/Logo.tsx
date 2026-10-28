import Link from "next/link";
import { company } from "@/content/company";

export function Logo({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5 rounded-sm" aria-label={label}>
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path d="M4 4 L11 11 L4 18 M11 11 H18" className="stroke-signal" strokeWidth="1.25" fill="none" />
        <circle cx="4" cy="4" r="2.25" className="fill-cyan" />
        <circle cx="4" cy="18" r="2.25" className="fill-cyan" />
        <circle cx="11" cy="11" r="2.75" className="fill-snow" />
        <circle cx="18" cy="11" r="2.25" className="fill-terminal" />
      </svg>
      <span className="whitespace-nowrap text-[19px] font-regular max-[359px]:text-[15px] tracking-[-0.03em] text-snow">{company.name}</span>
    </Link>
  );
}
