/* eslint-disable @typescript-eslint/no-explicit-any */
import moment, { Moment } from 'moment';
import { forwardRef } from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';

import { formatValidation, requiredValidator } from '../../store/Validation';
import DateTime, { IDateTimeProps } from '../Input/DateTime';

export interface IReDateTimeProps extends Omit<IDateTimeProps, 'value'> {
  format?: (value: any, name: string) => string | Date | Moment | null | undefined;
  parse?:  (value: any, name: string) => any;
}

function parsee(value: moment.MomentInput): number | null | undefined {
  if (value == null) {
    return value;
  } else {
    return moment(value).unix();
  }
}
function formattee(value: number | null | undefined): Moment | null | undefined {
  return value != null ? moment.unix(value) : value;
}

const ReDateTime = forwardRef<DateTime, IReDateTimeProps>(({
    name, required, format = formattee, parse = parsee,
    onChange, onFocus, onBlur, ...rest }: IReDateTimeProps, ref) => {
  const intl = useIntl();

  return (
    <Field name={name} validate={required ? requiredValidator : undefined} validateFields={[]} format={format} parse={parse}>
      {fprops => (
        <DateTime
            {...rest}
            required = {required}

            name     = {fprops.input.name}
            value    = {fprops.input.value}
            errors   = {formatValidation(intl, fprops.meta.error || (!fprops.meta.dirtySinceLastSubmit ? fprops.meta.submitError : undefined))}
            meta     = {fprops.meta}
            onChange = {(namee: string, value: moment.MomentInput) => { fprops.input.onChange(value); onChange?.(namee, value); }}
            onFocus  = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onFocus(event); onFocus?.(event); }}
            onBlur   = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onBlur(event);  onBlur?.(event); }}
            ref = {ref} />
      )}
    </Field>
  );
});

export default ReDateTime;
