import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { scrollToElement } from '../utility';

export interface IPageScrollerProps {
  uriFragmentId?: string;
  scrollOnKeyChange?: boolean;
}

const PageScroller: React.FC<IPageScrollerProps> = ({ uriFragmentId, scrollOnKeyChange }: IPageScrollerProps) => {
  const { pathname, hash, key } = useLocation();

  const prevPathname = useRef<string>('');

  useEffect(() => {
    // console.log(`[PageScroller] pathname=${pathname}, hash=${hash}, key=${key}`);

    if (hash === '') {
      if (!uriFragmentId) {
        // If same page and no different hash, then do not scroll.
        // This occurs when search params change (e. g. servings on recipe page).
        if (pathname === prevPathname.current && !scrollOnKeyChange) return;

        setTimeout(() => {
          // console.log('[PageScroller] No hash, scroll to top.');
          window.scrollTo(0, 0);
        }, 0);
      }
    } else {
      setTimeout(() => {
        const mainContainerId = 'main-container';
        const mainContainerElem = document.getElementById(mainContainerId);
        const mainContainerOffset = ((mainContainerElem?.getBoundingClientRect?.().top ?? 0) + window.scrollY) ?? 0;

        const id = hash.replace('#', '');
        if (uriFragmentId && id !== uriFragmentId) return;
        const elem = document.getElementById(id);

        if (elem) {
          // console.log(`[PageScroller] Scroll to elem "${id}".`);
          scrollToElement(elem, mainContainerOffset + 50);
        }
      }, 0);
    }

    prevPathname.current = pathname;
  }, [pathname, hash, key]);

  return null;
};

export default PageScroller;
