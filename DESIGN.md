---
name: Kyle Gough Portfolio
description: Personal Next.js portfolio; light, engineer-readable UI
colors:
  text-body: "#212121"
  background: "#FAFAFA"
  accent-surface: "#FAFAFF"
  header-ink: "#424242"
  link-cyan: "#03B0EE"
  link-hover-green: "#4CAF50"
  nav-bar: "#424242"
  nav-deep: "#353535"
  nav-hover-sheen: "#BBBBBB"
  chip-indigo: "#3F51B5"
  chip-wash: "#E8EAF6"
  error: "#EE3003"
  divider-hair: "#1F000000"
  disabled-text: "#00000066"
  timeline-rail: "#DADADA"
  traffic-red: "#EF5350"
  traffic-amber: "#FFB300"
  traffic-green: "#4CAF50"
typography:
  page-title:
    fontFamily: "Merriweather, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Lato, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Lato, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
    fontSize: "1em"
    lineHeight: "1.75rem"
  chip:
    fontFamily: "Lato, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: "1.7rem"
rounded:
  sm: "8px"
  md: "16px"
  pill: "9999px"
spacing:
  container: "1rem"
  container-sm: "1.5rem"
  container-md: "2rem"
  container-lg: "3rem"
  container-xl: "4rem"
  field-max: "25rem"
components:
  text-link:
    textColor: "{colors.link-cyan}"
    typography: "{typography.body}"
  text-link-hover:
    textColor: "{colors.link-hover-green}"
  chip:
    backgroundColor: "{colors.chip-wash}"
    textColor: "{colors.chip-indigo}"
    padding: "0.125rem 1rem"
    height: "2rem"
  nav-bar:
    backgroundColor: "{colors.nav-bar}"
    textColor: "#ffffff"
  form-input:
    textColor: "{colors.text-body}"
    backgroundColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
  cta-outlined:
    textColor: "{colors.link-cyan}"
    backgroundColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1rem"
  submit-pill:
    textColor: "{colors.link-cyan}"
    backgroundColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: "1rem 3rem"
  project-tile:
    textColor: "#ffffff"
    backgroundColor: "{colors.nav-bar}"
    rounded: "{rounded.md}"
---

# Design System: Kyle Gough Portfolio

## Overview

**Creative North Star: "The Calibrated Workshop"**

The interface reads as a well-lit workbench: a paper-like field (`#FAFAFA`), high-contrast body text, and a **single** cool path for interactivity: cyan links that warm to green on hover or success. The surface is a personal proof-of-work site, not a product dashboard, so visuals defer to project media and long-form case content.

The layout is container-centered with responsive padding steps (`1rem` through `4rem` by breakpoint). Readability is enforced with `max-w-reading` and `max-w-field` (80ch and 25rem) where copy or forms need measure control. Motion is local and functional: an 800ms mobile nav slide, a 200ms focus ring transition on underlines, a one-shot 500ms shimmer on the contact submit, and a spin on the send icon in loading. Nothing competes with scanning.

**Key characteristics:**

- Restrained neutrals, one link accent family, indigo only for **filter chips** and tags.
- Merriweather for project and page titles (via `project-title`); Lato for UI and body.
- Flat or lightly lifted surfaces: default shadow on form fields, stronger `drop-shadow-lg` on project image cards, header `drop-shadow` on section chrome where defined.

## Colors

A **restrained, light, engineering** palette: most surfaces are off-white and grey ink; color earns its place (links, chips, traffic dots, error).

### Primary

- **Cyan action** (`#03B0EE` / `text-link` / `border-link`): In-text links, form focus borders in valid state, GitHub and Live pill outlines, and send CTA in idle state.

### Secondary

- **Success / hover** (`#4CAF50` / `text-link-hover`, `fill-link-hover`): Link hover, valid sent state (`border-link-hover` on success), date accents on project headers, caret in fields.

### Tertiary (semantic, use sparingly)

- **Amber and red traffic** (`#FFB300` / `#EF5350` with `#4CAF50` for positive): Progress or status bands where the skills timeline and similar widgets encode category (not decorative chrome).

