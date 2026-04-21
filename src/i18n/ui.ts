export const defaultLang = 'en' as const;

export const ui = {
  en: {
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'hero.greeting': 'Hi there 👋!',
    'hero.intro': "I'm Edgar Mejía,",
    'hero.from': 'from El Salvador 🇸🇻',
    'blog.back': '← Blog',
    'blog.on-this-page': 'On this page',
    'blog.related': 'Related posts',
    'blog.read-in': 'Leer en Español',
    'blog.writing': 'Writing — Edgar Mejía',
    'blog.writing-description': 'Articles on mobile development, tools, and software.',
    'blog.prev': '← Prev',
    'blog.next': 'Next →',
    'blog.min-read': 'min read',
    'blog.back-to-top': 'Back to top',
  },
  es: {
    'nav.experience': 'Experiencia',
    'nav.contact': 'Contacto',
    'nav.blog': 'Blog',
    'hero.greeting': '¡Hola 👋!',
    'hero.intro': 'Soy Edgar Mejía,',
    'hero.from': 'de El Salvador 🇸🇻',
    'blog.back': '← Blog',
    'blog.on-this-page': 'En esta página',
    'blog.related': 'Artículos relacionados',
    'blog.read-in': 'Read in English',
    'blog.writing': 'Blog — Edgar Mejía',
    'blog.writing-description': 'Artículos sobre desarrollo móvil, herramientas y software.',
    'blog.prev': '← Anterior',
    'blog.next': 'Siguiente →',
    'blog.min-read': 'min de lectura',
    'blog.back-to-top': 'Volver arriba',
  },
} as const;

export type Lang = keyof typeof ui;
export type TranslationKey = keyof typeof ui[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
