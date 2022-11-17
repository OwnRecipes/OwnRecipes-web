import { Field } from 'react-final-form';

export type IFieldSpyValuesProps = Readonly<{
  fieldNames: Array<string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (values: Record<string, any>) => React.ReactElement;
}>;

const FieldSpyValues: React.FC<IFieldSpyValuesProps> = ({ fieldNames, children }: IFieldSpyValuesProps) => (
  fieldNames.reduce(
    // eslint-disable-next-line react/function-component-definition
    (acc, fieldName) => values => (
      <Field name={fieldName} subscription={{ value: true }}>
        {({ input: { value } }) => acc({ ...values, [fieldName]: value })}
      </Field>
    ),
    children
  )({})
);

export default FieldSpyValues;
