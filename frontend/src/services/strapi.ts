// Strapi data service. All API calls go through here.
const BASE_URL = import.meta.env.VITE_STRAPI_URL as string;

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
}

export interface Author {
  id: number;
  name: string;
  email: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  articles?: Article[];
}

export interface ArticleBlock {
  __component: string;
  id: number;
  body?: string;
  title?: string;
  file?: StrapiImage;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  cover?: StrapiImage;
  author?: Author;
  category?: Category;
  blocks?: ArticleBlock[];
}

export interface About {
  id: number;
  title: string;
  blocks?: ArticleBlock[];
}

interface StrapiResponse<T> {
  data: T;
  meta?: { pagination?: { page: number; pageSize: number; pageCount: number; total: number } };
}

async function strapiFetch<T>(path: string): Promise<StrapiResponse<T>> {
  const url = `${BASE_URL}/api${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Strapi error ${res.status}: ${url}`);
  return res.json();
}

// Articles in this Strapi instance are unpublished — use status=draft.
const DRAFT = "status=draft";

export const strapi = {
  getArticles: () =>
    strapiFetch<Article[]>(`/articles?${DRAFT}&populate=*&sort=createdAt:desc`).then(r => r.data),

  getLatestArticles: (limit = 6) =>
    strapiFetch<Article[]>(
      `/articles?${DRAFT}&populate=*&sort=createdAt:desc&pagination[limit]=${limit}`,
    ).then(r => r.data),

  getArticleBySlug: async (slug: string) => {
    const res = await strapiFetch<Article[]>(
      `/articles?${DRAFT}&populate=*&filters[slug][$eq]=${encodeURIComponent(slug)}`,
    );
    return res.data[0] ?? null;
  },

  getCategories: () =>
    strapiFetch<Category[]>(`/categories?populate=*`).then(r => r.data),

  getCategoryBySlug: async (slug: string) => {
    const cats = await strapiFetch<Category[]>(
      `/categories?filters[slug][$eq]=${encodeURIComponent(slug)}`,
    );
    const cat = cats.data[0];
    if (!cat) return null;
    const articles = await strapiFetch<Article[]>(
      `/articles?${DRAFT}&populate=*&filters[category][slug][$eq]=${encodeURIComponent(slug)}&sort=createdAt:desc`,
    );
    return { ...cat, articles: articles.data };
  },

  getAbout: () => strapiFetch<About>(`/about?populate=*`).then(r => r.data),
};

export function mediaUrl(img?: StrapiImage, size: "thumbnail" | "small" | "medium" | "large" = "medium") {
  if (!img) return "";
  return img.formats?.[size]?.url ?? img.url;
}
