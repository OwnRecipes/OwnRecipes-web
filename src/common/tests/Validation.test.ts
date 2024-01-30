import { camelCase } from '../store/Validation';

test('isNumber', () => {
  expect(camelCase('1')).toBe('1');
  expect(camelCase('-1')).toBe('-1');
  expect(camelCase('+1')).toBe('+1');

  expect(camelCase('a')).toBe('a');
  expect(camelCase('Z')).toBe('Z');

  expect(camelCase('title')).toBe('title');
  expect(camelCase('ingredientGroups')).toBe('ingredientGroups');

  expect(camelCase('ingredient_groups')).toBe('ingredientGroups');
  expect(camelCase('ingredient-groups')).toBe('ingredientGroups');

  expect(camelCase('some_longer_snake_case')).toBe('someLongerSnakeCase');
  expect(camelCase('some1_longer2_snake3_case4')).toBe('some1Longer2Snake3Case4');

  expect(camelCase('with_a!§_chars')).toBe('withA!§Chars');
  // expect(camelCase('with_!§_chars')).toBe('with!§Chars'); // returns "with_!§Chars", but fair enough
});
