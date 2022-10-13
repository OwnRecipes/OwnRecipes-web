import { createContext } from 'react';

export interface ICookingModeContext {
  cookingMode: boolean;
  setCookingMode: (active: boolean) => void;
}

const CookingModeContext = createContext<ICookingModeContext | null>(null);

export default CookingModeContext;
