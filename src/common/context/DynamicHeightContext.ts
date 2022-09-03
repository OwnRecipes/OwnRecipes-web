import { createContext } from 'react';

export interface IDynamicHeightContext {
  toolbarHeight: number;
  setToolbarHeight: (height: number) => void;
}

const DynamicHeightContext = createContext<IDynamicHeightContext>({} as IDynamicHeightContext);

export default DynamicHeightContext;
