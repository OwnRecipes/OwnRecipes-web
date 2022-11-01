import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import RatingsWrapper from '../components/RatingsWrapper';
import * as RatingsActions from '../store/actions';
import { RatingCreate } from '../store/types';
import { CombinedStore } from '../../app/Store';
import { useDispatch } from '../../common/store/redux';
import ErrorBoundary from '../../common/components/ErrorBoundary';

const Ratings: React.FC = () => {
  const dispatch = useDispatch();

  const account = useSelector((state: CombinedStore) => state.account.item);
  const recipe  = useSelector((state: CombinedStore) => state.recipe.item);
  const ratingsState = useSelector((state: CombinedStore) => state.ratings);

  const recipeSlug = recipe?.slug;
  const recipeRating = recipe?.rating;

  const addRating = useCallback(async (recSlug: string, rating: RatingCreate) => RatingsActions.add(dispatch, recSlug, rating), [dispatch]);
  const removeRatingCallback = useCallback((recSlug, ratingId: number) => dispatch(RatingsActions.remove(recSlug, ratingId)), [dispatch]);

  useEffect(() => {
    if (recipeSlug == null || recipeRating == null || recipeRating === 0) return;
    dispatch(RatingsActions.load(recipeSlug));
  }, [recipeSlug, recipeRating]);

  if (recipeSlug == null) return null;
  const ratings = recipeSlug != null && ratingsState.items != null ? ratingsState.items[recipeSlug] : undefined;

  return (
    <ErrorBoundary verbose printStack>
      <RatingsWrapper
          recipeSlug = {recipeSlug}
          userId     = {account?.id}
          userRole   = {account?.role}
          ratings    = {ratings}
          pending    = {ratingsState.meta.pending}

          addRating  = {addRating}
          removeRating = {removeRatingCallback} />
    </ErrorBoundary>
  );
};

export default Ratings;
