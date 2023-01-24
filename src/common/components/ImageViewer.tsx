import { Children, isValidElement, useCallback, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames';

import '../css/image_viewer.css';

import { ModalHeaderCloseButton } from './Modal';
import { IImageProps } from './Image';
import Icon from './Icon';
import ErrorBoundary from './ErrorBoundary';

export interface IImageViewerProps {
  style?: React.CSSProperties;
  className?: string;

  children: React.ReactElement<IImageProps>; // | Array<React.ReactElement<IImageProps>>;
}

const ImageViewer: React.FC<IImageViewerProps> = ({
    style, className, children }: IImageViewerProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal  = useCallback(() => { setOpenModal(true); }, []);
  const handleCloseModal = useCallback(() => { setOpenModal(false); }, []);

  return (
    <ErrorBoundary verbose={false} printStack={false}>
      <Button
          type = 'button'
          style = {style}
          className = {classNames('image-viewer', className)}
          onClick = {handleOpenModal}
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
};

interface IImageViewerContentProps {
  onClose: () => void;

  children: React.ReactElement<IImageProps>; // | Array<React.ReactElement<IImageProps>>;
}

const ImageViewerContent: React.FC<IImageViewerContentProps> = ({
    onClose, children }: IImageViewerContentProps) => {
  // This is a good spot to generate some kind of list, if more than 1 image is provided.
  let nextSrc = '';
  Children.forEach(children, element => {
    if (!isValidElement(element)) return;

    const { src } = element.props;
    nextSrc = src;
  });
  const nextTitle = nextSrc.includes('/') ? nextSrc.substring(nextSrc.lastIndexOf('/') + 1) : nextSrc;

  return (
    <>
      <Modal.Header>
        <Modal.Title>{nextTitle}</Modal.Title>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a title={nextTitle} download={nextTitle} href={nextSrc} className='btn btn-transparent close-button download-button'>
          <Icon icon='download' variant='light' size='2x' />
        </a>
        <ModalHeaderCloseButton onClose={onClose} />
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </>
  );
};

export default ImageViewer;
