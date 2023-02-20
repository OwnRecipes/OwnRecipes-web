import GenericReducerType from './GenericReducerType';

interface ItemReducerType<T> extends GenericReducerType {
  item: T | undefined;
}

export default ItemReducerType;
