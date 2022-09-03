import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';

import { AnyComponent } from '../../types/Types';
import DynamicHeightContext from '../context/DynamicHeightContext';
import ArrayReducerType from '../store/ArrayReducerType';
import ItemReducerType from '../store/ItemReducerType';
import { getEnv, getResourcePath } from '../utility';
import ErrorBoundary from './ErrorBoundary';

/** {@link PageTitleFixer} Props. */
interface IPageWrapperProps {
  /** Page title. */
  title?:   string;
  id?:      string;
  state?:   ItemReducerType<unknown> | ArrayReducerType<unknown>;
  /** Page component to render. */
  children: AnyComponent;
}

/**
 * Strips slashes etc. of the path.
 *
 * Example:
 * location.pathname = /browse/
 * toCleanLocationPath = browse
 *
 * @param path - location.pathname
 *
 * @return Nice path without gibberish.
 */
function toCleanLocationPath(path: string): string {
  const pathNoHost      = path.startsWith(getEnv('PUBLIC_URL') ?? '') ? path.substring((getEnv('PUBLIC_URL') ?? '').length) : path;
  const startsWithSlash = pathNoHost.startsWith('/');
  const endsWithSlash   = pathNoHost.endsWith('/');
  const pathNoSlashes   = pathNoHost.substring(startsWithSlash ? 1 : 0, endsWithSlash ? pathNoHost.length - 1 : undefined);

  return pathNoSlashes;
}

/**
 * HOC to properly set the browser title to assure accessibilty.
 */
 const PageWrapper: React.FC<IPageWrapperProps> = ({ title, id, state, children }: IPageWrapperProps) => {
  const nav = useNavigate();
  const location = useLocation();
  const error = state?.meta.error;

  const dynamicHeightContext = useContext(DynamicHeightContext);

  useEffect(() => {
    // ARIA: Titles should contain the application name and page title.
    document.title = (`${title != null && title.length > 0 ? `${title} | ` : ''}OwnRecipes`);
  }, [title]);

  useEffect(() => {
    if (error && id == null) {
      nav(getResourcePath('/NotFound'));
    }
  }, [id, error]);

  return (
    <Container className={toCleanLocationPath(location.pathname)} style={{ marginTop: `${dynamicHeightContext.toolbarHeight}px` }}>
      <ErrorBoundary verbose printStack>
        {children}
      </ErrorBoundary>
    </Container>
  );
};

export default PageWrapper;
