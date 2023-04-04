import { forwardRef, useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';
import classNames from 'classnames';

import '../css/modal.css';

import Icon from './Icon';
import { CommonProps } from '../types/OverridableComponent';
import ErrorBoundary from './ErrorBoundary';

export interface IModalHeaderCloseButtonProps extends CommonProps {
  onClose: (event: React.MouseEvent) => void;
}

export const ModalHeaderCloseButton = forwardRef<HTMLButtonElement, IModalHeaderCloseButtonProps>(({
  onClose, className, ...rest }: IModalHeaderCloseButtonProps, ref) => (
    <Button type='button' onClick={onClose} variant='transparent' className={classNames('close-button', className)} aria-label='Close' {...rest} ref={ref}>
      <Icon icon='x' variant='light' size='2x' />
    </Button>
));

export interface IModalProps extends CommonProps {
  show: boolean;
  title: string;

  acceptTitle?: React.ReactNode;
  closeTitle?: React.ReactNode;

  onAccept?: () => void;
  onClose?: (autoClose: boolean) => void;
  noCloseButton?: boolean;

  /**
   * @defaultValue `lg`
   */
  size?: 'sm' | 'lg' | 'xl';

  acceptButtonProps?: Partial<unknown>;
  children: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, IModalProps>(({
    show, title,
    acceptTitle, closeTitle,
    onAccept, onClose, noCloseButton,
    size = 'lg', acceptButtonProps, children,
    ...rest }: IModalProps, ref) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    accept: {
      id: 'modal.accept',
      description: 'Default modal accept button',
      defaultMessage: 'Accept',
    },
    close: {
      id: 'modal.close',
      description: 'Default modal close button',
      defaultMessage: 'Close',
    },
  });

  const handleClose = useCallback(() => {
    onClose?.(false);
  }, [onClose]);

  const handleAccept = useCallback(() => {
    onClose?.(true);
    onAccept?.();
  }, [onClose, onAccept]);

  const hasButton = onAccept != null || (onClose != null && !noCloseButton);

  return (
    <BootstrapModal
        show = {show}
        backdrop = 'static'
        size = {size}
        centered
        onHide = {handleClose}
        keyboard = {false}
        {...rest}
        ref = {ref}>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
        {onClose != null && (
          <ModalHeaderCloseButton onClose={handleClose} />
        )}
      </BootstrapModal.Header>

      <BootstrapModal.Body>
        <ErrorBoundary verbose printStack>
          {children}
        </ErrorBoundary>
      </BootstrapModal.Body>

      {hasButton && (
        <BootstrapModal.Footer>
          {onClose != null && !noCloseButton && (
            <Button variant='outline-primary' onClick={handleClose}>
              {closeTitle ?? formatMessage(messages.close)}
            </Button>
          )}
          {onAccept != null && (
            <Button variant='primary' onClick={handleAccept} {...acceptButtonProps}>
              {acceptTitle ?? formatMessage(messages.accept)}
            </Button>
          )}
        </BootstrapModal.Footer>
      )}
    </BootstrapModal>
  );
});

export default Modal;
