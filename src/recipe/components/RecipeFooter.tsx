import { useIntl } from 'react-intl';

import { RootState } from '../../app/Store';
import { useSelector } from '../../common/store/redux';
import { Recipe } from '../store/RecipeTypes';
import MiniBrowse from '../../browse/containers/MiniBrowse';
import ErrorBoundary from '../../common/components/ErrorBoundary';

export interface IRecipeFooterProps {
  recipe?: Recipe;
}

function getFilters(recipe: Recipe): Record<string, string> | undefined {
  const res: Record<string, string> = {};
  if (recipe.course) {
    res.course__slug = recipe.course.title;
  }
  if (recipe.cuisine) {
    res.cuisine__slug = recipe.cuisine.title;
  }
  return Object.keys(res).length > 0 ? res : undefined;
}

const RecipeFooter: React.FC<IRecipeFooterProps> = ({ recipe }: IRecipeFooterProps) => {
  const intl = useIntl();

  const miniBrowseMeta = useSelector((state: RootState) => state.browse.browserMini.meta);

  if (!miniBrowseMeta.hasConnection || miniBrowseMeta.error
      || !recipe?.author) return null;

  return (
    <ErrorBoundary verbose printStack>
      <hr />
      <article className='recipe-footer'>
        <MiniBrowse
            heading = {intl.messages['nav.home.recommended_recipes_title'] as string}
            count = {4}
            filters = {getFilters(recipe)} />
      </article>
    </ErrorBoundary>
  );
};

export default RecipeFooter;
