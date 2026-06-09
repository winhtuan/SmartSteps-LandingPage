import { useEffect } from "react";
import { seoTranslations } from "../data/translations";

const SEO_META_SELECTORS = [
  'meta[name="description"]',
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[property="og:locale"]',
  'meta[name="twitter:title"]',
  'meta[name="twitter:description"]',
];

export function useLandingSeo(language) {
  useEffect(() => {
    const seo = seoTranslations[language] || seoTranslations.vi;

    document.documentElement.lang = language;
    document.title = seo.title;

    [
      seo.description,
      seo.title,
      seo.description,
      seo.locale,
      seo.title,
      seo.description,
    ].forEach((content, index) => {
      document.querySelector(SEO_META_SELECTORS[index])?.setAttribute("content", content);
    });
  }, [language]);
}
