/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';

import { formatValidation, requiredValidator } from '../../store/Validation';
import { ISelectProps, Select, SelectBase } from '../Input/Select';

export interface IReSelectProps extends ISelectProps {
  format?: (value: any, name: string) => string;
  parse?:  (value: any, name: string) => any;
}

const ReSelect = forwardRef<SelectBase, IReSelectProps>(({
    name, required, data, format, parse,
    onChange, onFocus, onBlur, ...rest }: IReSelectProps, ref) => {
  const intl = useIntl();

  return (
    <Field name={name} validate={required ? requiredValidator : undefined} validateFields={[]} format={format} parse={parse}>
      {fprops => (
        <Select
            {...rest}
            required = {required}

            name     = {fprops.input.name}
            value    = {fprops.input.value}
            data     = {data}
            errors   = {formatValidation(intl, fprops.meta.error || (!fprops.meta.dirtySinceLastSubmit ? fprops.meta.submitError : undefined))}
            meta     = {fprops.meta}
            onChange = {(namee: string, value: string | undefined) => { fprops.input.onChange(value); onChange?.(namee, value); }}
            onFocus  = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onFocus(event); onFocus?.(event); }}
            onBlur   = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onBlur(event);  onBlur?.(event); }}
            ref = {ref} />
      )}
    </Field>
  );
});

export default ReSelect;
