import { IntlShape } from 'react-intl';
import * as _ from 'lodash-es';

import { ResponseError } from '../CustomSuperagent';
import { optionallyFormatMessage } from '../utility';

export type ValidationErrorType = {
  code:         string;
  message:      string;
  sourceError?: Error;
}

export type ValidationError = ValidationErrorType | Array<ValidationErrorType>;

export const INTERNAL_ERROR_KEY = '$$-internal-error-$$';

export function toValidationErrors(error: ResponseError): ValidationResult | undefined {
  const toCode = (msg: string): string => {
    if (msg === 'This item is required.') {
      return 'required';
    }

    return msg;
  };

  const result = createValidationResult();

  const body =  error.response?.body;
  if (body == null) return undefined;

  if (typeof body !== 'object') {
    result[INTERNAL_ERROR_KEY] = { code: '500', message: body };
    return result;
  }

  const keys = Object.keys(body);
  if (keys.length === 0) {
    result[INTERNAL_ERROR_KEY] = { code: '500', message: body };
    return result;
  }

  keys.forEach(nextKey => {
    const attr    = ((/[_-]/).test(nextKey)) ? _.camelCase(nextKey) : nextKey;
    const nextVal = body[nextKey];

    if (Array.isArray(nextVal)) {
      result[attr] = nextVal.map(v => ({
        code:      toCode(v),
        message:   v,
        attribute: attr,
      }));
    } else {
      result[attr] = {
        code:      toCode(nextVal),
        message:   nextVal,
      };
    }
  });

  return result;
}

export type ValidationResult = Record<string, ValidationError>;
export function createValidationResult(): ValidationResult {
  // HACK: ValidationResult has property __isValidationResult
  return {
    __isValidationResult: true as unknown as ValidationErrorType,
  };
}
export const isValidationResult = (obj: unknown): obj is ValidationResult => (obj != null && typeof obj === 'object' && (obj as any).__isValidationResult === true); // eslint-disable-line no-underscore-dangle, @typescript-eslint/no-explicit-any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueValidatorFunction = (value: any, data?: any) => ValidationErrorType | undefined;

export type FieldValidatorType = {
  name: string;
  validators: Array<ValueValidatorFunction>;
}

export type ValidatorsType = Array<FieldValidatorType>;

export function formatValidation(intl: IntlShape, validation: ValidationError | undefined, baseMessageId = 'validation.error.'): string | undefined {
  if (validation == null) return undefined;

  let errors = '';
  if (Array.isArray(validation)) {
    validation.forEach(v => {
      errors += optionallyFormatMessage(intl, baseMessageId, v.code);
    });
  } else {
    errors += optionallyFormatMessage(intl, baseMessageId, validation.code);
  }

  return errors.length ? errors : undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function runFieldValidator(result: ValidationResult, valueValidations: ValueValidatorFunction[], name: string, value: any, data?: any) {
  let hasError = false;

  valueValidations.forEach(f => {
    const valResult: ValidationErrorType | undefined = f(value, data);
    if (valResult) {
      hasError = true;
      _.set(result, name, valResult);
    }
  });

  if (!hasError) {
    // reset previous errors
    _.set(result, name, undefined);
  }
}

export function runValidators(validations: ValidatorsType, data: unknown): ValidationResult {
  const result: ValidationResult = createValidationResult();
  validations.forEach(validator => {
    const name  = validator.name;
    const value = _.get(data, name);
    runFieldValidator(result, validator.validators, name, value, data);
  });

  return result;
}

export function hasValidationError(result: ValidationResult): boolean {
  const keys = Object.keys(result).filter(key => key !== '__isValidationResult');

  return keys.find(key => result[key] !== undefined) != null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlValidator: ValueValidatorFunction = (val: string | undefined): ValidationErrorType | undefined => {
  if (val == null || val.length === 0) return undefined;
  const isUrl = val.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
  return !isUrl ? {
    code:      'url',
    message:   'Please enter a valid URL.',
  } : undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, arrow-body-style
export const requiredValidator: ValueValidatorFunction = (val: string | undefined): ValidationErrorType | undefined => {
  return (val == null || val.length === 0 || (val.trim && val.trim().length === 0)) ? {
    code:      'required',
    message:   'Please enter a value.',
  } : undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const numberValidator: ValueValidatorFunction = (val: string): ValidationErrorType | undefined => {
  const isNumber = val != null && val.length > 0 ? /^-?\d*\.?\d+$/.test(val) : true;
  return (
    !isNumber ? {
      code:      'number',
      message:   'Please enter a number',
    } : undefined
  );
};

export const composeValidators = (...validators: Array<ValueValidatorFunction>) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (value: any, data: any | undefined) => validators.reduce((error: ValidationErrorType | undefined, validator: ValueValidatorFunction) => error || validator(value, data), undefined)
);
