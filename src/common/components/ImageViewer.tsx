import { Children, forwardRef, isValidElement, useCallback, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames';

import '../css/image_viewer.css';

import { CommonProps } from '../types/OverridableComponent';
import { ModalHeaderCloseButton } from './Modal';
import { IImageProps } from './Image';
import Icon from './Icon';
import ErrorBoundary from './ErrorBoundary';

export interface IImageViewerProps extends CommonProps {
  children: React.ReactElement<IImageProps>;
}

const ImageViewer = forwardRef<HTMLButtonElement, IImageViewerProps>(({
    className, children, ...rest }: IImageViewerProps, ref) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal  = useCallback(() => { setOpenModal(true); }, []);
  const handleCloseModal = useCallback(() => { setOpenModal(false); }, []);

  return (
    <ErrorBoundary verbose={false} printStack={false}>
      <Button
          type = 'button'
          className = {classNames('image-viewer', className)}
          onClick = {handleOpenModal}
          {...rest}
          ref = {ref}
          >
        {children}
      </Button>

      <Modal
          show = {openModal}
          fullscreen
          onHide = {handleCloseModal}
          className = 'image-viewer-dialog'
          >
        <ErrorBoundary verbose printStack>
          <ImageViewerContent
              onClose = {handleCloseModal}>
            {children}
          </ImageViewerContent>
        </ErrorBoundary>
      </Modal>
    </ErrorBoundary>
  );
});

interface IImageViewerContentProps extends CommonProps {
  onClose: () => void;

  children: React.ReactElement<IImageProps>;
}

const ImageViewerContent = forwardRef<HTMLDivElement, IImageViewerContentProps>(({
    onClose, children, ...rest }: IImageViewerContentProps, ref) => {
  let nextSrc = '';
  Children.forEach(children, element => {
    if (!isValidElement(element)) return;

    const { src } = element.props;
    nextSrc = src;
  });
  const nextTitle = nextSrc.includes('/') ? nextSrc.substring(nextSrc.lastIndexOf('/') + 1) : nextSrc;

  return (
    <>
      <Modal.Header {...rest} ref={ref}>
        <Modal.Title>{nextTitle}</Modal.Title>
        <a title={nextTitle} download={nextTitle} href={nextSrc} className='btn btn-transparent close-button download-button' aria-label='Download'>
          <Icon icon='download' variant='light' size='2x' />
        </a>
        <ModalHeaderCloseButton onClose={onClose} />
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </>
  );
});

export default ImageViewer;
