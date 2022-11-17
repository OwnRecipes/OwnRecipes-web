import { useMemo } from 'react';

import { CombinedStore } from '../../app/Store';
import { useSelector } from '../../common/store/redux';
import Ratings from '../../rating/containers/Ratings';
import PageWrapper from '../../common/components/PageWrapper';
import RecipeFooter from '../components/RecipeFooter';
import { PendingState } from '../../common/store/GenericReducerType';
import RecipeContainer from './RecipeContainer';

const RecipePage: React.FC = () => {
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
