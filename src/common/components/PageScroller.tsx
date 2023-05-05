import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scrollToElement } from '../utility';

export interface IPageScrollerProps {
  uriFragmentId?: string;
}

const PageScroller: React.FC<IPageScrollerProps> = ({ uriFragmentId }: IPageScrollerProps) => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash === '') {
      if (!uriFragmentId) {
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
  }, [pathname, hash, key]);

  return null;
};

export default PageScroller;
