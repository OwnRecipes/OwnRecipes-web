import { forwardRef } from 'react';
import classNames from 'classnames';

import '../css/icon.css';

import { CommonProps } from '../types/OverridableComponent';

export interface IIconProps extends CommonProps {
  icon:     string;
  /**
   * @defaultValue `filled`
   */
  variant?: 'filled' | 'light';
  /**
   * @defaultValue `1x`
   */
  size?:    '1x' | '2x';
}

function toVariantAffix(variant: 'filled' | 'light'): string {
  return variant === 'filled' ? '-fill' : '';
}

const Icon = forwardRef<HTMLElement, IIconProps>(({
  icon, variant = 'filled', size = '1x',
  className, ...rest }: IIconProps, ref) => (
    <i className={classNames('bi', `bi-${icon}${toVariantAffix(variant)}`, `size-${size}`, className)} {...rest} ref={ref} />
));

export default Icon;
