import { forwardRef } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

import '../css/alert.css';

import { CommonProps } from '../types/OverridableComponent';
import Icon from './Icon';
import P from './P';

export interface IAlertProps extends CommonProps {
  severity: 'danger' | 'info';
  title: string;

  children: React.ReactNode;
}

const Alert = forwardRef<HTMLDivElement, IAlertProps>(({ severity, title, children, ...rest }: IAlertProps, ref) => (
  <BootstrapAlert variant={severity} {...rest} ref={ref}>
    <BootstrapAlert.Heading>
      {severity === 'info'   && <Icon icon='info-circle' size='2x' className='alert-icon' />}
      {severity === 'danger' && <Icon icon='exclamation-diamond' size='2x' className='alert-icon' />}
      {title}
    </BootstrapAlert.Heading>
    {typeof children === 'string' && children.length > 0 && (
      <P className='alert-message mb-0'>{children}</P>
    )}
    {typeof children !== 'string' && (
      <div className='alert-message'>{children}</div>
    )}
  </BootstrapAlert>
));

export default Alert;
