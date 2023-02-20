import GenericReducerType from './GenericReducerType';

interface ArrayReducerType<T> extends GenericReducerType {
  items: Array<T> | undefined;
}

export default ArrayReducerType;
