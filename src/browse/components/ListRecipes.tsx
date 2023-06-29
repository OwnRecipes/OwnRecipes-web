import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import classNames from 'classnames';

import '../css/list-recipes.css';

import Ratings from '../../rating/components/Ratings';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { getRecipeImagePlaceholder, getResourcePath, getRoutePath } from '../../common/utility';
import Tooltip from '../../common/components/Tooltip';

export interface IListRecipes {
  data:   Array<RecipeList> | undefined;
  onOpenRecipe: (rec: RecipeList) => void;
}

function hashCode(str: string): number {
  // Code by Barak (https://stackoverflow.com/a/8831937).

  let hash = 0;
  for (let i = 0; i < str.length; ++i) {
    const char = str.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = ((hash << 5) - hash) + char;
    // eslint-disable-next-line no-bitwise
    hash &= hash;
  }

  return hash;
}

function getRecipeImage(recipe: RecipeList) {
  if (recipe.photoThumbnail) {
    return recipe.photoThumbnail;
  } else {
    const images = ['fish', 'fried-eggs', 'pizza', 'soup', 'steak'];
    const recipeImageHash = Math.abs(hashCode(recipe.title));
    return getResourcePath(`/images/${images[recipeImageHash % 5]}.jpg`);
  }
}

const ListRecipes: React.FC<IListRecipes> = ({ data, onOpenRecipe }: IListRecipes) => {
  const IMAGE_PLACEHOLDER = useMemo(() => getRecipeImagePlaceholder(), []);

  const recipes = data?.map(recipe => {
    const link = getRoutePath(`/recipe/${recipe.slug}`);
    return (
      <Col key={recipe.id}>
        <Card className={classNames('recipe')}>
          <Link to={link} onClick={() => onOpenRecipe(recipe)}>
            <Card.Img variant='top' src={getRecipeImage(recipe)} alt='' placeholder={IMAGE_PLACEHOLDER} />
            <Card.Title as='h3'><Tooltip id={recipe.slug} tooltip={recipe.title} placement='bottom' className='card-title-tooltip'>{recipe.title}</Tooltip></Card.Title>
            <div><Ratings stars={recipe.rating} /></div>
            <Card.Text>{recipe.info}</Card.Text>
          </Link>
        </Card>
      </Col>
    );
  });

  return (
    <Row xs={1} sm={2} lg={4} className='g-4 recipes-list'>
      {recipes}
    </Row>
  );
};

export default ListRecipes;
