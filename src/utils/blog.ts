import type { PaginateFunction } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Lang } from '../i18n/ui';

export type Post = CollectionEntry<'blog'>;

const WORDS_PER_MINUTE = 200;

// 'en/my-current-setup' -> 'my-current-setup'
export const postSlug = (post: Post) => post.id.replace(/^(en|es)\//, '');
export const postLang = (post: Post) => post.id.split('/')[0] as Lang;
export const postUrl = (post: Post) => getRelativeLocaleUrl(postLang(post), `blog/${postSlug(post)}`);
export const blogUrl = (lang: Lang, page = 1) => getRelativeLocaleUrl(lang, page === 1 ? 'blog' : `blog/${page}`);

// published posts in one language, newest first
export async function getPosts(lang: Lang) {
  const posts = await getCollection('blog', (p) => postLang(p) === lang && !p.data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// up to 3 posts that share a tag, newest first (posts is already sorted)
export const getRelated = (post: Post, posts: Post[]) =>
  posts.filter((p) => p.id !== post.id && p.data.tags?.some((t) => post.data.tags?.includes(t))).slice(0, 3);

// getStaticPaths for blog/[...page]: 10 posts per page
export const paginatePosts = async (paginate: PaginateFunction, lang: Lang) =>
  paginate(await getPosts(lang), { pageSize: 10 });

// getStaticPaths for blog/[...slug]: each post with its related posts and its translation, if any
export async function postPaths(lang: Lang) {
  const posts = await getPosts(lang);
  const others = await getPosts(lang === 'en' ? 'es' : 'en');
  return posts.map((post) => ({
    params: { slug: postSlug(post) },
    props: { post, related: getRelated(post, posts), translation: others.find((p) => postSlug(p) === postSlug(post)) },
  }));
}

// counts the prose only: MDX import lines are not read
export function readingTime(post: Post) {
  const text = (post.body ?? '').replace(/^import .*$/gm, '');
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE));
}
