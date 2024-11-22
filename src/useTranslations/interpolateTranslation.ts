export const interpolateTranslation = (
  translation: string,
  values: Record<string, string> = {},
): string =>
  translation.replace(/{([^}]+)}/g, (match, key) => values[key] || match);
