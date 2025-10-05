import { ui, defaultLang, showDefaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string, l: string = lang) {
        return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
    }
}

export function getCurrentPath(url: URL): string | undefined {
  const lang = getLangFromUrl(url);

  let pathname = new URL(url).pathname.replace('/' + lang + '/', '');

  if(pathname.startsWith('/'))
  {
    pathname = pathname.substring(1);
  }

  return pathname;
  /*
  const parts = pathname?.split('/')
  const path = parts.pop() || parts.pop()

  if (path === undefined) {
    return undefined
  }
  return path;
  */
}
