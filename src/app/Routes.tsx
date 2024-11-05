import { ComponentType, lazy, Suspense } from 'react';
import { Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';

import { RootState } from './Store';
import { useSelector } from '../common/store/redux';
import { AnyComponent } from '../types/Types';
import { getEnvAsBoolean, getRoutePath, isDemoMode } from '../common/utility';
import UserRole from '../common/types/UserRole';
import PageSpinner from './components/PageSpinner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lazyJsx<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): AnyComponent {
  return lazy(factory) as unknown as AnyComponent;
}

const BrowsePage       = lazyJsx(() => import('../browse/containers/BrowsePage'));
const NewsPage         = lazyJsx(() => import('../news/container/NewsPage'));
const LoginPage        = lazyJsx(() => import('../account/containers/LoginPage'));
const GroceryListPage  = lazyJsx(() => import('../groceryList/containers/GroceryListPage'));
const GroceryListsPage = lazyJsx(() => import('../groceryList/containers/GroceryListsPage'));
const MenuPage         = lazyJsx(() => import('../menu_plan/containers/MenuPage'));
const NotFoundPage     = lazyJsx(() => import('./components/NotFoundPage'));
const RandomPage       = lazyJsx(() => import('../random/containers/RandomPage'));
const RecipePage       = lazyJsx(() => import('../recipe/containers/RecipePage'));
const RecipeFormPage   = lazyJsx(() => import('../recipe_form/containers/RecipeFormPage'));

export interface IRouteType {
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
    path:      '/grocery-lists/:list',
    component: GroceryListPage,
  },
  {
    path:      '/grocery-lists',
    component: GroceryListsPage,
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
  {
    path:      '/menu',
    component: MenuPage,
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
    <Suspense fallback={<PageSpinner />}>
      <PageComponent />
    </Suspense>
  );
}

const Routes: React.FC = () => {
  const account = useSelector((state: RootState) => state.account.item);
  const isAuthenticated = account != null && account.id !== 0;
  const role = account?.role;

  const isLoginRequired = getEnvAsBoolean('REACT_APP_REQUIRE_LOGIN');

  let routesList: Array<React.ReactNode>;
  if (isAuthenticated) {
    routesList = PrivateRoutes.filter(r => hasRequiredRole(r.restriction, role)).map(r => (
      <Route path={getRoutePath(r.path)} key={r.path} element={toPageComponent(r.component)} />
    ));
    routesList.push(
      <Route path={getRoutePath('/')} key='/' element={<Navigate replace to={getRoutePath('/home')} />} />
    );
    routesList.push(
      <Route path='*' key='*' element={<Navigate replace to={getRoutePath(isDemoMode() ? '/home' : '/NotFound')} />} />
    );
  } else if (isLoginRequired) {
    routesList = PublicRoutesIfRequireLogin.map(r => (
      <Route path={getRoutePath(r.path)} key={r.path} element={toPageComponent(r.component)} />
    ));
    routesList.push(
      <Route path='*' key='*' element={<Navigate replace to={getRoutePath('/login')} />} />
    );
  } else {
    routesList = PublicRoutes.map(r => (
      <Route path={getRoutePath(r.path)} key={r.path} element={toPageComponent(r.component)} />
    ));
    const defaultPath = getRoutePath('/home');
    // console.log(`[Routes] registering default path as "${defaultPath}"`);
    routesList.push(
      <Route path={getRoutePath('/')} key='/' element={<Navigate replace to={defaultPath} />} />
    );
    const fallbackPath = getRoutePath('/login');
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
