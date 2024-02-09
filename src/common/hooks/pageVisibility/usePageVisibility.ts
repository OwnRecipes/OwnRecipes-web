// Coded by Gilad Peleg (https://github.com/pgilad/react-page-visibility)

import { useEffect, useState } from 'react';

import { getPageVisibleHandlerArgs, isSupported, visibility } from './utils';

const isSupportedLocal = isSupported && visibility;

const usePageVisibility = (): boolean => {
  const [initiallyVisible] = getPageVisibleHandlerArgs();

  const [isVisible, setIsVisible] = useState<boolean>(initiallyVisible as boolean);

  useEffect(() => {
    if (isSupportedLocal && visibility) {
      const handler = () => {
        const [currentlyVisible] = getPageVisibleHandlerArgs();

        setIsVisible(currentlyVisible as boolean);
      };

      document.addEventListener(visibility.event, handler);
    }

    return () => {
      if (isSupportedLocal && visibility) {
        const handler = () => {
          const [currentlyVisible] = getPageVisibleHandlerArgs();

          setIsVisible(currentlyVisible as boolean);
        };

        document.removeEventListener(visibility.event, handler);
      }
    };
  }, []);

  return isVisible;
};

export default usePageVisibility;
