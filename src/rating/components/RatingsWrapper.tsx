import { useCallback, useState } from 'react';
import { Card } from 'react-bootstrap';

import '../css/recipe-rating-wrapper.css';

import { PendingState } from '../../common/store/GenericReducerType';
import UserRole from '../../common/types/UserRole';
import { ValidationResult } from '../../common/store/Validation';
import { Rating, RatingCreate, RatingUpdate } from '../store/types';
import RatingComments from './RatingComments';
import RatingForm from './RatingForm';
import RatingsHeader from './RatingsHeader';

export interface IRatingsWrapperProps {
  ratings:    Array<Rating> | undefined;
  userId:     number | undefined;
  userRole:   UserRole | undefined;
  pending:    PendingState;

  addRating:    (rating: RatingCreate) => Promise<ValidationResult>;
  editRating:   (rating: RatingUpdate) => Promise<ValidationResult>;
  removeRating: (ratingId: number) => Promise<ValidationResult>;
}

const RatingsWrapper: React.FC<IRatingsWrapperProps> = ({ ratings, userId, userRole, pending, addRating, editRating, removeRating }: IRatingsWrapperProps) => {
  const [showNewRating, setShowNewRating] = useState<boolean>(false);

  const handleNewRatingUndisplay = useCallback(() => {
    setShowNewRating(false);
  }, []);

  return (
    <Card className='rating-panel' as='article'>
      <RatingsHeader userRole={userRole} showNewRating={showNewRating} onShowNewRating={() => setShowNewRating(true)} />
      <Card.Body>
        {showNewRating && userRole != null && [UserRole.USER, UserRole.STAFF, UserRole.ADMIN].includes(userRole) && (
          <RatingForm addRating={addRating} editRating={editRating} onSubmitSuccess={handleNewRatingUndisplay} onCancel={handleNewRatingUndisplay} />
        )}
        <RatingComments ratings={ratings} pending={pending} userId={userId} userRole={userRole} editRating={editRating} removeRating={removeRating} />
      </Card.Body>
    </Card>
  );
};

export default RatingsWrapper;
