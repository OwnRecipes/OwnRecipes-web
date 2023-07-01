import React, { Component, useContext, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { NavigateFunction, useLocation, useNavigate } from 'react-router';
import { Location } from 'history';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Beforeunload } from 'react-beforeunload';

import { RootState } from '../../app/Store';
import * as AccountActions from '../store/actions';
import { AccountState, UserAccount } from '../store/types';
import { getEnvAsBoolean, getRoutePath } from '../../common/utility';
import request, { getToken } from '../../common/CustomSuperagent';
import AuthContext from '../context/AuthContext';
import { useSelector } from '../../common/store/redux';
import usePageVisibility from '../../common/hooks/pageVisibility/usePageVisibility';
import useHasInternetConnection from '../../common/hooks/useHasInternetConnection';

const AuthObserver: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const isAppVisible = usePageVisibility();
  const hasConnection = useHasInternetConnection();

  return (
    <>
      <EnhancedAuthObserverClass
          nav = {nav}
          loc = {location}
          isAppVisible = {isAppVisible}
          hasConnection = {hasConnection}
          />
      <AuthContextObserver />
    </>
  );
};

interface IAuthObserverClassProps {
  nav: NavigateFunction;
  loc: Location;

  isAppVisible: boolean;
  hasConnection: boolean;
}

interface IDispatchProps {
  tryAutoLogin:  () => void;
  tryRefresh:    () => void;
  sideloadToken: (user: UserAccount) => void;
  forgetLogin:   () => void;
}

interface IStateProps {
  account: AccountState;
}

interface IAuthObserverState {
  originUrl:    string;
  originSearch: string;
  originHash:   string;
}

type IProps = IStateProps & IDispatchProps & IAuthObserverClassProps;

class AuthObserverClass extends Component<IProps, IAuthObserverState> {
  timeoutID: NodeJS.Timeout | undefined;

  constructor(props: IProps) {
    super(props);

    // console.log(`[AuthObserver::ctor] loc=${JSON.stringify(props.loc)}`);

    this.state = {
      originUrl:    props.loc.pathname,
      originSearch: props.loc.search,
      originHash:   props.loc.hash,
    };
  }

  componentDidMount() {
    if (this.props.account.item == null) {
      this.props.tryAutoLogin();
    }
  }

  componentDidUpdate(prevProps: IProps) {
    const prevToken = prevProps.account.item;
    const currToken = this.props.account.item;

    // console.log(`[AuthObserver::componentDidUpdate] originUrl=${this.state.originUrl}, prevUrl=${prevProps.loc.pathname}, nextUrl=${this.props.loc.pathname}, prevToken=${JSON.stringify(prevToken)}, currToken=${JSON.stringify(currToken)}`);

    if (currToken && currToken.token !== prevToken?.token) {
      this.updateAppToken(currToken);
    }

    if ((prevToken == null && currToken != null) || (prevToken != null && currToken != null && this.props.loc.pathname === getRoutePath('/login'))) {
      this.postProcessLogin();
    } else if (prevProps.loc.pathname !== this.props.loc.pathname && prevProps.loc.pathname !== getRoutePath('/login') && this.props.loc.pathname !== getRoutePath('/login')) {
      const newToken = getToken();
      if (currToken != null && newToken == null) {
        this.postProcessLogout();
      } else if (currToken != null && newToken != null) {
        this.postProcessTokenChanged(currToken, newToken, true);
      }
    } else if (prevToken != null && currToken != null) {
      this.postProcessTokenChanged(prevToken, currToken, false);
    } else if (prevToken != null && currToken == null) {
      this.postProcessLogout();
    }

    const prevIsAppVisible = prevProps.isAppVisible;
    const currIsAppVisible = this.props.isAppVisible;

    const prevHasConnection = prevProps.hasConnection;
    const currHasConnection = this.props.hasConnection;

    if (prevIsAppVisible !== currIsAppVisible || prevHasConnection !== currHasConnection) {
      this.postProcessAppActivityChange(currIsAppVisible, currHasConnection);
    }
  }

  postProcessLogin() {
    // console.log('[AuthObserver::postProcessLogin]');
    const originUrl = this.state.originUrl;
    const url = this.props.loc.pathname;
    if (url === getRoutePath('/login')) {
      if (originUrl === getRoutePath('/') || originUrl === getRoutePath('/login')) {
        const path = getRoutePath('/home');
        // console.log(`[AuthObserver::postProcessLogin] user is logged in, forward to home ("${path}")`);
        this.props.nav(path, { replace: true });
      } else if (url !== originUrl) {
        const path = `${originUrl}${this.state.originSearch}${this.state.originHash}`;
        // console.log(`[AuthObserver::postProcessLogin] user is logged in, forward to origin url ("${path}")`);
        this.props.nav(path, { replace: true });
      }
    }
  }

