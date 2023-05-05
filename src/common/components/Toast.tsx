import { forwardRef } from 'react';
import { Toast as ReactBootstrapToast } from 'react-bootstrap';
import classNames from 'classnames';

import '../css/toast.css';

import { CommonProps } from '../types/OverridableComponent';
import Icon from './Icon';

export interface AnchorOriginPosition {
  horizontal: 'center' | 'left' | 'right';
  vertical: 'bottom' | 'top';
}

export interface IToastProps extends CommonProps {
  show: boolean;
  autoHide?: number;

  variant?: 'success';
  anchorOrigin?: AnchorOriginPosition;

  onClose?: () => void;

  children: React.ReactNode;
}

function capitalize(str: string): string {
  if (str.length === 0) {
    return '';
  } else if (str.length === 1) {
    return str.toUpperCase();
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

const Toast = forwardRef<HTMLDivElement, IToastProps>(({
    show, autoHide = 6000, variant, anchorOrigin, onClose, children,
    className, ...rest }: IToastProps, ref) => {
  const anchorString = anchorOrigin != null ? `Toast-anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}` : undefined;

  return (
    <ReactBootstrapToast
        show      = {show}
        delay     = {autoHide}
        autohide  = {autoHide > 0}
        className = {classNames('simple-toast', className, anchorString, {
          success: variant === 'success',
        })}
        onClose   = {onClose}
        {...rest}
        ref = {ref}>
      <ReactBootstrapToast.Header closeButton={onClose != null}>
        <>
          {variant === 'success' && <div className='toast-icon'><Icon icon='check' variant='light' size='2x' /></div>}
          <span className='toast-title'>{children}</span>
        </>
      </ReactBootstrapToast.Header>
    </ReactBootstrapToast>
  );
});

export default Toast;
