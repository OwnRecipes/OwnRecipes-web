/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';

import { formatValidation, requiredValidator } from '../../store/Validation';
import FileSelect, { IFileSelectProps } from '../Input/FileSelect';

export type IReFileSelectProps = Omit<IFileSelectProps, 'value'>;

const identity = (value: any) => (value);

const ReFileSelect = forwardRef<FileSelect, IReFileSelectProps>(({
    name, required,
    onChange, onFocus, onBlur,
    ...rest }: IReFileSelectProps, ref) => {
  const intl = useIntl();

  return (
    <Field name={name} validate={required ? requiredValidator : undefined} validateFields={[]} parse={identity}>
      {fprops => (
        <FileSelect
            {...rest}
            required = {required}

            name     = {fprops.input.name}
            value    = {fprops.input.value ?? false}
            errors   = {formatValidation(intl, fprops.meta.error || (!fprops.meta.dirtySinceLastSubmit ? fprops.meta.submitError : undefined))}
            meta     = {fprops.meta}
            onChange = {(namee: string, value: File | undefined) => { fprops.input.onChange(value); onChange?.(namee, value); }}
            onFocus  = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onFocus(event); onFocus?.(event); }}
            onBlur   = {(event: React.FocusEvent<HTMLElement, Element>) => { fprops.input.onBlur(event);  onBlur?.(event); }}
            ref = {ref} />
      )}
    </Field>
  );
});

export default ReFileSelect;
