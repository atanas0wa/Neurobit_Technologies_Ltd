import Link from "next/link";
import { company } from "@/content/site";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 rounded-sm" aria-label={`${company.name} home`}>
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path d="M4 4 L11 11 L4 18 M11 11 H18" stroke="#2E6AFF" strokeWidth="1.25" fill="none" />
        <circle cx="4" cy="4" r="2.25" fill="#22D3EE" />
        <circle cx="4" cy="18" r="2.25" fill="#22D3EE" />
        <circle cx="11" cy="11" r="2.75" fill="#F5F7FA" />
        <circle cx="18" cy="11" r="2.25" fill="#3DDC97" />
      </svg>
      <span className="text-[19px] font-regular tracking-[-0.03em] text-snow">{company.name}</span>
    </Link>
  );
}
