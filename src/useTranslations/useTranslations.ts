import { interpolateTranslation } from './interpolateTranslation';

type TranslationConfig = {
  [Lang: string]: string;
};

type Translations = {
  [K: string]: TranslationConfig;
};

type Langs<T> = T[keyof T] extends infer U
  ? U extends TranslationConfig
    ? keyof U
    : never
  : never;

type ParamsFromString<S extends string> =
  S extends `${string}{${infer Param}}${infer After}`
    ? [Param, ...ParamsFromString<After>]
    : [];

type Params<
  Lang extends string,
  T extends Translations,
  K extends keyof T,
  P extends string[] = ParamsFromString<T[K][Lang]>,
> = P['length'] extends 0
  ? Record<string, never>
  : {
      [Key in P[number]]: string;
    };

export const useTranslations = <T extends Translations, Lang extends Langs<T>>(
  lang: Lang,
  translations: T,
) => {
  const translate = <K extends keyof T, P extends Params<Lang, T, K>>(
    ...args: P extends Record<string, never> ? [key: K] : [key: K, params: P]
  ): string => {
    const [key, params] = args;
    const translation = translations[key]?.[lang];

    if (!translation) {
      throw new Error(
        `Translation "${String(key)}" for lang "${lang}" not found`,
      );
    }

    return interpolateTranslation(translation, params);
  };

  return { translate };
};
