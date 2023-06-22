import { useEffect, useState } from 'react';
import { useSelector } from '../store/redux';
import { RootState } from '../../app/Store';

const useHasInternetConnection = (): boolean => {
  const [hasInternetConnection, setHasInternetConnection] = useState<boolean>(window.navigator.onLine);
  const hasConnection = useSelector((state: RootState) => state.connection.hasConnection);

  useEffect(() => {
    function setOnline() {
      setHasInternetConnection(true);
    }
    function setOffline() {
      setHasInternetConnection(false);
    }
    window.addEventListener('online'  , setOnline);
    window.addEventListener('offline' , setOffline);
    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return hasInternetConnection && hasConnection;
};

export default useHasInternetConnection;
