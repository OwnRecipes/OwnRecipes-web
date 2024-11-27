import { forwardRef } from 'react';
import classNames from 'classnames';

import '../css/toolbar.css';

import { CommonProps } from '../types/OverridableComponent';

export interface IToolbarProps extends CommonProps {
  position?: 'start' | 'center' | 'end';
  children: React.ReactNode;
}

export const Toolbar = forwardRef<HTMLDivElement, IToolbarProps>(({
  position = 'start',
  children, className, ...rest }: IToolbarProps, ref) => (
    <div className={classNames('toolbar', className, { [position]: position })} {...rest} ref={ref}>
      {children}
    </div>
));
