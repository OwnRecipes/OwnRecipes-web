import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Col, Row } from 'react-bootstrap';

import { Rating, RatingUpdate } from '../store/types';
import P from '../../common/components/P';
import { PendingState } from '../../common/store/GenericReducerType';
import CircularProgress from '../../common/components/CircularProgress';
import { ValidationResult } from '../../common/store/Validation';
import UserRole from '../../common/types/UserRole';
import RatingComment from './RatingComment';

const messages = defineMessages({
  no_comments: {
    id: 'rating_comments.no_comments',
    description: 'Placeholder for no comments',
    defaultMessage: '(No comments yet. Be the first!)',
  },
});

export interface IRatingCommentsProps {
  ratings:    Array<Rating> | undefined;
  userId:     number | undefined;
  userRole:   UserRole | undefined;
  pending:    PendingState;

  editRating:   (rating: RatingUpdate) => Promise<ValidationResult>;
  removeRating: (rating: number) => Promise<ValidationResult>;
}

const RatingComments: React.FC<IRatingCommentsProps> = ({
    ratings, userId, userRole, pending, editRating, removeRating }: IRatingCommentsProps) => {
  const { formatMessage } = useIntl();

  const handleEdit         = useCallback((upd: RatingUpdate) => editRating(upd), [editRating]);
  const handleDeleteAccept = useCallback((ratingId: number) => removeRating(ratingId), [removeRating]);

  const isUserAdmin = userRole != null && [UserRole.STAFF, UserRole.ADMIN].includes(userRole);

  const ratingsList = ratings?.map(rating => (
    <RatingComment
        key = {rating.id}
        rating = {rating}
        onEdit   = {(rating.author === userId || isUserAdmin) ? handleEdit : undefined}
        onDelete = {(rating.author === userId || isUserAdmin) ? handleDeleteAccept : undefined} />
  )) ?? [];

  return (
    <>
      {pending === PendingState.LOADING && <CircularProgress variant='three-bounce' />}
      {ratingsList.length === 0 && (
        <Row key='be-the-first'><Col><P className='placeholder'>{formatMessage(messages.no_comments)}</P></Col></Row>
      )}
      {ratingsList}
    </>
  );
};

export default RatingComments;
