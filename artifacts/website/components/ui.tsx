import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & { className?: string };

export const buttonClass =
  "inline-flex items-center rounded-full bg-signal px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-signal-hover btn-shine";

/** The one filled action per view, with the signal sweep along its rim (`.btn-shine` in globals.css). */
export function ButtonLink({ className = "", ...props }: LinkProps) {
  return <Link {...props} className={`${buttonClass} ${className}`} />;
}

/** Secondary action: text with a trailing arrow. */
export function ArrowLink({ className = "", children, ...props }: LinkProps & { children: ReactNode }) {
  return (
    <Link
      {...props}
      className={`group inline-flex items-center gap-2 text-[15px] text-mist transition-colors hover:text-snow ${className}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">
        →
      </span>
    </Link>
  );
}

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-mono text-label font-medium uppercase text-terminal ${className}`}>{children}</p>;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-page px-4 md:px-8 ${className}`}>{children}</div>;
}
