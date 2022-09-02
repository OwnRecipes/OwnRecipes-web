import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { CombinedStore } from '../../app/Store';
import Ratings from '../../rating/containers/Ratings';
import PageWrapper from '../../common/components/PageWrapper';
import RecipeFooter from '../components/RecipeFooter';
import { PendingState } from '../../common/store/GenericReducerType';
import { useWakeLock } from '../../common/hooks/useWakeLock';
import RecipeContainer from './RecipeContainer';
import usePageVisibility from '../../common/components/pageVisibility/usePageVisibility';

const RecipePage: React.FC = () => {
  const { request, release, released } = useWakeLock();
  useEffect(() => {
    request();

    return () => {
      if (released === false) release();
    };
  }, []);

  const isVisible = usePageVisibility();
  useEffect(() => {
    if (!isVisible) {
      if (released === false) {
        release();
      }
    } else {
      request();
    }
  }, [isVisible]);

  const recipeState  = useSelector((state: CombinedStore) => state.recipe);

  const ratings = useMemo(() => <Ratings />, [recipeState.item?.id, recipeState.meta.pending]);
  const footer  = useMemo(() => <RecipeFooter recipe={recipeState.item} />, [recipeState.item?.id, recipeState.item?.author]);

  return (
    <PageWrapper title={recipeState.item?.title}>
      <RecipeContainer />
      {recipeState.meta.pending === PendingState.COMPLETED && ratings}
      {recipeState.meta.pending === PendingState.COMPLETED && footer}
    </PageWrapper>
  );
};

export default RecipePage;
