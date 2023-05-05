/** Code adapted from https://github.com/KyleAMathews/react-spinkit */

import { forwardRef } from 'react';
import classNames from 'classnames';

import '../css/circular_progress.css';

import { CommonProps } from '../types/OverridableComponent';

export interface ICircularSpinnerProps extends CommonProps {
  /**
   * Variant of the spinner.
   *
   * @defaultValue `circle`
   */
  variant?: 'circle' | 'three-bounce';
  /**
   * Color of the spinner. When `undefined` the color will be neutral.
   */
  color?: 'primary' | 'secondary';
}

function getDivCount(variant: 'circle' | 'three-bounce'): number {
  switch (variant) {
    case 'circle':       return 12;
    case 'three-bounce': return  3;
    default: throw new Error(`Invalid argument: The spinner variant "${variant}" is invalid.`);
  }
}

const CircularProgress = forwardRef<HTMLDivElement, ICircularSpinnerProps>(({
    variant = 'circle', color, className, ...rest }: ICircularSpinnerProps, ref) => {
  const classes = classNames('circular-progress', variant, color, className);
  const divCount = getDivCount(variant);

  return (
    <div className={classes} {...rest} ref={ref}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {[...Array(divCount)].map((_, idx) => <div key={idx} />)}
    </div>
  );
});

export default CircularProgress;
