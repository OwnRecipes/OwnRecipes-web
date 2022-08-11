import classNames from 'classnames';
import Spinner from 'react-spinkit';

import '../css/loading_spinner.css';

interface ILoadingSpinnerProps {
  position?: 'inline' | 'screen-center';
}

const LoadingSpinner = ({ position }: ILoadingSpinnerProps) => (
  <Spinner
      name = 'circle'
      className={classNames('spinner-obj', 'loading-spinner', {
        'screen-center': position === 'screen-center',
      })}
      />
);

export default LoadingSpinner;
