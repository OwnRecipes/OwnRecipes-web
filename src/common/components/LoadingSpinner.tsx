import classNames from 'classnames';

import '../css/loading_spinner.css';

import CircularProgress from './CircularProgress';

interface ILoadingSpinnerProps {
  position?: 'inline' | 'screen-center';
}

const LoadingSpinner = ({ position }: ILoadingSpinnerProps) => (
  <CircularProgress
      className={classNames('loading-spinner', {
        'screen-center': position === 'screen-center',
      })}
      />
);

export default LoadingSpinner;
