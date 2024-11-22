import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useTranslations } from './useTranslations';

describe('useTranslations', () => {
  test('without params', () => {
    const translations = {
      hello: {
        en: 'Hello',
        es: 'Hola',
        fr: 'Bonjour',
      },
    } as const;

    const { result: enResult } = renderHook(() =>
      useTranslations('en', translations),
    );
    expect(enResult.current.translate('hello')).toBe('Hello');

    const { result: esResult } = renderHook(() =>
      useTranslations('es', translations),
    );
    expect(esResult.current.translate('hello')).toBe('Hola');

    const { result: frResult } = renderHook(() =>
      useTranslations('fr', translations),
    );
    expect(frResult.current.translate('hello')).toBe('Bonjour');
  });

  test('with params', () => {
    const translations = {
      hello: {
        en: 'Hello {name}!',
        es: 'Hola {name}!',
        fr: 'Bonjour {name} !',
      },
    } as const;

    const { result: enResult } = renderHook(() =>
      useTranslations('en', translations),
    );
    expect(enResult.current.translate('hello', { name: 'world' })).toBe(
      'Hello world!',
    );

    const { result: esResult } = renderHook(() =>
      useTranslations('es', translations),
    );
    expect(esResult.current.translate('hello', { name: 'mundo' })).toBe(
      'Hola mundo!',
    );

    const { result: frResult } = renderHook(() =>
      useTranslations('fr', translations),
    );
    expect(frResult.current.translate('hello', { name: 'monde' })).toBe(
      'Bonjour monde !',
    );
  });

  test('should throw an error if the translation is not found for some language', () => {
    const translations = {
      hello: {
        en: 'Hello',
      },
      seeYou: {
        fr: 'Aurevoir',
      },
    } as const;

    const { result } = renderHook(() => useTranslations('fr', translations));
    expect(() => result.current.translate('hello')).toThrowError(
      'Translation "hello" for lang "fr" not found',
    );
  });
});
