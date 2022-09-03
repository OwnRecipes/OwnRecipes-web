import { useEffect } from 'react';
import { FormApi } from 'final-form';

interface IInitialValuesResetterProps<T> {
  form: FormApi<T, Partial<T>>;
  initialValues: Partial<T>;
}
const InitialValuesResetter = <T = {}>({ form, initialValues }: IInitialValuesResetterProps<T>) => {
  useEffect(() => {
    if (form && form.restart) {
      // console.log('Reset form');
      form.restart(initialValues);
    }
  }, [initialValues]);

  return null;
};

export default InitialValuesResetter;
