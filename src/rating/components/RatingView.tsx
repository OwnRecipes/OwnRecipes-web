import { useCallback, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames';

import { Rating } from '../store/types';
import Icon from '../../common/components/Icon';
import P from '../../common/components/P';
import Button from '../../common/components/Button';
import Tooltip from '../../common/components/Tooltip';
import { CommonProps } from '../../common/types/OverridableComponent';
import Modal from '../../common/components/Modal';
import { Toolbar } from '../../common/components/Toolbar';
import Ratings from './Ratings';

const messages = defineMessages({
  edited_by: {
    id: 'rating.edited_by',
    description: 'The rating was edited by ...',
    defaultMessage: 'Edited by',
  },
  edit_button: {
    id: 'rating_comments.edit_button',
    description: 'Label of the edit comment icon button',
    defaultMessage: 'Edit comment',
  },
  delete_button: {
    id: 'rating_comments.delete_button',
    description: 'Label of the delete comment icon button',
    defaultMessage: 'Delete comment',
  },
  confirm_delete_message: {
    id: 'rating_comments.confirm_delete',
    description: 'Are you sure you want to delete this comment?',
    defaultMessage: 'Are you sure you want to delete this comment?',
  },
});

interface IRatingFCProps {
  rating: Rating;
}

export const RatingEditor: React.FC<IRatingFCProps> = ({ rating }: IRatingFCProps) => {
  const { formatMessage, locale } = useIntl();

  if (rating.update_date && new Date(rating.update_date).getTime() > 0 && rating.update_username) {
    const editorS = `${formatMessage(messages.edited_by)}: ${rating.update_username}`;
    const editDateS = new Date(rating.update_date).toLocaleString(locale);
    const tooltipJsx = (
      <div className='d-flex-column'>
        <div>{editorS}</div>
        <div>{editDateS}</div>
      </div>
    );
    return (
      <Tooltip id={`${rating.id}-editor-tooltip`} tooltip={tooltipJsx}>
        <Icon icon='pencil' className='subtitle2' size='1x' style={{ marginLeft: '5px' }} ariaLabel={`${formatMessage(messages.edited_by)}: ${rating.update_username}. ${editDateS}`} />
      </Tooltip>
    );
  } else {
    return null;
  }
};

export const RatingTimestamp: React.FC<IRatingFCProps> = ({ rating }: IRatingFCProps) => {
  const { locale } = useIntl();
  if (rating.update_date && new Date(rating.update_date).getTime() > 0 && rating.update_username === rating.pub_username) {
    return <Link className='subtitle2 rating-timestamp' to={`#rating-${rating.id}`}>{new Date(rating.update_date).toLocaleString(locale)}</Link>;
  } else if (rating.pub_date && new Date(rating.pub_date).getTime() > 0) {
    return <Link className='subtitle2 rating-timestamp' to={`#rating-${rating.id}`}>{new Date(rating.pub_date).toLocaleString(locale)}</Link>;
  } else {
    return null;
  }
};

const RatingCommentComment: React.FC<IRatingFCProps> = ({ rating }: IRatingFCProps) => {
  const markup: Array<React.ReactNode> = [];

  const pList = rating.comment.split('\n').filter(Boolean);
  pList.forEach((p, index) => {
    markup.push(
      // eslint-disable-next-line react/no-array-index-key
      <P key={`${index}-p`}>
        {p}
      </P>
    );
  });

  return (
    <>
      {markup}
    </>
  );
};

export interface IRatingToolbarProps extends IRatingFCProps, CommonProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const RatingToolbar: React.FC<IRatingToolbarProps> = ({
    rating, onEdit, onDelete,
    className, ...rest }: IRatingToolbarProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const handleDeleteClick = useCallback(() => { setShowDeleteConfirm(true); }, []);
  const handleDeleteClose  = useCallback(() => { setShowDeleteConfirm(false); }, []);
  const handleDeleteAccept = useCallback(() => { onDelete?.(); }, []);

  return (
    <>
      <Toolbar position='end' className={classNames('rating-toolbar', className)} {...rest}>
        {onEdit && (
          <Button id={`edit-${rating.id}`} variant='outline-primary' className='rating-edit-button' tooltip={formatMessage(messages.edit_button)} onClick={onEdit}>
            <Icon icon='pencil' />
          </Button>
        )}
        {onDelete && (
          <Button id={`delete-${rating.id}`} variant='outline-danger' className='rating-delete-button' tooltip={formatMessage(messages.delete_button)} onClick={handleDeleteClick}>
            <Icon icon='trash' />
          </Button>
        )}
      </Toolbar>

      <Modal
          show = {showDeleteConfirm}
          title = {intl.messages['recipe.confirm_delete_title'] as string}
          acceptTitle = {intl.messages['recipe.confirm_delete_accept'] as string}
          onAccept = {handleDeleteAccept}
          onClose  = {handleDeleteClose}
          acceptButtonProps = {{ variant: 'danger' }}>
        {formatMessage(messages.confirm_delete_message)}
      </Modal>
    </>
  );
};

const RatingView: React.FC<IRatingFCProps> = ({ rating }: IRatingFCProps) => (
  <>
    <Row className='rating-header'>
      <Col xs>
        <Ratings stars={rating.rating || 0} />
        <div className='rating-username'>{rating.pub_username}</div>
      </Col>
      <Col xs='auto'>
        <RatingTimestamp rating={rating} />
        <RatingEditor rating={rating} />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <RatingCommentComment rating={rating} />
      </Col>
    </Row>
  </>
);

export default RatingView;
