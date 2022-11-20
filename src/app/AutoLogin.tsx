import { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { NavigateFunction, useLocation, useNavigate } from 'react-router';
import { Location } from 'history';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Beforeunload } from 'react-beforeunload';

import './css/404.css';

import { CombinedStore } from './Store';
import * as AccountActions from '../account/store/actions';
import { AccountState } from '../account/store/types';
import { getEnvAsBoolean, getRoutePath } from '../common/utility';

const AutoLogin: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();

  return (
    <EnhancedAutoLoginClass
        nav = {nav}
        loc = {location}
        />
  );
};

interface IAutoLoginClassProps {
  nav: NavigateFunction;
  loc: Location;
}

interface IDispatchProps {
  tryAutoLogin: () => void;
  forgetLogin:  () => void;
}

interface IStateProps {
  account: AccountState;
}

interface IAutoLoginState {
  originUrl: string;
  originSearch: string;
}

type IProps = IStateProps & IDispatchProps & IAutoLoginClassProps;

class AutoLoginClass extends Component<IProps, IAutoLoginState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      originUrl: props.loc.pathname,
      originSearch: props.loc.search,
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
    const originUrl = this.state.originUrl;

    // console.log(`[AutoLogin] originUrl=${originUrl}, prevUrl=${prevProps.loc.pathname}, nextUrl=${this.props.loc.pathname}, prevToken=${JSON.stringify(prevToken)}, currToken=${JSON.stringify(currToken)}`);

    if ((prevToken == null && currToken != null)
      || (prevToken != null && currToken != null && this.props.loc.pathname === getRoutePath('/login'))) {
      if (originUrl === getRoutePath('/') || originUrl === getRoutePath('/login')) {
        const path = getRoutePath('/home');
        // console.log(`[AutoLogin::componentDidUpdate] user is logged in, forward to home ("${path}")`);
        this.props.nav(path, { replace: true });
      } else if (this.props.loc.pathname !== originUrl) {
        const path = `${originUrl}${this.state.originSearch}`;
        // console.log(`[AutoLogin::componentDidUpdate] user is logged in, forward to origin url ("${path}")`);
        this.props.nav(path, { replace: true });
      }
    } else if (prevToken != null && currToken == null) {
      setTimeout(() => {
        const isLoginRequired = getEnvAsBoolean('REACT_APP_REQUIRE_LOGIN');
        const path = getRoutePath(isLoginRequired ? '/login' : '/home');
        // console.log(`[AutoLogin::componentDidUpdate] user has logged out, forward to "${path}"`);
        this.props.nav(path);
        this.props.nav(0);
      }, 500);
    }
  }

  handleForgetLogout(): void {
    if (this.props.account.item != null && !this.props.account.item.remember) {
      this.props.forgetLogin();
    }
  }

  render() {
    return (
      <Beforeunload onBeforeunload={() => this.handleForgetLogout()} />
    );
  }
}

const mapStateToProps = (state: CombinedStore): IStateProps => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<CombinedStore, unknown, AnyAction>): IDispatchProps => ({
  tryAutoLogin:  () => dispatch(AccountActions.tryAutoLogin()),
  forgetLogin:   () => dispatch(AccountActions.forgetLogin()),
});

const EnhancedAutoLoginClass = connect(mapStateToProps, mapDispatchToProps)(AutoLoginClass);

export default AutoLogin;
