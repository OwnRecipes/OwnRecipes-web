/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useCallback } from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';

import { formatValidation, requiredValidator } from '../../store/Validation';
import { ISelectProps, Select, SelectBase } from '../Input/Select';

export interface IReSelectProps extends ISelectProps {
  format?: (value: any, name: string) => string;
  parse?:  (value: any, name: string) => any;

  parser?: (newValue: any | null) => any | undefined;
  formatter?: (newValue: Array<any> | any) => any;
  isMulti?: boolean;
}

const ReSelect = forwardRef<SelectBase, IReSelectProps>(({
    name, required, format, parse,
    formatter, parser, isMulti,
    onChange, onFocus, onBlur, ...rest }: IReSelectProps, ref) => {
  const intl = useIntl();

  const formatValue = useCallback((value: Array<any> | any | undefined) => {
    if (value == null) {
      return isMulti ? [] : undefined;
    } else {
      return formatter ? formatter(value) : value;
    }
  }, [formatter, isMulti]);

  return (
    <Field name={name} validate={required ? requiredValidator : undefined} validateFields={[]} format={format} parse={parse}>
      {fprops => (
        <Select
            {...rest}
            required = {required}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            isMulti  = {isMulti}

            name     = {fprops.input.name}
            value    = {formatValue(fprops.input.value)}
            errors   = {formatValidation(intl, fprops.meta.error || (!fprops.meta.dirtySinceLastSubmit ? fprops.meta.submitError : undefined))}
            meta     = {fprops.meta}
            onChange = {(namee: string, value: string | undefined) => { fprops.input.onChange(parser ? parser(value) : value); onChange?.(namee, parser ? parser(value) : value); }}
            onFocus  = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onFocus(event); onFocus?.(event); }}
            onBlur   = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onBlur(event);  onBlur?.(event); }}
            ref = {ref} />
      )}
    </Field>
  );
});

export default ReSelect;
