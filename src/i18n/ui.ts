export const defaultLang = 'en' as const;

export const ui = {
  en: {
    'blog.title': 'Writing',
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
    'blog.close': 'Close',
    'blog.prev-image': 'Prev',
    'blog.next-image': 'Next',
    'goto.title': 'Go to',
    'goto.empty': 'no matches',
    'goto.of': 'of',
    'goto.keys': '[↑↓] move · [enter] open · [esc] close',
    'help.title': 'Keyboard shortcuts',
    'help.everywhere': 'Everywhere',
    'help.goto': 'go to a page or post',
    'help.help': 'this help',
    'help.header': 'the header: home, go to, theme',
    'help.move': 'move',
    'help.open': 'open',
    'help.viewer': 'Image viewer',
    'help.image': 'previous / next image',
    'help.home': 'Home',
    'help.sections': 'jump to a section',
    'help.jobs': 'previous / next job (in experience)',
  },
  es: {
    'blog.title': 'Blog',
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
    'blog.close': 'Cerrar',
    'blog.prev-image': 'Anterior',
    'blog.next-image': 'Siguiente',
    'goto.title': 'Ir a',
    'goto.empty': 'sin resultados',
    'goto.of': 'de',
    'goto.keys': '[↑↓] mover · [enter] abrir · [esc] cerrar',
    'help.title': 'Atajos de teclado',
    'help.everywhere': 'En todo el sitio',
    'help.goto': 'ir a una página o post',
    'help.help': 'esta ayuda',
    'help.header': 'el encabezado: inicio, ir a, tema',
    'help.move': 'mover',
    'help.open': 'abrir',
    'help.viewer': 'Visor de imágenes',
    'help.image': 'imagen anterior / siguiente',
    'help.home': 'Inicio',
    'help.sections': 'saltar a una sección',
    'help.jobs': 'trabajo anterior / siguiente (en experiencia)',
  },
} as const;

export type Lang = keyof typeof ui;
export type TranslationKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
