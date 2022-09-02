/* eslint-disable no-param-reassign */
import { GCD } from './gcd';

export default (servings: number, customServings: number, numerator: number | undefined, denominator: number): string => {
  debugger;
  if (numerator == null) return '';

  // If there isn't a denominator.
  // We can assume the user wants to display
  // the recipe ings as decimals.
  if (denominator <= 1) { return parseFloat((numerator * (customServings / servings)).toFixed(3)).toString(); }

  // Multiply the custom serving.
  if (servings !== customServings) {
    numerator *= customServings;
    denominator *= servings;
  }

  // Get the quotient from the mixed fraction
  // so we are only left with a fraction < 1.
  const quotient = Math.floor(numerator / denominator);

  // The remainder from what is left over.
  // Set it as the new numerator.
  numerator %= denominator;

  // If the numerator zero then return just the quotient.
  if (numerator === 0) { return quotient.toString(); }

  // Get the GCD and reduce the fraction.
  const gcd = GCD(numerator, denominator);
  numerator /= gcd;
  denominator /= gcd;

  // If things get weird, display as a decimal.
  if (denominator > 12) { return parseFloat((quotient + (numerator / denominator)).toFixed(3)).toString(); }

  const quotientString = quotient > 0 ? `${quotient.toString()} ` : '';
  return `${quotientString}${numerator.toString()}/${denominator.toString()}`;
};
