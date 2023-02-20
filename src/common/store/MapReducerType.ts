import GenericReducerType from './GenericReducerType';

interface MapReducerType<T> extends GenericReducerType {
  items: Record<string, T> | undefined;
}

export default MapReducerType;