### Neutral

- **Body ink** (`rgba(0,0,0,0.87)` → `text-primary` in config): Long-form and UI text.
- **Field background** (`#FAFAFA` / `bg-background`): Page canvas and filled controls.
- **Lilac page tint** (`#FAFAFF` / `accent-blue`): Subtle large-area fill where specified.
- **Header and chrome** (`#424242` / `text-header`, `bg-nav-light`): Titles, meta theme, top nav, project card lower band.
- **Deeper header band** (`#353535` / `bg-nav-dark`): Where the dark stack steps down.
- **Hairline** (`rgba(0,0,0,0.12)` / `border-divider`): Rule lines.
- **Disabled** (`rgba(0,0,0,0.4)` / `text-disabled`): Muted text and loading state treatment.
- **Nav hover rail** (`#BBBBBB` / `bg-nav-hover`): In-menu hover backgrounds where used.
- **Timeline rail** (`#DADADA` / `timeline`): Neutral tracks (not a brand accent).
- **Error** (`#EE3003` / `text-error`, `border-error`): Form validation and failure.

### Accents and chips

- **Indigo chip** (`#3F51B5` on `rgba(63, 81, 181, 0.1)` as `text-chip` / `bg-chip-light` / `leading-chip` height): Rounded, bold filter chips on the projects page.

### Named rules

**The one cool family rule.** Cyan and green own interactive feedback; do not add extra saturated hues for “decoration” on the same screen.

**The indigo is for tags rule.** Full-strength indigo and its 10% wash are reserved for chips and tags, not primary CTAs, so filters stay scannable and links stay the action color.

## Typography

**Page title (Merriweather, semibold, `text-5xl`, `text-header`, `tracking-tight`, top margin in section):** Defined as `.project-title` in `styles/tailwind.css`.  
**Project subtitle (Merriweather, light, `text-xl`, `mt-4`):** `.project-subtitle`.  
**In-page section head:** `.project-header` uses `text-3xl` semibold `text-header` with `mb-8`.  
**Body (Lato):** Root `html` is `15px` with antialiasing.  
**Mono (system stack):** `.monospace` on the home intro for a terminal feel.

**Character:** Readable humanist sans with a serious serif for titles, no display novelty fonts.

### Hierarchy

- **Page / project title:** Merriweather 600 at ~3rem (`text-5xl`), `text-header` (`#424242`), tight tracking, generous top margin (`mt-12` class chain).
- **Subtitle:** Merriweather 300, `text-xl`, opens air below the title.
- **Body:** Lato 400, 15px base, line-height comfortable for 65–80ch when `max-w-reading` applies.
- **Labels (contact and forms):** Lato `text-lg`, `text-link` default with `group-focus-within:text-link-hover` on the control group, `mb-2` / `mt-8` rhythm.
- **Chips:** `text-xs` extrabold, all-caps or dense wordmark as content dictates, `leading-chip` (1.7rem box).

**The long-measure rule.** Keep paragraphs in `max-w-reading` on wide viewports. Do not stretch body copy to full 1280px width.

## Elevation

**Hybrid:** mostly flat with **light drop shadows** to separate fields and image cards from the field. The nav is a tonal block (not floating glass). A subtle **header drop shadow** (`0 1px 2px rgba(0, 0, 0, 0.5)`) on `drop-shadow-header` separates a band from scrolling content. Optional `bg-noise` is texture, not elevation.

### Shadow vocabulary

- **Field well** (`shadow` class on inputs and textarea): Default form controls sit slightly above the field.
- **Image card** (`drop-shadow-lg` on project card wrapper): The portfolio tile lifts for affordance; caption bar is a flat `bg-nav-light` strip, not a second shadowed card.
- **Submit control** (`shadow` on send button): Matches field depth.

**The flat-caption rule.** Project card metadata is a full-width band, not a nested card with a second box shadow.

## Components

For each pattern: shape, color role, and motion where it matters.

### Text links (default `Link` component)

