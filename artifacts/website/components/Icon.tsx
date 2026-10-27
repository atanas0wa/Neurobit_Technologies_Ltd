/* Line icons for service and "why us" cards. Stroke follows the text colour. */
const paths = {
  web: "M3 5.5h18v13H3z M3 9h18 M6 7.25h.01 M8.5 7.25h.01",
  mobile: "M7 2.5h10v19H7z M10.5 18.5h3",
  ai: "M8 8h8v8H8z M10 3v3 M14 3v3 M10 18v3 M14 18v3 M3 10h3 M3 14h3 M18 10h3 M18 14h3",
  people: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3.5 19.5c.6-3 2.8-5 5.5-5s4.9 2 5.5 5 M16 5.2a3 3 0 0 1 0 5.6 M17.5 14.7c1.6.7 2.7 2.4 3 4.8",
  scope: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M12 12h.01",
  shield: "M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z M8.75 12l2.25 2.25 4.25-4.5",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-6 ${className}`}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
