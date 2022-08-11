import { lazy, Suspense } from 'react';
import { Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AnyComponent } from '../types/Types';
import { getEnvAsBoolean, getResourcePath, isDemoMode } from '../common/utility';
import { CombinedStore } from './Store';
import UserRole from '../common/types/UserRole';
import Spinner from './components/PageSpinner';

const NewsPage = lazy(() => import('../news/container/NewsPage'));
const LoginPage = lazy(() => import('../account/containers/LoginPage'));
const BrowsePage = lazy(() => import('../browse/containers/BrowsePage'));
const RecipeFormPage = lazy(() => import('../recipe_form/containers/RecipeFormPage'));
const RecipePage = lazy(() => import('../recipe/containers/RecipePage'));
// const ListPage = lazy(() => import('../../list/containers/ListPage'));
// const MenuPage = lazy(() => import('../../menu/containers/MenuPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));
const RandomPage = lazy(() => import('../random/containers/RandomPage'));

export type IRouteType = {
  /** URL path. Should start with a slash. */
  path:      string;
  /** Container for this route. */
  component: AnyComponent;
  restriction?: Array<UserRole>;
}

const PrivateRoutes: Array<IRouteType> = [
  {
    path:      '/home',
    component: NewsPage,
  },
  {
    path:      '/browser',
    component: BrowsePage,
  },
  {
    path:      '/random',
    component: RandomPage,
  },
  {
    path:      '/recipe/edit/:recipe',
    component: RecipeFormPage,
    restriction: [UserRole.USER, UserRole.STAFF, UserRole.ADMIN],
  },
  {
    path:      '/recipe/:recipe',
    component: RecipePage,
  },
  /*
  {
    path:      '/list/:list',
    component: List,
  },
  {
    path:      '/list',
    component: List,
  },
  {
    path:      '/Menu',
    component: Menu,
  }, */
  {
    path:      '/login',
    component: LoginPage,
  },
  {
    path:      '/NotFound',
    component: NotFoundPage,
  },
];

const PublicRoutes: Array<IRouteType> = [
  {
    path:      '/home',
    component: NewsPage,
  },
  {
    path:      '/browser',
    component: BrowsePage,
  },
  {
    path:      '/random',
    component: RandomPage,
  },
  {
    path:      '/recipe/:recipe',
    component: RecipePage,
  },
  {
    path:      '/login',
    component: LoginPage,
  },
  {
    path:      '/NotFound',
    component: NotFoundPage,
  },
];

const PublicRoutesIfRequireLogin: Array<IRouteType> = [
  {
    path:      '/login',
    component: LoginPage,
  },
];

function hasRequiredRole(restriction: Array<string> | undefined, userRole: string | undefined): boolean {
  if (restriction == null) return true;
  else if (userRole == null) return false;
  else return restriction.includes(userRole);
}

function toPageComponent(cmp: AnyComponent): React.ReactNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PageComponent = cmp as any;
  return (
    <Suspense fallback={<Spinner />}>
      <PageComponent />
    </Suspense>
  );
}

const Routes: React.FC = () => {
  const account = useSelector((state: CombinedStore) => state.account.item);
  const isAuthenticated = account != null && account.id !== 0;
  const role = account?.role;

  const isLoginRequired = getEnvAsBoolean('REACT_APP_REQUIRE_LOGIN');

  let routesList: Array<React.ReactNode>;
  if (isAuthenticated) {
    routesList = PrivateRoutes.filter(r => hasRequiredRole(r.restriction, role)).map(r => (
      <Route path={getResourcePath(r.path)} key={r.path} element={toPageComponent(r.component)} />
    ));
    routesList.push(
      <Route path={getResourcePath('/')} key='/' element={<Navigate replace to={getResourcePath('/home')} />} />
    );
    routesList.push(
      <Route path='*' key='*' element={<Navigate replace to={getResourcePath(isDemoMode() ? '/home' : '/NotFound')} />} />
    );
  } else if (isLoginRequired) {
    routesList = PublicRoutesIfRequireLogin.map(r => (
      <Route path={getResourcePath(r.path)} key={r.path} element={toPageComponent(r.component)} />
    ));
    routesList.push(
      <Route path='*' key='*' element={<Navigate replace to={getResourcePath('/login')} />} />
    );
  } else {
    routesList = PublicRoutes.map(r => (
      <Route path={getResourcePath(r.path)} key={r.path} element={toPageComponent(r.component)} />
    ));
    const defaultPath = getResourcePath('/home');
    // console.log(`[Routes] registering default path as "${defaultPath}"`);
    routesList.push(
      <Route path={getResourcePath('/')} key='/' element={<Navigate replace to={defaultPath} />} />
    );
    const fallbackPath = getResourcePath('/login');
    // console.log(`[Routes] registering fallback path as "${fallbackPath}"`);
    routesList.push(
      <Route path='*' key='*' element={<Navigate replace to={fallbackPath} />} />
    );
  }

  return (
    <RouterRoutes>
      {routesList}
    </RouterRoutes>
  );
};

export default Routes;
