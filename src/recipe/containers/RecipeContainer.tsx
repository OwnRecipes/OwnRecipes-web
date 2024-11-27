import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import '../css/recipe.css';

import Loading from '../../common/components/Loading';
import RecipeScheme from '../components/RecipeScheme';
import { useDispatch, useSelector } from '../../common/store/redux';
import * as RecipeActions from '../store/RecipeActions';
import * as RecipeFormActions from '../../recipe_form/store/actions';
import { RootState } from '../../app/Store';
import { Recipe } from '../store/RecipeTypes';
import { getRoutePath } from '../../common/utility';
import useCrash from '../../common/hooks/useCrash';
import CookingModeContextProvider from '../context/CookingModeContextProvider';
import CookingModeHandler from '../components/CookingModeHandler';
import UserRole from '../../common/types/UserRole';
import MenuItemModal from '../../menu_plan/components/MenuItemModal';
import SaveMenuItemSuccessToast from '../../menu_plan/components/SaveMenuItemSuccessToast';

const RecipeContainer: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const crash = useCrash();

  const userId = useSelector((state: RootState) => state.account.item?.id);
  const userRole = useSelector((state: RootState) => state.account.item?.role);
  const recipeState = useSelector((state: RootState) => state.recipe);
  const recipe      = recipeState.item;
  const recipeMeta  = recipeState.meta;
  const prevRecipe  = useRef<Recipe | undefined>();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handlePreloadRecipe = useCallback(() => {
    if (recipe == null) { crash('Invalid state: recipe may not be null'); return; }
    dispatch(RecipeFormActions.preload(recipe));
  }, [recipe]);

  const deleteRecipe = useCallback(() => {
    if (recipe == null) { crash('Invalid state: recipe may not be null'); return; }
    setIsDeleting(true);
    dispatch(RecipeActions.deleteRecipe(recipe.id, recipe.slug));
  }, [recipe]);

  // Handle deletion
  useEffect(() => {
    if (prevRecipe.current == null) {
      prevRecipe.current = recipe;
    } else if (isDeleting && prevRecipe.current != null && recipe == null) {
      nav(getRoutePath('/browser'));
    }
  }, [recipe]);

  const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const showMenuItemModal = useCallback(() => { setShowItemModal(true); }, []);
  const closeMenuItemModal = useCallback(() => { setShowItemModal(false); }, []);

  const [showAddMenuItemSuccessToast, setShowAddMenuItemToast] = useState<boolean>(false);
  const handleAddMenuItemSuccess = useCallback(() => { setShowAddMenuItemToast(true); }, []);
  const handleCloseAddMenuItemToast = useCallback(() => { setShowAddMenuItemToast(false); }, []);

  if (recipe != null) {
    return (
      <CookingModeContextProvider>
        <RecipeScheme
            recipe       = {recipe}
            recipeMeta   = {recipeMeta}
            userId       = {userId}
            editable     = {recipe.author === userId || userRole === UserRole.STAFF || userRole === UserRole.ADMIN}

            onEditRecipe = {handlePreloadRecipe}
            deleteRecipe = {deleteRecipe}
            onAddToMenuClick = {showMenuItemModal} />
        <CookingModeHandler />

        <MenuItemModal
            show={showItemModal}
            recipe={recipe}
            recipeReadonly
            onSaveSuccess={handleAddMenuItemSuccess}
            onClose={closeMenuItemModal} />
        <SaveMenuItemSuccessToast
            show = {showAddMenuItemSuccessToast}
            created
            onClose = {handleCloseAddMenuItemToast} />
      </CookingModeContextProvider>
    );
  } else {
    return (<Loading message='Loading' />);
  }
};

export default RecipeContainer;
