import { Col, Row } from 'react-bootstrap';

import '../css/recipe.css';

import { Recipe } from '../store/RecipeTypes';
import { ReducerMeta } from '../../common/store/GenericReducerType';
import IngredientsPanelContainer from '../containers/IngredientsPanelContainer';
import RecipeHeader from './RecipeHeader';
import DirectionsPanel from './DirectionsPanel';

interface IRecipeSchemeProps {
  recipe:       Recipe | undefined;
  recipeMeta:   ReducerMeta;
  userId:       number | undefined;

  onEditRecipe: () => void;
  deleteRecipe: () => void;

  // lists: Array<any>;
  // onAddToMenuClick: () => void;
}

const RecipeScheme: React.FC<IRecipeSchemeProps> = ({ recipe, recipeMeta, userId, onEditRecipe, deleteRecipe }: IRecipeSchemeProps) => (
  <div className='recipe-details'>
    <RecipeHeader
        recipe = {recipe}
        userIsAuthor = {userId != null && userId === recipe?.author}
        onEditRecipe = {onEditRecipe}
        // onAddToMenuClick={props.onAddToMenuClick}
        deleteRecipe = {deleteRecipe} />

    <hr />

    <Row>
      <Col xl={4} lg={12}>
        <IngredientsPanelContainer
            recipe     = {recipe}
            recipeMeta = {recipeMeta}
            userId     = {userId}
            />
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
