# Edgar Mejía — Personal Portfolio

Personal portfolio and blog at [edgarmejia.com](https://edgarmejia.com), built with Astro 5. The whole site is a terminal session: each section is the output of a command (`fastfetch`, `ls -l`, `lazygit`, `mail`).

## Tech Stack

- **[Astro 5](https://astro.build)**: static site, Content Layer API, `ClientRouter` view transitions, optimized images
- **[MDX](https://mdxjs.com)**: blog posts with components
- **[Tailwind CSS 4](https://tailwindcss.com)**: CSS reset and utilities; the design itself is scoped component CSS on top of the theme tokens in `src/styles/global.css`
- **i18n**: English (default) and Spanish (`/es/...`)
- **Python + Pillow**: `scripts/ascii-art.py` turns photos into the ASCII/ANSI art

## Project Structure

```
src/
├── assets/blog/        # post images, optimized at build time
├── components/
│   ├── home/           # landing sections: Hero, Projects, Writing, Experience, Contact
│   └── blog/           # post pieces: Toc, ProfileDialog, RelatedPosts, ReadingStatus...
├── content/blog/
│   ├── en/             # English posts
│   └── es/             # Spanish translations (same file name as the English post)
├── content.config.ts   # blog collection schema
├── data/               # site details, experience, projects, generated art
├── i18n/               # UI strings
├── layouts/            # Layout, BlogIndex, BlogPost
├── pages/              # thin routes: /, /blog, /es/blog
├── styles/global.css   # theme tokens and shared terminal styles
└── utils/              # blog queries, formatters, page lifecycle
```

Personal details (name, email, socials) live in `src/data/site.ts` and nowhere else.

## Commands

| Command                | Action                                   |
| :--------------------- | :--------------------------------------- |
| `npm install`          | Install dependencies                     |
| `npm run dev`          | Start the dev server at `localhost:4321` |
| `npm run build`        | Build for production to `./dist/`        |
| `npm run preview`      | Preview the production build locally     |
| `npm run check`        | Type-check `.astro` and `.ts` files      |
| `npm run format`       | Format with Prettier                     |
| `npm run format:check` | Check formatting (CI runs this)          |

CI (`.github/workflows/ci.yml`) runs the format check, the type check and the build on every push and pull request.

## Writing a post

Add `src/content/blog/en/<slug>.md` (`.mdx` only when the post needs components or imports). Prefix the file name with `_` to keep it as an unpublished draft. For a Spanish version, add `src/content/blog/es/<slug>.md` with the same slug: the two posts link to each other and get `hreflang` tags automatically. Reference images with paths relative to the post (`../../../assets/blog/...`) so Astro optimizes them.
