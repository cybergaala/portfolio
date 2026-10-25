export const defaultLang = 'en' as const;

export const ui = {
  en: {
    'blog.title': 'Writing',
    'blog.back': '← Blog',
    'blog.on-this-page': 'On this page',
    'blog.related': 'Related posts',
    'blog.writing': 'Writing — Edgar Mejía',
    'blog.writing-description': 'Articles on mobile development, tools, and software.',
    'blog.prev': '← Prev',
    'blog.next': 'Next →',
    'blog.min-read': 'min read',
    'blog.back-to-top': 'Back to top',
    'blog.pagination': 'Pagination',
    'blog.page': 'page',
  },
  es: {
    'blog.title': 'Blog',
    'blog.back': '← Blog',
    'blog.on-this-page': 'En esta página',
    'blog.related': 'Artículos relacionados',
    'blog.writing': 'Blog — Edgar Mejía',
    'blog.writing-description': 'Artículos sobre desarrollo móvil, herramientas y software.',
    'blog.prev': '← Anterior',
    'blog.next': 'Siguiente →',
    'blog.min-read': 'min de lectura',
    'blog.back-to-top': 'Volver arriba',
    'blog.pagination': 'Paginación',
    'blog.page': 'página',
  },
} as const;

export type Lang = keyof typeof ui;
export type TranslationKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
