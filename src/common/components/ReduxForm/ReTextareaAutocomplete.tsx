/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useMemo } from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';

import { composeValidators, formatValidation, requiredValidator, ValueValidatorFunction } from '../../store/Validation';
import TextareaAutocomplete, { AutocompleteListItem, ITextareaAutocompleteProps } from '../Input/TextareaAutocomplete';

export type IReTextareaAutocompleteProps<TListItem extends string | object = AutocompleteListItem> = {
  format?: (value: any, name: string) => string;
  parse?:  (value: any, name: string) => any;
} & ITextareaAutocompleteProps<TListItem>;

const ReTextareaAutocomplete = forwardRef<any, IReTextareaAutocompleteProps>(({
    name, required, format, parse,
    onChange, onFocus, onBlur, ...rest }: IReTextareaAutocompleteProps, ref) => {
  const intl = useIntl();

  const validators = useMemo(() => {
    const vals: Array<ValueValidatorFunction> = [];

    if (required) {
      vals.push(requiredValidator);
    }

    return composeValidators(...vals);
  }, [required]);

  return (
    <Field name={name} validate={validators} validateFields={[]} format={format} parse={parse}>
      {fprops => (
        <TextareaAutocomplete
            {...rest}
            required = {required}

            name     = {fprops.input.name}
            value    = {fprops.input.value}
            errors   = {formatValidation(intl, fprops.meta.error || (!fprops.meta.dirtySinceLastSubmit ? fprops.meta.submitError : undefined))}
            meta     = {fprops.meta}
            onChange = {(namee: string, value: string) => { fprops.input.onChange(value); onChange?.(namee, value); }}
            onFocus  = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onFocus(event); onFocus?.(event); }}
            onBlur   = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onBlur(event);  onBlur?.(event); }}
            ref = {ref as any} />
      )}
    </Field>
  );
});

export default ReTextareaAutocomplete;
