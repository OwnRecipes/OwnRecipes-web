import { useEffect } from 'react';
import { FormApi } from 'final-form';

interface IInitialValuesResetterProps<T> {
  form: FormApi<T, Partial<T>>;
  initialValues: Partial<T> | undefined;
}
const InitialValuesResetter = <T = {}>({ form, initialValues }: IInitialValuesResetterProps<T>) => {
  useEffect(() => {
    if (form && form.restart != null) {
      // console.log('Reset form');
      form.restart(initialValues);
    }
  }, [initialValues]);

  return null;
};

export default InitialValuesResetter;
