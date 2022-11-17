/** Code adapted from https://github.com/KyleAMathews/react-spinkit */

import classNames from 'classnames';

import '../css/circular_progress.css';

export interface ICircularSpinnerProps {
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
  /** Custom className for styling. */
  className?: string;
}

function getDivCount(variant: 'circle' | 'three-bounce'): number {
  switch (variant) {
    case 'circle':       return 12;
    case 'three-bounce': return  3;
    default: throw new Error(`Invalid argument: The spinner variant "${variant}" is invalid.`);
  }
}

const CircularProgress: React.FC<ICircularSpinnerProps> = ({
    variant, color, className }: ICircularSpinnerProps) => {
  const variantD = variant ?? 'circle';

  const classes = classNames('circular-progress', variantD, color, className);
  const divCount = getDivCount(variantD);

  return (
    <div className={classes}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {[...Array(divCount)].map((_, idx) => <div key={idx} />)}
    </div>
  );
};

export default CircularProgress;
