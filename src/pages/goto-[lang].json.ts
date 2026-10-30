import type { APIRoute } from 'astro';
import type { Lang } from '../i18n/ui';
import { goToItems } from '../utils/goto';

export const getStaticPaths = () => (['en', 'es'] as const).map((lang) => ({ params: { lang } }));

export const GET: APIRoute = async ({ params }) => Response.json(await goToItems(params.lang as Lang));
