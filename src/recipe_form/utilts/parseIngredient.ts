import { IngredientInput } from '../../recipe/store/RecipeTypes';
import { GCD } from '../../recipe/utilts/gcd';

/**
 * Parses a string-number to a float,
 * normalizing the thousands and decimal-separators.
 *
 * @param str - "1.500,50"
 *
 * @returns 1500.50
 */
function parseFloatIgnoreLocale(str: string): number {
  let normalized;
  const ixDot = str.indexOf('.');
  const ixComma = str.indexOf(',');

  if (ixDot === -1 && ixComma === -1) {
    normalized = str;
  } else if (ixDot === -1) {
    normalized = str.replace(',', '.');
  } else if (ixComma === -1) {
    normalized = str;
  } else {
    // eslint-disable-next-line no-lonely-if
    if (ixDot < ixComma) {
      normalized = str.replace('.', '');
      normalized = normalized.replace(',', '.');
    } else {
      normalized = str.replace(',', '');
    }
  }

  return parseFloat(normalized);
}

/**
 * Given an array of text values,
 * Convert them into a single Fraction
 *
 * Examples:
 *   * 1 1/2 sugar -> 3/2
 *   * 2 3 inch pieces ginger -> 6/1
 *   * 1/2 3 inch pieces ginger -> 3/2
 *   * 3 1/2 inch pieces ginger -> 7/2
 *   * 1/2 1/2 inch pieces ginger -> 1/4
 *
 * @param textArray - Quantities-Array.
 *
 * @returns - Merged quantities to a single fraction.
 */
const buildFraction = (textArray: Array<string>) => {
  const { numerator, denominator } = textArray.reduce((fraction, text) => {
    const split = text.split('/');
    let n = parseFloatIgnoreLocale(split[0]);
    let d = split.length > 1 ? parseFloatIgnoreLocale(split[1]) : 1;

    // If this is the first run of the func
    // return the n/d,
    if (fraction.denominator === 0) { return { numerator: n, denominator: d }; }

    // Multiple if the next number is an int
    if (split.length === 1) {
      n *= fraction.numerator;
      d *= fraction.denominator;
      const gcd = GCD(n, d);
      return { numerator: n / gcd, denominator: d / gcd };
    }

    // If given a fraction, add them.
    n = fraction.numerator * d + fraction.denominator * n;
    d *= fraction.denominator;
    const gcd = GCD(n, d);
    return { numerator: n / gcd, denominator: d / gcd };
  }, { numerator: 0, denominator: 0 });

  return {
    numerator,
    denominator,
  };
};

const numberSplit = (number: string): { amount: string, rest: string } => {
  let last = -1;
  const length = number.length;
  const numbers = ['1','2','3','4','5','6','7','8','9','0'];

  numbers.forEach(n => {
    if (number.lastIndexOf(n) > last) {
      last = number.lastIndexOf(n);
    }
  });
  if (length === (last + 1)) {
    return { amount: number, rest: '' };
  }
  return { amount: number.substring(0, last + 1), rest: number.substring(last + 1, length) };
};

const parseFraction = (fraction: string): Array<string> => {
  const normalized = fraction.normalize('NFKD');
  return normalized.split('\u2044'); // '⁄'
};

/**
 * Given an Ingredient as text, parse it into an Ingredient object.
 *
 * @param parser - Mapping localized measurement -> normalized measurement.
 * @param line - The actual line of text to parse.
 */
export default (parser: Record<string, string>, line: string): IngredientInput => {
  // Just some examples...
  // 1g salt -> 1 | gram | salt
  // 1 cup orange juice -> 1 | cup | orange juice
  // 1 1/2cup wheat flour -> 1 1/2 | cup | wheat flour
  // 2 chicken wings -> 2 | | chicken wings

  // Basically, iterate the line.
  // Accept up to 2 numbers for quantities.
  // The first non number may be the measurement.
  // Anything else is the title. Stop parsing.

  // Split the line by the space char
  const tags = line.split(' ');

  const quantities: Array<string> = [];
  let measurement: string | undefined;

  let noMoreQuantities = false;
  let ix;
  for (ix = 0; ix < tags.length - 1; ++ix) {
    const nextTag = tags[ix];
    if (nextTag.length === 0) continue;

    const vulgarFraction = !noMoreQuantities ? parseFraction(nextTag[0]) : [];

    if (!noMoreQuantities && !Number.isNaN(parseInt(nextTag[0]))) {
      // The next element starts with a number.
      // Parse the number.
      // The element may be followed by text, e. g. 1kg. Parse this as measurement, if it is some.
      let { amount, rest } = numberSplit(nextTag); // eslint-disable-line prefer-const
      quantities.push(amount);
      if (rest) {
        // OPT The fraction handling is hard to read.
        // The first char of the rest could be a fraction, e. g. 1¾cup flour.
        const restFrac = parseFraction(rest[0]);
        if (restFrac[1]) {
          noMoreQuantities = true;
          quantities.push(`${restFrac[0]}/${restFrac[1]}`);
          if (rest.length > 1) {
            rest = rest.substring(1);
          } else {
            continue;
          }
        }
        measurement = parser[rest.toLocaleLowerCase()];
        if (measurement) {
          ++ix;
          break;
        }
      }
      if (quantities.length >= 2) {
        noMoreQuantities = true;
      }
    } else if (!noMoreQuantities && vulgarFraction[1]) {
      // Parse the fraction.
      // After the fraction, no more quantities may follow up, but the measurement.
      // E. g. ¾cup flour.
      noMoreQuantities = true;
      quantities.push(`${vulgarFraction[0]}/${vulgarFraction[1]}`);
      if (nextTag.length > 1) {
        measurement = parser[nextTag.substring(1).toLocaleLowerCase()];
        if (measurement) {
          ++ix;
        }
        break;
      }
    } else {
      // No number and no fraction, that is plain old text, maybe a measurement.
      noMoreQuantities = true;
      measurement = parser[nextTag.toLocaleLowerCase()];
      if (measurement) {
        ++ix;
      }
      break;
    }
  }

  const { numerator, denominator } = buildFraction(quantities);
  const title = tags.slice(ix).join(' ');
  return { numerator: numerator === 0 ? undefined : numerator, denominator: denominator, measurement: measurement, title: title };
};
