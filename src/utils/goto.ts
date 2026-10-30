import { site } from '../data/site';
import { useTranslations, type Lang } from '../i18n/ui';
import { blogUrl, getPosts, postSlug, postUrl } from './blog';

export type GoToItem = { href: string; path: string; title: string };

// the Go to menu's index: the two pages, then every post newest first. Pages carry only its head (Shortcuts.astro);
// the whole thing is /goto-<lang>.json, fetched when the menu first opens
export async function goToItems(lang: Lang): Promise<GoToItem[]> {
  const t = useTranslations(lang);
  return [
    { href: '/', path: '~/home', title: site.name },
    { href: blogUrl(lang), path: '~/blog', title: t('blog.title') },
    ...(await getPosts(lang)).map((p) => ({ href: postUrl(p), path: `~/blog/${postSlug(p)}.md`, title: p.data.title })),
  ];
}
