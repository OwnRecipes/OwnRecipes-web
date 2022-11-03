import { Col, Row } from 'react-bootstrap';

import '../css/recipe.css';

import { Recipe } from '../store/RecipeTypes';
import { ReducerMeta } from '../../common/store/GenericReducerType';
import RecipeHeader from './RecipeHeader';
import IngredientsPanel from './IngredientsPanel';
import DirectionsPanel from './DirectionsPanel';

interface IRecipeSchemeProps {
  recipe:       Recipe | undefined;
  recipeMeta:   ReducerMeta;
  showEditLink: boolean;

  onEditRecipe: () => void;
  deleteRecipe: () => void;

  // lists: Array<any>;

  // onAddToMenuClick: () => void;
  // bulkAdd: (listId: number) => void;
  // checkAllIngredients: () => void;
  // uncheckAllIngredients: () => void;

  // checkIngredient: (id: number, checked: boolean) => void;
  // checkSubRecipe:  (id: number, checked: boolean) => void;

  updateServings: (servings: number) => void;
}

const RecipeScheme: React.FC<IRecipeSchemeProps> = ({ recipe, recipeMeta, showEditLink, onEditRecipe, deleteRecipe, updateServings }: IRecipeSchemeProps) => (
  <div className='recipe-details'>
    <RecipeHeader
        recipe = {recipe}
        showEditLink = {showEditLink}
        onEditRecipe = {onEditRecipe}
        // onAddToMenuClick={props.onAddToMenuClick}
        deleteRecipe = {deleteRecipe} />

    <hr />

    <Row>
      <Col xl={4} lg={12}>
        <IngredientsPanel
            recipe = {recipe}
            recipeMeta = {recipeMeta}

            // lists = {lists}

            // bulkAdd = {bulkAdd}
            // checkAllIngredients = {checkAllIngredients}
            // uncheckAllIngredients = {uncheckAllIngredients}

            // checkIngredient = {checkIngredient}
            // checkSubRecipe = {checkSubRecipe}

            updateServings = {updateServings} />
      </Col>
      <hr className='d-block d-xl-none' />
      <Col xl={8} lg={12}>
        <DirectionsPanel
            directions  = {recipe?.directions ?? ''}
            recipeMeta  = {recipeMeta}
            ingredients = {recipe?.ingredientGroups ?? []} />
      </Col>
    </Row>
  </div>
);

export default RecipeScheme;
