import { useQuery } from "@tanstack/react-query";
import { strapi } from "@/services/strapi";

export const useArticles = () =>
  useQuery({ queryKey: ["articles"], queryFn: strapi.getArticles });

export const useLatestArticles = (limit = 6) =>
  useQuery({ queryKey: ["articles", "latest", limit], queryFn: () => strapi.getLatestArticles(limit) });

export const useArticle = (slug: string) =>
  useQuery({ queryKey: ["article", slug], queryFn: () => strapi.getArticleBySlug(slug), enabled: !!slug });

export const useCategories = () =>
  useQuery({ queryKey: ["categories"], queryFn: strapi.getCategories });

export const useCategory = (slug: string) =>
  useQuery({ queryKey: ["category", slug], queryFn: () => strapi.getCategoryBySlug(slug), enabled: !!slug });

export const useAbout = () =>
  useQuery({ queryKey: ["about"], queryFn: strapi.getAbout });