  postProcessTokenChanged(prevUser: UserAccount, currUser: UserAccount, sideload: boolean) {
    // console.log(`[AuthObserver::postProcessTokenChanged] prevUser=${JSON.stringify(prevUser)}, currUser=${JSON.stringify(currUser)}, sideload=${sideload}`);
    const prevToken: JwtPayload = jwtDecode<JwtPayload>(prevUser.token);
    const currToken: JwtPayload = jwtDecode<JwtPayload>(currUser.token);
    if (prevUser.token === currUser.token && prevToken.iat === currToken.iat) return;

    if (prevUser.id !== currUser.id) {
      // Token changed in another tab.
      const path = getRoutePath('/home');
      this.props.nav(path, { replace: true });
    }

    if (sideload) {
      this.props.sideloadToken(currUser);
    }

    this.checkAuth(currUser);
  }

  updateAppToken(user: UserAccount) {
    if (this.timeoutID != null) {
      clearTimeout(this.timeoutID);
      this.timeoutID = undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request().set('Authorization', `Bearer ${user.token}`);

    this.checkAuth(user);
  }

  checkAuth(user: UserAccount) {
    const decodedToken: JwtPayload | undefined = jwtDecode<JwtPayload>(user.token);
    const expTime = decodedToken?.exp;
    if (!expTime) return;

    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
      this.timeoutID = undefined;
    }

    const tokenValidDuration = expTime - moment().unix();
    const refreshInSeconds = Math.max(0, tokenValidDuration - 60);
    // console.log(`[AuthObserver::checkAuth] queue tryRefresh for in ${refreshInSeconds} seconds.`);
    this.timeoutID = setTimeout(() => {
      this.props.tryRefresh();
    }, refreshInSeconds * 1000);
  }

  postProcessLogout() {
    // console.log('[AuthObserver::postProcessLogout]');
    if (this.timeoutID != null) {
      clearTimeout(this.timeoutID);
      this.timeoutID = undefined;
    }

    setTimeout(() => {
      const isLoginRequired = getEnvAsBoolean('REACT_APP_REQUIRE_LOGIN');
      const path = getRoutePath(isLoginRequired ? '/login' : '/home');
      // console.log(`[AuthObserver::postProcessLogout] user has logged out, forward to "${path}"`);
      this.props.nav(path);
      this.props.nav(0);
    }, 500);
  }

  postProcessAppActivityChange(isAppVisible: boolean, hasConnection: boolean) {
    if ((!isAppVisible || !hasConnection) && this.timeoutID != null) {
      // console.log('[AuthObserver::postProcessAppActivityChange] app is in background, stop refreshing the token.');
      clearTimeout(this.timeoutID);
      this.timeoutID = undefined;
    } else if (isAppVisible && hasConnection && this.timeoutID == null) {
      const newToken = getToken();
      if (newToken != null) {
        // console.log('[AuthObserver::postProcessAppActivityChange] app is active again, restart refreshing the token.');
        this.checkAuth(newToken);
      } else {
        // console.log('[AuthObserver::postProcessAppActivityChange] app is active again, with no token.');
      }
    }
  }

  handleForgetLogin() {
    // console.log('[AuthObserver::handleForgetLogin]');
    if (this.props.account.item != null && !this.props.account.item.remember) {
      this.props.forgetLogin();
    }
  }

  render() {
    return (
      <Beforeunload onBeforeunload={() => this.handleForgetLogin()} />
    );
  }
}

const mapStateToProps = (state: RootState): IStateProps => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): IDispatchProps => ({
  tryAutoLogin:  () => dispatch(AccountActions.tryAutoLogin()),
  tryRefresh:    () => dispatch(AccountActions.tryRefresh()),
  sideloadToken: (user: UserAccount) => dispatch(AccountActions.sideloadToken(user)),
  forgetLogin:   () => dispatch(AccountActions.forgetLogin()),
});

const EnhancedAuthObserverClass = connect(mapStateToProps, mapDispatchToProps)(AuthObserverClass);

const AuthContextObserver: React.FC = () => {
  const authContext  = useContext(AuthContext);
  const hasToken     = useSelector((state: RootState) => state.account.item) != null;
  const prevHasToken = useRef<boolean>(hasToken);

  useEffect(() => {
    // console.log(`[AuthContextObserver] prevHasToken=${prevHasToken.current}, hasToken=${hasToken}`);
    if (prevHasToken.current && !hasToken) {
      authContext.setLoggedOut();
    }
    prevHasToken.current = hasToken;
  }, [hasToken]);

  return null;
};

export default AuthObserver;
