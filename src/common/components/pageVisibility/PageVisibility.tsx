// Coded by Gilad Peleg (https://github.com/pgilad/react-page-visibility)

import { Children, Component } from 'react';
import { getHandlerArgs, isSupported, visibility } from './utils';

export interface IPageVisibilityProps {
  onChange: (visibile: boolean, visibleString: string) => void;
  children: React.ReactNode;
}

interface IPageVisibilityState {
  isSupported: boolean;
}

class PageVisibility extends Component<IPageVisibilityProps, IPageVisibilityState> {
  constructor(props: IPageVisibilityProps) {
    super(props);

    this.state = {
      isSupported: isSupported && visibility != null,
    };
  }

  componentDidMount() {
    if (!this.state.isSupported || visibility == null) {
      return;
    }

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    document.addEventListener(visibility.event, this.handleVisibilityChange);
  }

  componentWillUnmount() {
    if (!this.state.isSupported || visibility == null) {
      return;
    }
    document.removeEventListener(visibility.event, this.handleVisibilityChange);
  }

  handleVisibilityChange() {
    if (typeof this.props.onChange === 'function') {
      // propagate change to callback
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.props.onChange(...getHandlerArgs());
    }
    if (typeof this.props.children === 'function') {
      // we pass the props directly to the function as children
      this.forceUpdate();
    }
  }

  render() {
    if (!this.props.children) {
      return null;
    }
    // function as children pattern support
    if (typeof this.props.children === 'function') {
      const childrenFunc: Function = this.props.children;
      if (!this.state.isSupported) {
        // don't pass any arguments if PageVisibility is not supported
        return childrenFunc();
      }
      return childrenFunc(...getHandlerArgs());
    }

    return Children.only(this.props.children);
  }
}

export default PageVisibility;
