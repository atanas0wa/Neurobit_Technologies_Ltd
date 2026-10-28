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

/** Round outline icon button, as the theme toggle and the carousel controls. */
export const roundButtonClass =
  "flex size-[44px] cursor-pointer items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-mist hover:text-snow disabled:cursor-default disabled:opacity-40 disabled:hover:border-line disabled:hover:text-mist";

/** Previous/next control for a carousel. */
export function ArrowButton({
  direction,
  label,
  ...props
}: Omit<ComponentProps<"button">, "children" | "className" | "type"> & { direction: "prev" | "next"; label: string }) {
  return (
    <button {...props} type="button" aria-label={label} title={label} className={roundButtonClass}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}
