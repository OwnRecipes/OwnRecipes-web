import { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { NavigateFunction, useLocation, useNavigate } from 'react-router';
import { Location } from 'history';

import './css/404.css';

import { CombinedStore } from './Store';
import * as AccountActions from '../account/store/actions';
import { AccountState } from '../account/store/types';
import { getEnvAsBoolean, getResourcePath } from '../common/utility';

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

    if (prevToken == null && currToken != null) {
      if (originUrl === getResourcePath('/') || originUrl === getResourcePath('/login')) {
        this.props.nav(getResourcePath('/home'), { replace: true });
      } else if (this.props.loc.pathname !== originUrl) {
        this.props.nav(`${originUrl}${this.state.originSearch}`, { replace: true });
      }
    } else if (prevToken != null && currToken == null) {
      setTimeout(() => {
        const isLoginRequired = getEnvAsBoolean('REACT_APP_REQUIRE_LOGIN');
        this.props.nav(getResourcePath(isLoginRequired ? '/login' : '/home'));
        this.props.nav(0);
      }, 500);
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: CombinedStore): IStateProps => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<CombinedStore, unknown, AnyAction>): IDispatchProps => ({
  tryAutoLogin:  () => dispatch(AccountActions.tryAutoLogin()),
});

const EnhancedAutoLoginClass = connect(mapStateToProps, mapDispatchToProps)(AutoLoginClass);

export default AutoLogin;
