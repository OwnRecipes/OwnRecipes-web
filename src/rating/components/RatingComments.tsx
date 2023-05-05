import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Col, Row } from 'react-bootstrap';

import { Rating } from '../store/types';
import P from '../../common/components/P';
import { PendingState } from '../../common/store/GenericReducerType';
import CircularProgress from '../../common/components/CircularProgress';
import RatingComment from './RatingComment';

export interface IRatingCommentsProps {
  recipeSlug: string;
  ratings:    Array<Rating> | undefined;
  userId:     number | undefined;
  pending:    PendingState;

  removeRating: (recipe: string, rating: number) => void;
}

const RatingComments: React.FC<IRatingCommentsProps> = ({ recipeSlug, ratings, userId, pending, removeRating }: IRatingCommentsProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    no_comments: {
      id: 'rating_comments.no_comments',
      description: 'Placeholder for no comments',
      defaultMessage: '(No comments yet. Be the first!)',
    },
  });

  const handleDeleteAccept = useCallback((ratingId: number) => removeRating(recipeSlug, ratingId), [removeRating, recipeSlug]);

  const ratingsList = ratings?.map(rating => (
    <RatingComment
        key = {rating.id}
        rating = {rating}
        onDelete = {rating.userId === userId ? handleDeleteAccept : undefined} />
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
