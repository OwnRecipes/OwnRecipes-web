import GenericReducerType from './GenericReducerType';

type ItemReducerType<T> = {
  item: T | undefined;
} & GenericReducerType;

export default ItemReducerType;
