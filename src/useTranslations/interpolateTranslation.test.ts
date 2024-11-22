import { describe, expect, test } from 'vitest';

import { interpolateTranslation } from './interpolateTranslation';

describe('interpolateTranslation', () => {
  test('should replace the params in the translation', () => {
    expect(interpolateTranslation('Hello {name}', { name: 'World' })).toBe(
      'Hello World',
    );
    expect(
      interpolateTranslation('Hello {name}, I am {age} years old', {
        name: 'World',
        age: '100',
      }),
    ).toBe('Hello World, I am 100 years old');
  });

  test('should return the translation if no param is given', () => {
    expect(interpolateTranslation('Hello World')).toBe('Hello World');
  });

  test('should return the translation if the param is not found', () => {
    expect(interpolateTranslation('Hello {name}', { age: 'World' })).toBe(
      'Hello {name}',
    );
  });
});
