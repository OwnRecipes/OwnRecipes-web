import { createContext } from 'react';

export interface IAuthContext {
  isForceLogout: boolean;
  forceLogout: () => void;

  isLoggingOut: boolean;
  setLoggingOut: () => void;

  setLoggedOut: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default AuthContext;
