# Habesha Eatery — mini-site

A two-page site for a fictional Ethiopian restaurant in Bole, Addis Ababa, built with
semantic HTML and one shared stylesheet.

- `index.html` — reservation form, ETB menu table, and a media block (illustration + map)
- `contact.html` — contact form and an opening-hours table
- `style.css` — shared styles for both pages (type pairing: Fraunces for headings, Lora for body copy, Work Sans for UI/labels/tables, loaded via Google Fonts with serif/sans-serif system fallbacks)
- `assets/jebena.svg` — the illustration used in the media block (no external image dependency)

## How to open it

No build step or server is required.

1. Clone or download this repository.
2. Open `index.html` directly in a browser (double-click it, or right-click → "Open with").
3. Use the nav bar at the top to move to `contact.html` and back.

## Accessibility features implemented

- **Landmarks on every page:** one `<header>`, one `<nav>`, one `<main>`, one `<footer>` — each
  page has exactly one `<h1>`, with `<h2>` headings for every section, linked to their section
  via `aria-labelledby`.
- **Shared, keyboard-operable nav:** a plain `<nav><ul><a>` list on both pages. `aria-current="page"`
  marks the active page. Links are reachable and activatable with `Tab` + `Enter` alone, and have a
  visible focus outline (`:focus-visible`) instead of the browser default being removed.
- **Real `<label>`s, not placeholders:** every form input (`name`, `email`, `phone`, `date`, `time`,
  `guests`, `notes`, `message`) has a `<label for="…">` tied to its input's `id`. The reservation
  form's fields are grouped in a `<fieldset>` with a `<legend>` describing the group.
- **Helpful, validated inputs:** correct input `type`s (`email`, `tel`, `date`, `time`, `number`)
  so mobile/assistive keyboards and built-in validation kick in; `required` on essential fields;
  `autocomplete` attributes on name/email/phone/tel; hint text connected with `aria-describedby`
  rather than left as a floating, unassociated note.
- **Accessible tables:** both the menu table and the opening-hours table have a `<caption>` and use
  `scope="col"` on column headers and `scope="row"` on row headers (dish names / days), so screen
  readers announce the right header for every cell.
- **Meaningful alt text and a titled iframe:** the media block's illustration has descriptive `alt`
  text (and an `<svg>` with `<title>`/`<desc>` for redundancy), and the embedded Google Map `<iframe>`
  has a `title` attribute describing what it shows.
- **Visible keyboard focus everywhere:** a single `:focus-visible` rule in `style.css` styles focus
  consistently for links, buttons, and all form controls, so keyboard-only navigation is always
  visible.
- **Unique `<title>` and meta description per page**, so each page is identifiable in browser tabs,
  search results, and screen-reader page-load announcements.

## Checking it

- Keyboard only: `Tab` through each page and confirm you can reach and submit both forms with
  `Tab` + `Enter`, without a mouse.
- Run both pages through the [W3C Markup Validator](https://validator.w3.org/#validate_by_upload)
  (upload the files, or validate by URL once pushed to GitHub Pages) and confirm zero errors.

## Publishing to GitHub

This folder is already a git repository with an initial commit. To push it:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```
