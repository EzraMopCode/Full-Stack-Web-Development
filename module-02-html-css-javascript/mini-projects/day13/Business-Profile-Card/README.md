# Business Profile Card — Ethio Wellness Pharmacy

A single, self-contained profile card for **Ethio Wellness Pharmacy**, a fictional community
pharmacy on the Kazanchis roundabout in Addis Ababa.
## Files

- `index.html` — the card markup
- `styles.css` — all styling (no inline styles)

## How to open it

Download or clone the repository and open `index.html` directly in a browser. No build step
or server is required.

## CSS techniques used

- **CSS custom properties in `:root`**: a full color palette (`--brand`, `--brand-hover`,
  `--brand-light`, `--ink`, `--muted`, `--surface`, `--bg`, `--border`, `--focus-ring`) and a
  spacing scale (`--space-1` through `--space-7`, plus `--radius-sm` / `--radius` /
  `--radius-pill`), all consumed via `var()` — no hard-coded color or spacing value appears
  more than once.
- **HSL-based hover state**: `--brand` and `--brand-hover` share the same hue (`165`) and
  saturation (`55%`) and differ only in lightness (`30%` → `42%`), so `.btn:hover` changes
  exactly the lightness channel as required.
- **Global `box-sizing: border-box`** via the universal selector, so the card's `max-width`
  includes its padding and border rather than growing past it.
- **Two Google Fonts** loaded and applied through variables: Poppins (`--font-display`) for
  the business name and tagline, Inter (`--font-body`) for running text — with a generous
  `line-height: 1.6`–`1.7` throughout for readability.
- **Box model on the card**: `padding`, a 1px `border`, `border-radius`, and an auto `margin`
  center it and give it its shape; `box-shadow` adds depth.
- **Three pseudo-elements**:
  1. `.card::before` — a decorative gradient accent bar along the top edge of the card.
  2. `.status-dot::before` — a soft "pulse ring" behind the open/closed status dot.
  3. `.services li::before` — a checkmark glyph inserted before each service tag.
- **Typographic hierarchy**: a large, bold `h1` (business name) → a smaller, brand-colored,
  medium-weight tagline → regular-weight body text, each with distinct size/weight/color so
  the hierarchy reads at a glance.
- **`:focus-visible` on the button**, kept separate from `:hover`, so keyboard focus stays
  clearly visible and isn't accidentally removed.
- **No inline styles and no styling IDs**: every styled element is targeted with a class;
  the stylesheet is the single source of truth for appearance.

## Checking it

- Colors/spacing: search `styles.css` — every color and spacing value is declared once in
  `:root` and referenced elsewhere only via `var()`.
- Box sizing: resize the browser or inspect `.card` — its rendered width matches
  `max-width: 380px` exactly, padding and border included.
- Button: hover and Tab to the "Contact us" button — background lightens on hover, and a
  visible focus ring appears on keyboard focus.
- Hierarchy: compare the business name, tagline, and body paragraph — distinct size, weight,
  and color at each level.

## Publishing to GitHub

This folder is already a git repository with commits. To push it:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```
