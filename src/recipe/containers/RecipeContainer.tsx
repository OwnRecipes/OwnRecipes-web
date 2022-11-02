import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import * as _ from 'lodash-es';

import '../css/recipe.css';

import Loading from '../../common/components/Loading';
// import MenuItemModal from '../../menu/components/modals/MenuItemModal';
import RecipeScheme from '../components/RecipeScheme';
import { useDispatch } from '../../common/store/redux';
import * as RecipeActions from '../store/RecipeActions';
import * as RecipeFormActions from '../../recipe_form/store/actions';
// import * as MenuItemActions from '../../menu/actions/MenuItemActions';
// import { fetchRecipeList } from '../../menu/actions/RecipeListActions';
// import { menuItemValidation } from '../../menu/actions/validation';
import { CombinedStore } from '../../app/Store';
import { Recipe } from '../store/RecipeTypes';
import { getResourcePath } from '../../common/utility';
import useCrash from '../../common/hooks/useCrash';
import CookingModeContextProvider from '../context/CookingModeContextProvider';
import CookingModeHandler from '../components/CookingModeHandler';

const RecipeContainer: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const params = useParams();
  const crash = useCrash();

  const paramsRecipe = params.recipe;
  // Load Recipe
  useEffect(() => {
    if (paramsRecipe) {
      dispatch(RecipeActions.load(paramsRecipe));
      window.scrollTo(0, 0);
    }
  }, [paramsRecipe]);

  const userId = useSelector((state: CombinedStore) => state.account.item?.id);
  // TODO Lists
  // const listsState   = useSelector((state: CombinedStore) => state.lists);
  // const lists: listsState.items;
  const recipeState = useSelector((state: CombinedStore) => state.recipe);
  const recipe      = recipeState.item;
  const recipeMeta  = recipeState.meta;
  const prevRecipe  = useRef<Recipe | undefined>();

  // const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // If recipe not found, redirect to NotFound-Page
  useEffect(() => {
    if (_.get(recipeMeta.error, 'status') === 404) {
      nav(getResourcePath('/NotFound'));
    }
  }, [recipeMeta.error]);

  const recipeSlug = params.recipe ?? '';
  const showEditLink = (userId != null && userId === recipe?.author);

  const handlePreloadRecipe = () => {
    if (recipe == null) { crash('Invalid state: recipe may not be null'); return; }
    dispatch(RecipeFormActions.preload(recipe));
  };

  // const menuItemSave = useCallback(() => { /* dispatch(MenuItemActions.save() */ }, [dispatch]);
  const deleteRecipe = useCallback(() => {
    setIsDeleting(true);
    dispatch(RecipeActions.deleteRecipe(recipeSlug));
  }, [dispatch]);

  // Handle deletion
  useEffect(() => {
    if (prevRecipe.current == null) {
      prevRecipe.current = recipe;
    } else if (isDeleting && prevRecipe.current != null && recipe == null) {
      nav(getResourcePath('/browser'));
    }
  }, [recipe]);

  // componentWillUnmount
  useEffect(() => () => {
    dispatch(RecipeActions.reset());
  }, []);

  // TODO Lists
  // const bulkAdd = useCallback((listId: number) => { /* RecipeActions.bulkAdd(recipe, listId) */ }, [dispatch]);
  // const checkAllIngredients = useCallback(() => RecipeActions.checkAll(recipeSlug), [dispatch]);
  // const uncheckAllIngredients = useCallback(() => RecipeActions.unCheckAll(recipeSlug), [dispatch]);

  // const checkIngredient = useCallback((id: number, checked: boolean) => RecipeActions.checkIngredient(recipeSlug, id, checked), [dispatch]);
  // const checkSubRecipe  = useCallback((id: number, checked: boolean) => RecipeActions.checkSubRecipe(recipeSlug, id, checked), [dispatch]);

  const updateServings = useCallback((servings: number) => dispatch(RecipeActions.updateServings(recipeSlug, servings)), [dispatch]);

  if (recipe != null) {
    return (
      <CookingModeContextProvider>
        {/* TODO Lists
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

            showEditLink = {showEditLink}

            onEditRecipe = {handlePreloadRecipe}
            deleteRecipe = {deleteRecipe}

            // lists={lists}
            // onAddToMenuClick={() => setShowItemModal(true)}
            // bulkAdd={bulkAdd}
            // checkAllIngredients={checkAllIngredients}
            // uncheckAllIngredients={uncheckAllIngredients}

            // checkIngredient={checkIngredient}
            // checkSubRecipe={checkSubRecipe}

            updateServings = {updateServings} />
        <CookingModeHandler />
      </CookingModeContextProvider>
    );
  } else {
    return (<Loading message='Loading' />);
  }
};

export default RecipeContainer;
