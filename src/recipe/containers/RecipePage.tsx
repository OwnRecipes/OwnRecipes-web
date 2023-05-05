import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as _ from 'lodash-es';

import { RootState } from '../../app/Store';
import { useDispatch, useSelector } from '../../common/store/redux';
import Ratings from '../../rating/containers/Ratings';
import PageWrapper from '../../common/components/PageWrapper';
import RecipeFooter from '../components/RecipeFooter';
import { PendingState } from '../../common/store/GenericReducerType';
import { getResourcePath } from '../../common/utility';
import * as RecipeActions from '../store/RecipeActions';
import RecipeContainer from './RecipeContainer';

const RecipePage: React.FC = () => {
  const params = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const recipeState  = useSelector((state: RootState) => state.recipe);
  const recipeMeta  = recipeState.meta;

  const paramsRecipe = params.recipe;
  // Load Recipe
  useEffect(() => {
    if (paramsRecipe) {
      dispatch(RecipeActions.load(paramsRecipe));
    }
  }, [paramsRecipe]);

  // If recipe not found, redirect to NotFound-Page
  useEffect(() => {
    if (_.get(recipeMeta.error, 'status') === 404) {
      nav(getResourcePath('/NotFound'));
    }
  }, [recipeMeta.error]);

  // componentWillUnmount
  useEffect(() => () => {
    dispatch(RecipeActions.reset());
  }, []);

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
