import { useCallback, useEffect } from 'react';

import RatingsWrapper from '../components/RatingsWrapper';
import * as RatingsActions from '../store/actions';
import { RatingCreate, RatingUpdate } from '../store/types';
import { RootState } from '../../app/Store';
import { useDispatch, useSelector } from '../../common/store/redux';
import ErrorBoundary from '../../common/components/ErrorBoundary';

const Ratings: React.FC = () => {
  const dispatch = useDispatch();

  const account = useSelector((state: RootState) => state.account.item);
  const recipe  = useSelector((state: RootState) => state.recipe.item);
  const ratingsState = useSelector((state: RootState) => state.ratings);

  const recipeSlug = recipe?.slug;
  const recipeRating = recipe?.rating;

  const addRating  = useCallback(async (rating: RatingCreate) => RatingsActions.add(dispatch, recipeSlug ?? '', rating), [recipeSlug]);
  const editRating = useCallback(async (rating: RatingUpdate) => RatingsActions.update(dispatch, recipeSlug ?? '', rating), [recipeSlug]);
  const removeRatingCallback = useCallback((ratingId: number) => dispatch(RatingsActions.remove(recipeSlug ?? '', ratingId)), [recipeSlug]);

  useEffect(() => {
    if (recipeSlug == null || recipeRating == null || recipeRating === 0) return;
    dispatch(RatingsActions.load(recipeSlug));
  }, [recipeSlug, recipeRating]);

  if (recipeSlug == null) return null;
  const ratings = recipeSlug != null && ratingsState.items != null ? ratingsState.items[recipeSlug] : undefined;

  return (
    <ErrorBoundary verbose printStack>
      <RatingsWrapper
          userId     = {account?.id}
          userRole   = {account?.role}
          ratings    = {ratings}
          pending    = {ratingsState.meta.pending}

          addRating  = {addRating}
          editRating = {editRating}
          removeRating = {removeRatingCallback} />
    </ErrorBoundary>
  );
};

export default Ratings;
