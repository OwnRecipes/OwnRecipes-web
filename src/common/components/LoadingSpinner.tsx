import { forwardRef } from 'react';
import classNames from 'classnames';

import '../css/loading_spinner.css';

import { CommonProps } from '../types/OverridableComponent';
import CircularProgress from './CircularProgress';

interface ILoadingSpinnerProps extends CommonProps {
  /**
   * @defaultValue `inline`
   */
  position?: 'inline' | 'screen-center';
}

const LoadingSpinner = forwardRef<HTMLDivElement, ILoadingSpinnerProps>(({
  position = 'inline',
  className, ...rest }: ILoadingSpinnerProps, ref) => (
    <CircularProgress
        className={classNames('loading-spinner', className, {
          'screen-center': position === 'screen-center',
        })}
        {...rest}
        ref = {ref}
        />
));

export default LoadingSpinner;