- **Idle:** Cyan text (`#03B0EE`), no extra decoration in the default `className`.
- **Hover / focus:** Green (`#4CAF50`) for `hover:` and `focus:` on the same element.

### Outlined CTAs (GitHub / live on `ProjectHeader`)

- **Container:** `rounded-lg` (8px), `border-2` using link colors, `bg-background`, `text-link` with `hover:text-link-hover`, icon `fill` follows link.
- **Padding:** `px-4 py-2`, inline flex with icon and label.

### Chips (filters)

- **Pill shape:** `rounded-2xl` (16px), `h-8`, horizontal padding, `text-chip` / `bg-chip-light`, `text-xs` extrabold.

### Form inputs and textarea (`Contact`)

- **Field:** `rounded-2xl` (16px), `border-2`, `px-4 py-2`, `w-full` capped at `xs:w-field` (25rem), `bg-background`, `shadow`, `outline-none`, `caret-link-hover` for caret color.
- **Border state:** `getFieldBorderStyle`: valid idle uses `border-link` and `focus:border-link-hover`; error uses `border-error`; success (sent) uses `border-link-hover`.
- **Transition:** `transition-colours` (project spelling) and `duration-200` on border and label affordances.
- **Labels:** `text-link` with `group-focus-within:text-link-hover`.

### Send button (`ContactSendButton`)

- **Shape:** `rounded-full`, `border-2`, `px-12 py-4`, `bg-background`, `shimmer` hover animation (one-shot 500ms highlight sweep), `shadow` base.
- **Idle:** Cyan text and border; hover/focus to green; icon `fill` tracks.
- **Loading:** Muted text and `border-` with disabled palette (see note: class `border-link-disabled` appears in source; if missing in theme, use `border-disabled` pattern); spinning restart icon in `text-disabled` fill.
- **Sent / fail:** Green success border/text or `text-error` / `border-error` for failure, with tick or restart icon as appropriate.

### Project cards (grid on `/projects`)

- **Media frame:** `rounded-2xl`, `border-2 border-white` (seams image to frame), `drop-shadow-lg`, `overflow-hidden`, `group` for hover.
- **Caption band:** `bg-nav-light` (`#424242`), `text-white`, `p-4` bold, date in `text-sm` with `opacity-80`, logo 30×30.
- **Hover / focus on card:** `group-hover:brightness-125` and `group-focus:brightness-125` on the caption (image stays stable).

### Navigation (desktop and drawer)

- **Top strip:** `bg-nav-light` or related nav tokens, white type, border-bottom animation via `.border-bottom-slide` (2px white line animates from center, 200ms cubic in `globals.css`). Mobile: `slide-in` animation 800ms for panel.

## Do's and Don'ts

Pulled from `PRODUCT.md` anti-references and impeccable shared laws.

### Do

- **Do** keep the canvas in the off-white / grey-ink system and one link accent path for interactivity.
- **Do** use `project-title` and `project-subtitle` (Merriweather) for case-study and page heroes.
- **Do** keep chips indigo and links cyan/green so “filter” and “go” are visually distinct.
- **Do** preserve `max-w-reading` and `max-w-field` for long copy and the contact form.

### Don't

- **Don't** produce a **generic "AI portfolio" or template lookalike** with **identical card grids**, **meaningless hero metrics**, or **decorative gradients**; prefer varied project presentation and real content hierarchy.
- **Don't** use **dark mode for cool alone** or **neon-on-black tech clichés** without a concrete scene and user need that justify them.
- **Don't** ship **dense walls of unbroken text** or **unreadable case studies**; break with spacing, subheads, and line length.
- **Don't** reach for a **modal** or **heavy chrome** where **inline** or a **dedicated route** is enough.
- **Don't** use **gradient text** (`background-clip: text` with a gradient) or **glassmorphism** as a default.
- **Don't** use a **colored left or right border strip** (thick accent `border-left` / `border-right` on list rows or callouts) as the primary affordance; use full borders, tints, or typography.
- **Don't** stack **card inside card** for the same content tier.
