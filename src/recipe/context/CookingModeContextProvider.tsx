import { useMemo, useState } from 'react';

import CookingModeContext, { ICookingModeContext } from './CookingModeContext';

/** {@link CookingModeContextProvider} Props. */
interface ICookingModeContextProviderProps {
  /** App container that should have access to the providers. */
  children?: React.ReactNode | React.ReactElement;
}

/**
 * {@link CookingModeContext} Provider.
 *
 * @param props - {@link ICookingModeContextProviderProps}.
 */
const CookingModeContextProvider: React.FC<ICookingModeContextProviderProps> = ({
    children }: ICookingModeContextProviderProps) => {
  const [isCookingMode, setIsCookingMode] = useState<boolean>(false);

  const updateCookingMode = (active: boolean) => setIsCookingMode(active);

  const value: ICookingModeContext = useMemo(() => ({
    cookingMode:    isCookingMode,
    setCookingMode: updateCookingMode,
  }), [isCookingMode]);

  return (
    <CookingModeContext.Provider value={value}>
      {children}
    </CookingModeContext.Provider>
   );
};

export default CookingModeContextProvider;
