---
name: Neurobit Technologies
description: A calm, type-led company site where a quiet neuron network lives behind plain, honest copy.
colors:
  void: "#05070A"
  panel: "#0B0F17"
  line: "#1C2330"
  snow: "#F5F7FA"
  mist: "#A3ACB9"
  slate: "#6B7280"
  signal: "#2E6AFF"
  signal-hover: "#1F5BF0"
  terminal: "#3DDC97"
  cyan: "#22D3EE"
  light-void: "#EDF0F4"
  light-panel: "#F8FAFC"
  light-line: "#D5DBE3"
  light-snow: "#0B0F17"
  light-mist: "#4B5563"
  light-slate: "#5F6775"
  light-terminal: "#047857"
  light-cyan: "#0891B2"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(52px, 2.2rem + 5.6vw, 104px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.045em"
  headline-1:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(44px, 2rem + 4vw, 78px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline-2:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(36px, 1.6rem + 2.8vw, 56px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline-3:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(30px, 1.4rem + 1.8vw, 42px)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 300
    lineHeight: 1.5
  small:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.06em"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  sm: "4px"
  field: "12px"
  card: "24px"
  full: "9999px"
spacing:
  unit: "6px"
  xs: "12px"
  sm: "18px"
  md: "24px"
  lg: "36px"
  xl: "48px"
  section: "120px"
  section-mobile: "60px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "#FFFFFF"
    typography: "{typography.small}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.signal-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.snow}"
    typography: "{typography.small}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.mist}"
    rounded: "{rounded.full}"
    size: "44px"
  card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.snow}"
    rounded: "{rounded.card}"
    padding: "48px"
  input:
    backgroundColor: "{colors.void}"
    textColor: "{colors.snow}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "18px 24px"
  nav:
    backgroundColor: "transparent"
    textColor: "{colors.mist}"
    typography: "{typography.small}"
    height: "72px"
---

# Design System: Neurobit Technologies

## Overview

**Creative North Star: "The Quiet Network"**

A calm, dark field with a living neuron network humming in the background. Large, light-weight type and plain sentences stay in front. The site earns trust the way the company does: by being direct and leaving out anything that pretends. There are no stock photos, invented numbers or decorative noise. Structure comes from generous space, thin hairlines and a clear typographic scale.

The mood is **calm and confident, technical but human, precise and honest, and subtly alive**. The technical world shows up as texture, never as jargon: the neuron canvas, a terminal-green pulse, a short code panel that types itself. The words are always written for a business owner. Motion is slow and ambient, and it pauses or settles completely for visitors who prefer reduced motion.

Dark is the default theme. The light theme keeps the same tokens with different values: a soft cool-grey ground, with near-white panels raised above it rather than set into it.

**Key Characteristics:**
- Type-led sections: a big regular-weight headline, then light body copy in mist.
- One filled blue action per view. Everything else is text, outline or hairline.
- Flat surfaces separated by 1px lines and tonal steps. No shadows.
- Soft geometry: pill buttons, 24px card corners, 12px field corners.
- Ambient neuron motion behind the content. One small moment per section (pulsing step dots, the typing code, looping service illustrations).
- Two themes and two languages (English and Bulgarian) carry identical structure.

## Colors

A near-black, cool-neutral palette with one blue voice for action and a green "signal" for life and progress.

### Primary
- **Signal Blue** (signal): the only fill for actions, used for the primary "Discuss your project" button, focus rings, the text caret, text selection, and the selected state in illustrations. It deepens to **Pressed Blue** (signal-hover) on hover. White text on it passes AA.

### Secondary
- **Terminal Green** (terminal): the colour of things being alive or done. Uses: step dots in "How we work", the success message, keywords in the code panel, the typing caret, and mono labels. In light mode it darkens (light-terminal) to keep text contrast.

### Tertiary
- **Synapse Cyan** (cyan): **decorative only.** It colours the pulses that travel along neuron links in the canvas. Never use it for text.

### Neutral
- **Void** (void / light-void): the page ground. Near-black in dark mode, soft cool grey in light mode.
- **Panel** (panel / light-panel): raised surfaces such as cards, the contact form and the code panel. One step lighter than Void in both themes.
- **Hairline** (line / light-line): every divider, card border, field border and section rule.
- **Snow** (snow / light-snow): headlines and primary text. Light on dark, near-black on light.
- **Mist** (mist / light-mist): body copy, nav links and secondary text. It is the default reading colour for paragraphs.
- **Slate** (slate / light-slate): the quietest readable tone, used for code line numbers and the hover state of field borders.

### Named Rules
**The One Voice Rule.** Signal Blue is the only filled colour in the interface, and each view carries one primary action. Secondary actions are outlined pills or text links.

**The Same Names Rule.** Both themes use the same token names. Components never branch on theme for colour, so a new component that uses tokens is automatically correct in both.

**The Contrast Floor Rule.** All readable text clears WCAG AA in both themes. Check a new colour against Void (the darker surface in light mode) before using it for text.

## Typography

**Display Font:** Inter (with ui-sans-serif, system-ui)
**Body Font:** Inter
**Label/Mono Font:** JetBrains Mono (with ui-monospace)

**Character:** One neutral grotesk used at two weights. Headlines are regular weight (400) with tight tracking. Body copy is light (300), which keeps the voice quiet and open. Mono appears only where something really is code or a label.

### Hierarchy
- **Display** (400, clamp 52 → 104px, line height 1, tracking −0.045em): reserved for the largest statement moments.
- **Headline 1** (400, clamp 44 → 78px, 1.05): the hero headline, one sentence per line, max ~16ch, balanced.
- **Headline 2** (400, clamp 36 → 56px, 1.1): section titles ("What we build", "How we work").
- **Headline 3** (400, clamp 30 → 42px, 1.15): process step titles and service names.
- **Title** (400, 22–24px, tracking −0.02em): card titles, FAQ questions and the Why-us points.
- **Body** (300, 18px, 1.5): all paragraphs, in Mist, with a max width of about 560px (roughly 65ch).
- **Small** (400–600, 14–15px): nav links, buttons, footer, form labels.
- **Label** (500, 13px mono, uppercase, +0.06em): small terminal-green labels on the legal pages and the 404 page only.

### Named Rules
**The Light Body Rule.** Paragraphs are weight 300 in Mist. Snow is reserved for headings and the single sentence that leads a block.

**The Fluid Ceiling Rule.** The token sizes are the desktop maximum. Headings scale down with `clamp()`, and nothing goes below the minimums listed above.

## Layout

- **Container and grid:**
  - A single centred container, 1280px max, with side padding of 24px on phones and 48px from `md` up.
  - Sections use a 12-column grid from `lg`, with a 36px gap.
  - Text sits in a 5-column column. Content sits in a 6-column column, offset to the opposite side, and sections alternate sides down the page.
- **Spacing:**
  - The base unit is **6px** (Tailwind's spacing unit is overridden), so the steps are 12, 18, 24, 36 and 48px.
  - Sections breathe with 60px vertical padding on phones and 120px from `md`.
  - Headline-to-intro spacing is 30px.
  - Content starts 60–96px below a section header.
- **Breakpoints:**
  - Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.
  - The desktop nav appears at `xl`. Below that, a full-height menu replaces it.
  - Multi-column grids collapse to a single column below `md`/`lg`.
- **Rhythm:**
  - Lists and steps use full-width hairline rows (top and bottom 1px borders) instead of boxes.
  - Cards appear only where items are parallel options: "Ways to work with us", testimonials, the contact form and the code panel.
- **Fixed nav:**
  - 72px tall.
  - The page reserves 96px of scroll padding so anchors land below it.

## Elevation & Depth

The system is flat. Depth comes from **tonal layering** (Panel sits one step above Void), 1px Hairline borders and, in the nav, translucency. Neither theme uses static drop shadows.

The only shadow-like effects are motion: the expanding green ring on a step dot when it fires, and the focus ring on fields.

### Named Rules
**The Flat-By-Default Rule.** Surfaces never cast shadows. To lift something, move it one tonal step and give it a hairline.

**The Raised Panel Rule.** Panels are lighter than the ground in both themes. Fields inside a panel use Void, so they read as inset.

## Shapes

Soft and restrained:
- **Buttons and round controls:** fully rounded pills and circles (9999px).
- **Cards and panels:** large, generous corners (24px).
- **Form fields:** a smaller 12px radius.
- **Focusable text links:** a hint of rounding (4px).

All borders are 1px Hairline. Thicker borders and coloured side borders are not part of the language. Icons are drawn with thin 1px strokes, for example the FAQ plus/minus, the menu bars, and the line illustrations of service UIs.

## Components

### Buttons
Soft and confident, with one filled shape per view.
- **Shape:** a full pill (9999px).
- **Primary:** Signal Blue fill with white 14px semibold text and 12px × 24px padding. Hover deepens it to Pressed Blue with a colour transition. It is used for "Discuss your project" in the hero and the options section, and for "Send inquiry".
- **Outline (nav CTA at rest):** transparent with a Hairline border and Snow text. The hover border shifts to Mist. When the hero CTA scrolls out of view, it becomes the filled primary.
- **Arrow link:** Mist text with a trailing →. Hover turns it Snow and nudges the arrow 2px.
- **Icon buttons** (theme toggle, language switch, FAQ toggle): 44px circles with a Hairline border and Mist icon. Hover sets the border to Mist and the icon to Snow.

### Cards / Containers
- **Corner style:** 24px.
- **Background:** Panel.
- **Shadow strategy:** none (see Elevation & Depth).
- **Border:** 1px Hairline.
- **Internal padding:** 36px on phones, 48px from `md`.
- **Content:** a Title heading, then Body text in Mist. No icons, and never nested.

### Inputs / Fields
- **Style:** Void background, 1px Hairline border, 12px radius, 18px × 24px padding, and text in Body light weight.
- **Hover:** the border becomes Slate.
- **Focus:** the border becomes Signal Blue, with a 4px Signal ring at 20% opacity. No browser outline.
- **Labels:** 14px medium Snow above the field. Optional fields add "(optional)" in Mist.
- **Disabled:** the whole fieldset is locked while sending, and the button shows a wait cursor at 70% opacity.

### Navigation
- **Layout:** a fixed 72px bar. It is transparent over the hero, then turns to Void at 80% opacity with a medium backdrop blur once the page scrolls.
- **Links:** 14px Mist, turning Snow on hover.
- **Right cluster:** the language switch (BG/EN circle) and the theme toggle.
- **Mobile:** a two-line hamburger opens a full-height panel. Links are 22px Title weight and the primary button sits below them.

### Neuron Field (signature)
- **What it is:** a canvas of drifting nodes and links behind every page. A larger, denser network sits beside the hero headline.
- **Colours:** links use Signal and Terminal at low alpha. Pulses travel along links in Synapse Cyan, and a node "fires" when a pulse reaches it.
- **Theme behaviour:** opacity and line width are tuned per theme, so the light theme uses slightly stronger lines.
- **Reduced motion:** the field stays still.

### Signal Steps (signature)
- **What it is:** the "How we work" list is a set of hairline rows with a 10px Terminal dot.
- **Behaviour:** dots fire with an expanding ring as the scroll position passes them, and the latest one keeps pulsing. Steps not yet reached show Slate.

### Code Panel (signature)
- **What it is:** a Panel card with a file-name header row (mono 13px, Mist) and numbered lines in Slate.
- **Highlighting:** keywords are Terminal, function names are Snow medium, and comments are Mist.
- **Behaviour:** it types itself out once with a blinking green block caret.

### FAQ Accordion
- **Structure:** native `<details>` rows between hairlines. Questions use Title weight, and the toggle is the 44px circle icon button with a 1px plus that rotates to a minus.
- **Motion:** answers open with a smooth height transition (320ms, exponential ease-out) where the browser supports it.

## Do's and Don'ts

### Do:
- **Do** keep exactly one Signal Blue filled action visible per view. Make every other action an outline pill, an arrow link or a text link.
- **Do** set headlines in Inter 400 with tight tracking, and paragraphs in Inter 300 Mist at no more than ~560px wide.
- **Do** separate content with 1px Hairline rows and tonal Panel steps rather than shadows.
- **Do** use token names (void, panel, line, snow, mist, slate, signal, terminal) so components work in both themes without branching.
- **Do** give every animation a reduced-motion path in which content stays fully visible.
- **Do** ship every change in both languages with the same layout. Bulgarian copy runs longer, so check that headings still balance.

### Don't:
- **Don't** add drop shadows, glows, gradients or glass panels for decoration.
- **Don't** use Synapse Cyan or Signal Blue for body text, or Terminal Green for anything except life, success, progress and code.
- **Don't** put a mono label or kicker above section headings on the homepage. The heading carries itself, and mono labels stay on the legal and 404 pages.
- **Don't** use stock photography or illustrations that imply clients, results or metrics the company doesn't have.
- **Don't** nest cards or turn parallel content rows into boxed cards.
- **Don't** return the light theme to pure white (#FFFFFF) as the ground.
