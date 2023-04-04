import { forwardRef } from 'react';
import classNames from 'classnames';

import '../css/chip.css';

import { CommonProps } from '../types/OverridableComponent';

export interface IChipProps extends CommonProps {
  variant: 'primary' | 'secondary';

  children: React.ReactNode;
}

const Chip = forwardRef<HTMLSpanElement, IChipProps>(({
  variant, className, children, ...rest }: IChipProps, ref) => (
    <span
        className={classNames('chip', variant, className)}
        {...rest}
        ref = {ref}>
      {children}
    </span>
));

export default Chip;
