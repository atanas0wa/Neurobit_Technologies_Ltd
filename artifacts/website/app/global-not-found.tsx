import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ButtonLink, Container, Label } from "@/components/ui";
import { company, site } from "@/content/site";
import "./globals.css";

// Unmatched URLs skip both root layouts, so this page brings its own <html>, font and theme script.
const inter = Inter({ subsets: ["latin", "cyrillic"], weight: ["300", "400", "600"], variable: "--font-inter" });

const bg = site("bg").notFound;
const en = site("en").notFound;

export const metadata: Metadata = { metadataBase: new URL(company.url), title: `404 - ${company.name}` };
export const viewport: Viewport = { themeColor: "#05070A", colorScheme: "dark" };

// No ThemeToggle here, so the script also sets the browser bar colour for a saved light theme.
const themeScript = `try{if(localStorage.getItem("theme")==="light"){document.documentElement.dataset.theme="light";document.addEventListener("DOMContentLoaded",function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.content="#EDF0F4"})}}catch(e){}`;

export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="dark" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main>
          <Container className="flex min-h-svh flex-col justify-center py-20">
            <Label>404</Label>
            <h1 className="mt-4 text-h1 font-regular text-snow">{en.title}</h1>
            <p className="mt-5 max-w-[560px] text-body font-light text-mist">{en.body}</p>
            <p lang="bg" className="mt-3 max-w-[560px] text-body font-light text-mist">
              {bg.title}. {bg.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="/">{en.back}</ButtonLink>
              <a href="/bg/" lang="bg" className="text-[15px] text-mist transition-colors hover:text-snow">
                {bg.back} →
              </a>
            </div>
          </Container>
        </main>
      </body>
    </html>
  );
}
