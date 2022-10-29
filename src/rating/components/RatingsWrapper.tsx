import { useState } from 'react';
import { Card } from 'react-bootstrap';

import '../css/recipe-rating-wrapper.css';

import { PendingState } from '../../common/store/GenericReducerType';
import UserRole from '../../common/types/UserRole';
import { Rating, RatingCreate } from '../store/types';
import RatingComments from './RatingComments';
import NewRating from './NewRating';
import RatingsHeader from './RatingsHeader';

export interface IRatingsWrapperProps {
  recipeSlug: string;
  ratings:    Array<Rating> | undefined;
  userId:     number | undefined;
  userRole:   UserRole | undefined;
  pending:    PendingState;

  addRating: (recipeSlug: string, rating: RatingCreate) => void;
  removeRating: (recipeSlug: string, ratingId: number) => void;
}

const RatingsWrapper: React.FC<IRatingsWrapperProps> = ({ recipeSlug, ratings, userId, userRole, pending, addRating, removeRating }: IRatingsWrapperProps) => {
  const [showNewRating, setShowNewRating] = useState<boolean>(false);

  const handleAddRating = (rec: string, rating: RatingCreate) => addRating(rec, rating);

  const handleAddRatingSuccess = () => {
    setShowNewRating(false);
  };

  return (
    <Card className='rating-panel' as='article'>
      <RatingsHeader userRole={userRole} showNewRating={showNewRating} onShowNewRating={() => setShowNewRating(true)} />
      <Card.Body>
        {userId != null && userRole != null && [UserRole.USER, UserRole.STAFF, UserRole.ADMIN].includes(userRole) && (
          <NewRating show={showNewRating} recipeSlug={recipeSlug} userId={userId} addRating={handleAddRating} onAddRatingSuccess={handleAddRatingSuccess} />
        )}
        <RatingComments recipeSlug={recipeSlug} ratings={ratings} pending={pending} userId={userId} removeRating={removeRating} />
      </Card.Body>
    </Card>
  );
};

export default RatingsWrapper;
