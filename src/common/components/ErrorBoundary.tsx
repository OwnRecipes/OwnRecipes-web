import { Component } from 'react';

import { AnyComponent } from '../../types/Types';
import P from './P';

interface IErrorBoundaryProps {
  /** Print message? */
  verbose:    boolean;
  /** Print error stack? */
  printStack: boolean;
  /** The error. */
  children: AnyComponent;
}

interface IErrorBoundaryState {
  readonly hasError: boolean;
  readonly error: Error | null | undefined;
}

interface IErrorBoundaryContainerProps {
  /** The error. */
  children: AnyComponent;
}

const ErrorBoundaryContainer: React.FC<IErrorBoundaryContainerProps> = ({ children }: IErrorBoundaryContainerProps) => (
  <div style={{ margin: '0.5rem' }}>
    {children}
  </div>
);

/**
 * Simple error catcher.
 *
 * Wrap the usage of components to prevent any error from leaving.
 *
 * Example:
 * ```
 * <ErrorBoundary>
 *     <MyComponent ... />
 * </ErrorBoundary>
 * ```
 *
 * See also: {@link https://reactjs.org/docs/error-boundaries.html}
 */
 class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { error: error, hasError: true };
  }

  componentDidCatch(error: Error | null) {
    this.setState({ error: error || new Error('Error missing') });
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <ErrorBoundaryContainer>
          <h1>Error</h1>
          {this.props.verbose && (
            <>
              <h2>Message:</h2>
              <P>{this.state.error.message}</P>
            </>
          )}
          {this.props.printStack && (
            <>
              <h2>Stack:</h2>
              <P>{this.state.error.stack}</P>
            </>
          )}
        </ErrorBoundaryContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
