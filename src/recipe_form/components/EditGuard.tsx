import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as _ from 'lodash-es';

import { RootState } from '../../app/Store';
import { useSelector } from '../../common/store/redux';
import { PendingState } from '../../common/store/GenericReducerType';
import { getRoutePath } from '../../common/utility';
import UserRole from '../../common/types/UserRole';

const EditGuard: React.FC = () => {
  const params = useParams();
  const nav = useNavigate();

  const recipeSlug = params.recipe ?? '';
  const isNew = recipeSlug === 'create';

  const accountState = useSelector((state: RootState) => state.account);
  const recipeState = useSelector((state: RootState) => state.recipeForm);
  const recipe = recipeState.item;
  const { pending } = recipeState.meta;
  const wasRenderedRef = useRef<boolean>(false);

  const user = accountState.item;
  const mayEdit = user != null && (isNew || (user.id === recipe?.author || user.role === UserRole.STAFF || user.role === UserRole.ADMIN));

  useEffect(() => {
    if (user != null && pending === PendingState.COMPLETED && recipe != null && !mayEdit) {
      nav(getRoutePath(`/recipe/${recipeSlug}`));
    }
  }, [user, recipeState, mayEdit]);

  useEffect(() => {
    if (recipe?.slug != null && pending === PendingState.COMPLETED && isNew && wasRenderedRef.current) {
      setTimeout(() => {
        nav(getRoutePath(`/recipe/edit/${recipe.slug}`));
      }, 250);
    }
    wasRenderedRef.current = true;
  }, [pending]);

  const recipeMeta = recipeState.meta;
  // If recipe not found, redirect to NotFound-Page
  useEffect(() => {
    if (_.get(recipeMeta.error, 'status') === 404) {
      nav(getRoutePath('/NotFound'));
    }
  }, [recipeMeta.error]);

  return null;
};

export default EditGuard;
