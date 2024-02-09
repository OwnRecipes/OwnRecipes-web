import { useMemo, useState } from 'react';

import DynamicHeightContext from './DynamicHeightContext';

/** {@link DynamicHeightContextProvider} Props. */
interface IDynamicHeightContextProviderProps {
  /** App container that should have access to the providers. */
  children?: React.ReactNode | React.ReactElement;
}

/**
 * {@link DynamicHeightContext} Provider.
 *
 * @param props - {@link IDynamicHeightContextProviderProps}.
 */
const DynamicHeightContextProvider: React.FC<IDynamicHeightContextProviderProps> = ({ children }: IDynamicHeightContextProviderProps) => {
  const [toolbarHeight, setToolbarHeight] = useState<number>(0);

  const updateToolbarHeight = (height: number) => setToolbarHeight(height);

  const value = useMemo(() => ({
    toolbarHeight:    toolbarHeight,
    setToolbarHeight: updateToolbarHeight,
  }), [toolbarHeight]);

  return (
    <DynamicHeightContext.Provider value={value}>
      {children}
    </DynamicHeightContext.Provider>
   );
};

export default DynamicHeightContextProvider;
