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
  /** aria-label as alt for sr. Will be put into a hidden span inside. Use this over aria-label. */
  ariaLabel?: string;
}

function toVariantAffix(variant: 'filled' | 'light'): string {
  return variant === 'filled' ? '-fill' : '';
}

const Icon = forwardRef<HTMLElement, IIconProps>(({
  icon, variant = 'filled', size = '1x',
  ariaLabel,
  className, ...rest }: IIconProps, ref) => (
    <i className={classNames('bi', `bi-${icon}${toVariantAffix(variant)}`, `size-${size}`, className)} {...rest} ref={ref}>
      {ariaLabel && <span className='sr-only'>{ariaLabel}</span>}
    </i>
));

export default Icon;
