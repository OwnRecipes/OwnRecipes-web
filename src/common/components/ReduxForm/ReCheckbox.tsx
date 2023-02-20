/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';

import { formatValidation, requiredValidator } from '../../store/Validation';
import Checkbox,  { ICheckboxProps } from '../Input/Checkbox';

export interface IReCheckboxProps extends Omit<ICheckboxProps, 'value'> {
  format?: (value: any, name: string) => boolean;
  parse?:  (value: any, name: string) => any;
}

const ReCheckbox = forwardRef<Checkbox, IReCheckboxProps>(({
    name, required, format, parse,
    onChange, onFocus, onBlur, ...rest }: IReCheckboxProps, ref) => {
  const intl = useIntl();

  return (
    <Field name={name} validate={required ? requiredValidator : undefined} validateFields={[]} format={format} parse={parse}>
      {fprops => (
        <Checkbox
            {...rest}
            required = {required}

            name     = {fprops.input.name}
            value    = {fprops.input.value}
            errors   = {formatValidation(intl, fprops.meta.error || (!fprops.meta.dirtySinceLastSubmit ? fprops.meta.submitError : undefined))}
            meta     = {fprops.meta}
            onChange = {(namee: string, value: boolean) => { fprops.input.onChange(value); onChange?.(namee, value); }}
            onFocus  = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onFocus(event); onFocus?.(event); }}
            onBlur   = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onBlur(event);  onBlur?.(event); }}
            ref = {ref} />
      )}
    </Field>
  );
});

export default ReCheckbox;
