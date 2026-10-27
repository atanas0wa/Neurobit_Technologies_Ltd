import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ButtonLink, Container, Label } from "@/components/ui";
import { company, site } from "@/content/site";
import "./globals.css";

// Unmatched URLs skip both root layouts, so this page brings its own <html>, font and theme script.
const inter = Inter({ subsets: ["latin", "cyrillic"], weight: ["300", "400", "600"], variable: "--font-inter" });

const bg = site("bg").notFound;
const en = site("en").notFound;

export const metadata: Metadata = { metadataBase: new URL(company.url), title: `404 - ${company.name}` };

const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function GlobalNotFound() {
  return (
    <html lang="bg" data-theme="dark" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main>
          <Container className="flex min-h-svh flex-col justify-center py-20">
            <Label>404</Label>
            <h1 className="mt-4 text-h1 font-regular text-snow">{bg.title}</h1>
            <p className="mt-5 max-w-[560px] text-body font-light text-mist">{bg.body}</p>
            <p lang="en" className="mt-3 max-w-[560px] text-body font-light text-mist">
              {en.title}. {en.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="/">{bg.back}</ButtonLink>
              <a href="/en/" lang="en" className="text-[15px] text-mist transition-colors hover:text-snow">
                {en.back} →
              </a>
            </div>
          </Container>
        </main>
      </body>
    </html>
  );
}
