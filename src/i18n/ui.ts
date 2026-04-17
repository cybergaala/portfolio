export const defaultLang = 'en' as const;

export const ui = {
  en: {
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'hero.greeting': 'Hi there 👋!',
    'hero.intro': "I'm Edgar Mejía,",
    'hero.from': 'from El Salvador 🇸🇻',
  },
  es: {
    'nav.experience': 'Experiencia',
    'nav.contact': 'Contacto',
    'nav.blog': 'Blog',
    'hero.greeting': '¡Hola 👋!',
    'hero.intro': 'Soy Edgar Mejía,',
    'hero.from': 'de El Salvador 🇸🇻',
  },
} as const;

export type Lang = keyof typeof ui;
export type TranslationKey = keyof typeof ui[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
