DraftRecon Design & UI System  
**Version:** v0.1  
**Owner:** Michail  
**Date:** June 2025  

---

## 🔹 1. Brand Identity

**Tone:**  
- High-signal, clean, professional  
- Slightly futuristic (for AI + automation)  
- Trust-building, not flashy or social

**Keywords:**  
`Precision` · `Credibility` · `Builder-first` · `Low-noise` · `Scouting`

---

## 🔹 2. Color Palette

| Name              | Hex       | Usage                                |
|-------------------|-----------|--------------------------------------|
| **Midnight Slate**| `#1E293B` | Primary background (cards, site bg)  |
| **Signal Indigo** | `#6366F1` | Accent (CTA, highlights, filters)    |
| **Cloud Gray**    | `#F1F5F9` | Light backgrounds (forms, inputs)    |
| **Steel Text**    | `#94A3B8` | Subtext, secondary labels            |
| **Jet Black**     | `#0F172A` | Primary text (headlines)             |
| **Signal Green**  | `#00A572` | Status highlight or badge use        |
| **Error Red**     | `#EF4444` | Errors, warnings, danger buttons     |

> 🎯 Base the app's feel around `#1E293B` + `#6366F1` — clean, technical, slightly tactical.

---

## 🔹 3. Typography

| Type          | Font               | Weight  | Use                        |
|---------------|--------------------|---------|-----------------------------|
| Headlines     | Inter or Satoshi   | 600–700 | Page titles, section heads  |
| Body Text     | Inter              | 400     | Descriptions, instructions  |
| Code/UI Label | JetBrains Mono     | 500     | Tech tools, tags, badges    |

Use [Google Fonts - Inter](https://fonts.google.com/specimen/Inter) during MVP.

---

## 🔹 4. Layout & Spacing

- **Cards**: Rounded corners (`rounded-2xl`), soft shadows (`shadow-md`)
- **Spacing**: Use multiples of `4px` (padding: 4, 8, 16, 24)
- **Sections**: Max width `1200px`, center content with breathing room
- **Form Inputs**: Use `Cloud Gray` background with full width and clear borders

---

## 🔹 5. Component System (MVP)

| Component         | Use                                         |
|------------------|---------------------------------------------|
| **Player Card**   | Showcases builder info, tags, projects     |
| **Badge**         | Tool/Skill tag (e.g., `Zapier`, `GPT-4`)   |
| **CTA Button**    | “Join Waitlist”, “Scout”, “Publish Card”   |
| **Sidebar Menu**  | For recruiter dashboard (card filtering)   |
| **Card Gallery**  | Grid for public browsing                   |
| **Modal**         | For onboarding, card preview, or filters   |

---

## 🔹 6. UI Behaviors

- Hover states should subtly glow the **Signal Indigo**
- Forms must auto-save or visually confirm state saved
- Minimal use of red; highlight positive outcomes more than errors

---

## 🔹 7. Logo & Branding (Temporary)

- Use clean sans-serif type for logo (e.g., `DRAFTRECON` in bold Inter)
- Color: White on `#1E293B` background
- Tools like [https://makelogolight.com/](https://makelogolight.com/) are fine for MVP

---

## 🔹 8. Design Tools & Export

- **Design Tool**: Use Figma or Tailwind Playground
- **Export Format**: HTML Tailwind + React component blocks (preferred)
- **Component Strategy**: Stateless components with props for future AI logic

