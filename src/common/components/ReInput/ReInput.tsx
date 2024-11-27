/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useMemo } from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';

import { composeValidators, formatValidation, numberValidator, requiredValidator, ValueValidatorFunction } from '../../store/Validation';
import Input, { IAnyInputProps } from '../Input/Input';

export type IReInputProps = {
  format?: (value: any, name: string) => string;
  parse?:  (value: any, name: string) => any;
} & IAnyInputProps;

const ReInput = forwardRef<Input, IReInputProps>(({
    name, type, required, format, parse,
    onChange, onFocus, onBlur, ...rest }: IReInputProps, ref) => {
  const intl = useIntl();

  const validators = useMemo(() => {
    const vals: Array<ValueValidatorFunction> = [];

    if (required) {
      vals.push(requiredValidator);
    }
    if (type === 'number') {
      vals.push(numberValidator);
    }

    return composeValidators(...vals);
  }, [required, type]);

  return (
    <Field name={name} validate={validators} validateFields={[]} format={format} parse={parse}>
      {fprops => (
        <Input
            {...rest}
            type     = {type}
            required = {required}

            name     = {fprops.input.name}
            value    = {fprops.input.value}
            errors   = {formatValidation(intl, fprops.meta.error || (!fprops.meta.dirtySinceLastSubmit ? fprops.meta.submitError : undefined))}
            meta     = {fprops.meta}
            onChange = {(namee: string, value: string | number) => { fprops.input.onChange(value); onChange?.(namee, value); }}
            onFocus  = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onFocus(event); onFocus?.(event); }}
            onBlur   = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onBlur(event);  onBlur?.(event); }}
            ref = {ref} />
      )}
    </Field>
  );
});

export default ReInput;
