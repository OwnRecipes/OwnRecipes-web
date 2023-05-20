import { useCallback, useMemo, useState } from 'react';

import AuthContext from './AuthContext';

/** {@link AuthContextProvider} Props. */
interface IAuthContextProviderProps {
  /** App container that should have access to the providers. */
  children?: React.ReactNode | React.ReactElement;
}

/**
 * {@link AuthContext} Provider.
 *
 * @param props - {@link IAuthContextProviderProps}.
 */
const AuthContextProvider: React.FC<IAuthContextProviderProps> = ({ children }: IAuthContextProviderProps) => {
  const [forceLogout, setIsForceLogout] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const handleForceLogout = useCallback(() => {
    setIsForceLogout(true);
  }, []);

  const handleSetIsLoggingOut = useCallback(() => {
    setIsLoggingOut(true);
  }, []);

  const handleSetLoggedOut = useCallback(() => {
    setIsForceLogout(false);
    setIsLoggingOut(false);
  }, []);

  const value = useMemo(() => ({
    isForceLogout: forceLogout,
    forceLogout:  handleForceLogout,

    isLoggingOut: isLoggingOut,
    setLoggingOut: handleSetIsLoggingOut,

    setLoggedOut: handleSetLoggedOut,
  }), [forceLogout, handleForceLogout, isLoggingOut, handleForceLogout, handleSetLoggedOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
   );
};

export default AuthContextProvider;
