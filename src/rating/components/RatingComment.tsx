import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Col, Row } from 'react-bootstrap';

import { Rating } from '../store/types';
import Icon from '../../common/components/Icon';
import P from '../../common/components/P';
import Modal from '../../common/components/Modal';
import Ratings from './Ratings';
import { Link } from 'react-router-dom';
import PageScroller from '../../common/components/PageScroller';
import { useLocation } from 'react-router';
import classNames from 'classnames';

export interface IRatingCommentProps {
  rating:     Rating;
  onDelete?:  (ratingId: number) => void;
}

interface IRatingTimestampProps {
  rating: Rating;
}

const RatingTimestamp: React.FC<IRatingTimestampProps> = ({ rating }: IRatingTimestampProps) => {
  const intl = useIntl();
  if (rating.updateDate && new Date(rating.updateDate).getTime() > 0) {
    return <Link className='rating-timestamp' to={`#rating-${rating.id}`}>{new Date(rating.updateDate).toLocaleString(intl.locale)}</Link>;
  } else if (rating.pubDate && new Date(rating.pubDate).getTime() > 0) {
    return <Link className='rating-timestamp' to={`#rating-${rating.id}`}>{new Date(rating.pubDate).toLocaleString(intl.locale)}</Link>;
  } else {
    return null;
  }
};

interface IRatingCommentCommentProps {
  rating: Rating;
}

const RatingCommentComment: React.FC<IRatingCommentCommentProps> = ({ rating }: IRatingCommentCommentProps) => (
  <P>
    {rating.comment}
  </P>
);

const RatingComment: React.FC<IRatingCommentProps> = ({
    rating, onDelete }: IRatingCommentProps) => {
  const intl = useIntl();

  const messages = defineMessages({
    confirm_delete_message: {
      id: 'rating_comments.confirm_delete',
      description: 'Are you sure you want to delete this comment?',
      defaultMessage: 'Are you sure you want to delete this comment?',
    },
  });

  const { hash } = useLocation();
  const hashId = (hash ?? '').replace('#', '');

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | undefined>();
  const handleDeleteClick  = (ratingId: number) => { setShowDeleteConfirm(ratingId); };
  const handleDeleteAccept = () => { onDelete?.(showDeleteConfirm ?? 0); };
  const handleDeleteClose  = () => { setShowDeleteConfirm(undefined); };

  const ratingContainerId = `rating-${rating.id}`;

  return (
    <div id={ratingContainerId} className={classNames('rating-comment', { 'perma-link-active': ratingContainerId === hashId })}>
      <PageScroller uriFragmentId={ratingContainerId} />
      <Row>
        <Col xs>
          <Ratings stars={rating.rating || 0} />
          <div className='rating-username'>{rating.userName}</div>
        </Col>
        <Col xs='auto'>
          <RatingTimestamp rating={rating} />
          {onDelete && (
            <Button variant='outline-danger' className='rating-delete-button' size='sm' onClick={() => handleDeleteClick(rating.id)}>
              <Icon icon='trash' />
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <RatingCommentComment rating={rating} />
        </Col>
      </Row>

      <Modal
          show = {showDeleteConfirm != null}
          title = {intl.messages['recipe.confirm_delete_title'] as string}
          acceptTitle = {intl.messages['recipe.confirm_delete_accept'] as string}
          onAccept = {handleDeleteAccept}
          onClose  = {handleDeleteClose}
          acceptButtonProps = {{ variant: 'danger' }}>
        {intl.formatMessage(messages.confirm_delete_message)}
      </Modal>
    </div>
  );
};

export default RatingComment;
