import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import '../css/ingredients_panel.css';

import { useDispatch } from '../../common/store/redux';
import { Recipe } from '../store/RecipeTypes';
import { updateServings } from '../store/RecipeActions';
import { ReducerMeta } from '../../common/store/GenericReducerType';
import IngredientsPanel from '../components/IngredientsPanel';

export interface IIngredientsPanelContainerProps {
  recipe:      Recipe | undefined;
  recipeMeta:  ReducerMeta;
  userId:      number | undefined;
}

const IngredientsPanelContainer: React.FC<IIngredientsPanelContainerProps> = ({ recipe, recipeMeta, userId }: IIngredientsPanelContainerProps) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const recipeSlug = recipe?.slug ?? '';

  const handleUpdateServings = useCallback((servings: number) => {
    setSearchParams({ ...searchParams, servings: String(servings) });
    return dispatch(updateServings(recipeSlug, servings));
  }, [searchParams, recipeSlug, dispatch]);

  const locationServings = useMemo(() => {
    const serv = searchParams.get('servings');
    if (!serv) return undefined;
    const servNumber = Number.parseFloat(serv);
    if (Number.isNaN(servNumber)) return undefined;
    return servNumber;
  }, [searchParams]);

  const customServings = recipe?.customServings;

  useEffect(() => {
    if (locationServings && locationServings !== customServings) {
      handleUpdateServings(locationServings);
    }
  }, [handleUpdateServings, locationServings, customServings]);

  return (
    <IngredientsPanel
        recipe     = {recipe}
        recipeMeta = {recipeMeta}
        userId     = {userId}
        updateServings = {handleUpdateServings}
        />
  );
};

export default IngredientsPanelContainer;
