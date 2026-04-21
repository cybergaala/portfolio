# Edgar Mejía — Personal Portfolio

Personal portfolio and blog site at [edgarmejia.com](https://edgarmejia.com), built with Astro 5.

## Tech Stack

- **[Astro 5](https://astro.build)** — static site generator
- **[Tailwind CSS 4](https://tailwindcss.com)** — styling via Vite plugin
- **[Preact](https://preactjs.com)** — interactive components
- **[MDX](https://mdxjs.com)** — blog posts with component support
- **i18n** — English (default) and Spanish (`/es/...`)

## Project Structure

```
/
├── public/             # Static assets, favicon, fonts, images
└── src/
    ├── components/     # Header, Footer, Head, YouTube
    ├── content/
    │   └── blog/
    │       ├── en/     # English posts
    │       └── es/     # Spanish posts
    ├── i18n/           # UI translations
    ├── layouts/        # Layout.astro, BlogPost.astro
    ├── pages/          # Routes (/, /blog, /es/blog, ...)
    └── styles/         # global.css
```

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start dev server at `localhost:4321`        |
| `npm run build`   | Build for production to `./dist/`           |
| `npm run preview` | Preview the production build locally        |
