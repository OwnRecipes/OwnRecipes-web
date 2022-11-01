import { Toast as ReactBootstrapToast } from 'react-bootstrap';
import classNames from 'classnames';

import '../css/toast.css';

import Icon from './Icon';

export type AnchorOriginPosition = {
  horizontal: 'center' | 'left' | 'right';
  vertical: 'bottom' | 'top';
}

export interface IToastProps {
  show: boolean;
  autoHide?: number;

  variant?: 'success';
  anchorOrigin?: AnchorOriginPosition;

  onClose?: () => void;

  className?: string;
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

const Toast: React.FC<IToastProps> = ({ show, autoHide, variant, anchorOrigin, onClose, className, children }: IToastProps) => {
  const handleClose = () => {
    onClose?.();
  };

  const autoHideD = autoHide ?? 6000;
  const anchorString = anchorOrigin != null ? `Toast-anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}` : undefined;

  return (
    <ReactBootstrapToast
        show      = {show}
        delay     = {autoHideD}
        autohide  = {autoHideD > 0}
        className = {classNames('simple-toast', className, anchorString, {
          success: variant === 'success',
        })}
        onClose   = {handleClose}>
      <ReactBootstrapToast.Header closeButton={onClose != null}>
        <>
          {variant === 'success' && <div className='toast-icon'><Icon icon='check' variant='light' size='2x' /></div>}
          <span className='toast-title'>{children}</span>
        </>
      </ReactBootstrapToast.Header>
    </ReactBootstrapToast>
  );
};

export default Toast;
