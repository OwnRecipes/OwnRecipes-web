import { forwardRef } from 'react';
import classNames from 'classnames';

import '../css/chip.css';

import { CommonProps } from '../types/OverridableComponent';

export interface IChipProps extends CommonProps {
  color?: 'primary' | 'secondary';

  children: React.ReactNode;
}

const Chip = forwardRef<HTMLSpanElement, IChipProps>(({
  color, className, children, ...rest }: IChipProps, ref) => (
    <span
        className={classNames('chip', color, className)}
        {...rest}
        ref = {ref}>
      {children}
    </span>
));

export default Chip;
