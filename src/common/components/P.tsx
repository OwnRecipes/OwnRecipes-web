import { forwardRef } from 'react';
import classNames from 'classnames';

import '../css/p.css';

import { CommonProps } from '../types/OverridableComponent';

export interface IPProps extends CommonProps {
  /**
   * @defaultValue `body1`
   */
  variant?: 'body1' | 'body2';
  children: React.ReactNode;
}

const P = forwardRef<HTMLParagraphElement, IPProps>(({
  variant = 'body1', children,
  className, ...rest }: IPProps, ref) => (
    <p className={classNames(variant ?? 'body1', className)} {...rest} ref={ref}>{children}</p>
));

export default P;
