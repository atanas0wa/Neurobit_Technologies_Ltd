"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

// Matches --color-void in each theme, for the browser chrome on mobile.
const themeColor: Record<Theme, string> = { dark: "#05070A", light: "#FFFFFF" };

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor[theme]);
}

/*
 * Dark is the default. The choice is saved in localStorage; the inline
 * script in app/layout.tsx applies it before first paint. Icons switch
 * through the `light:` variant, so they're right before hydration too.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved: Theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    applyTheme(saved);
    setTheme(saved);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked: the theme still applies for this visit.
    }
  }

  const label = theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex size-[44px] cursor-pointer items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-mist hover:text-snow"
    >
      {/* Sun: shown in dark mode, switches to light. */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
        className="light:hidden"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      {/* Moon: shown in light mode, switches to dark. */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="hidden light:block"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
