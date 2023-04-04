import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import '../css/recipe.css';

import Loading from '../../common/components/Loading';
import RecipeScheme from '../components/RecipeScheme';
import { useDispatch, useSelector } from '../../common/store/redux';
import * as RecipeActions from '../store/RecipeActions';
import * as RecipeFormActions from '../../recipe_form/store/actions';
// import MenuItemModal from '../../menu/components/modals/MenuItemModal';
// import * as MenuItemActions from '../../menu/actions/MenuItemActions';
// import { fetchRecipeList } from '../../menu/actions/RecipeListActions';
// import { menuItemValidation } from '../../menu/actions/validation';
import { RootState } from '../../app/Store';
import { Recipe } from '../store/RecipeTypes';
import { getRoutePath } from '../../common/utility';
import useCrash from '../../common/hooks/useCrash';
import CookingModeContextProvider from '../context/CookingModeContextProvider';
import CookingModeHandler from '../components/CookingModeHandler';

const RecipeContainer: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const crash = useCrash();

  const userId = useSelector((state: RootState) => state.account.item?.id);
  const recipeState = useSelector((state: RootState) => state.recipe);
  const recipe      = recipeState.item;
  const recipeMeta  = recipeState.meta;
  const prevRecipe  = useRef<Recipe | undefined>();

  // const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handlePreloadRecipe = useCallback(() => {
    if (recipe == null) { crash('Invalid state: recipe may not be null'); return; }
    dispatch(RecipeFormActions.preload(recipe));
  }, [recipe, dispatch]);

  // const menuItemSave = useCallback(() => { /* dispatch(MenuItemActions.save() */ }, [dispatch]);
  const deleteRecipe = useCallback(() => {
    if (recipe == null) { crash('Invalid state: recipe may not be null'); return; }
    setIsDeleting(true);
    dispatch(RecipeActions.deleteRecipe(recipe.id, recipe.slug));
  }, [recipe, dispatch]);

  // Handle deletion
  useEffect(() => {
    if (prevRecipe.current == null) {
      prevRecipe.current = recipe;
    } else if (isDeleting && prevRecipe.current != null && recipe == null) {
      nav(getRoutePath('/browser'));
    }
  }, [recipe]);

  if (recipe != null) {
    return (
      <CookingModeContextProvider>
        {/* TODO Menu
        <MenuItemModal
            id={0}
            show={showItemModal}
            onHide={() => setShowItemModal(false)}
            recipe={recipe.id}
            title={recipe.title}
            onSave={menuItemSave}
            fetchRecipeList={fetchRecipeList}
            validation={menuItemValidation} /> */}
        <RecipeScheme
            recipe       = {recipe}
            recipeMeta   = {recipeMeta}
            userId       = {userId}

            onEditRecipe = {handlePreloadRecipe}
            deleteRecipe = {deleteRecipe} />
        <CookingModeHandler />
      </CookingModeContextProvider>
    );
  } else {
    return (<Loading message='Loading' />);
  }
};

export default RecipeContainer;
