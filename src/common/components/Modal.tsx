import { defineMessages, useIntl } from 'react-intl';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';

import '../css/modal.css';

export interface IModalProps {
  show: boolean;
  title: string;

  acceptTitle?: React.ReactNode;
  closeTitle?: React.ReactNode;

  onAccept?: () => void;
  onClose?: (autoClose: boolean) => void;
  noCloseButton?: boolean;

  size?: 'sm' | 'lg';

  className?: string;
  acceptButtonProps?: Partial<unknown>;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = (props: IModalProps) => {
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

  const { show, title, acceptTitle, closeTitle, onAccept, onClose, noCloseButton, className, acceptButtonProps, children } = props;

  const handleClose = () => {
    if (onClose) {
      onClose(false);
    }
  };

  const handleAccept = () => {
    if (onClose) {
      onClose(true);
    }
    if (onAccept) {
      onAccept();
    }
  };

  const hasButton = onAccept != null || (onClose != null && !noCloseButton);

  return (
    <BootstrapModal
        show = {show}
        backdrop = 'static'
        size = {props.size ?? 'lg'}
        centered
        onHide = {handleClose}
        keyboard = {false}
        className = {className}>
      <BootstrapModal.Header closeButton={onClose != null}>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>

      {hasButton && (
        <BootstrapModal.Footer>
          {onClose != null && !noCloseButton && (
            <Button variant='secondary' onClick={handleClose}>
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
};

export default Modal;