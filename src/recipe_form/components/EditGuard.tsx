import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { CombinedStore } from '../../app/Store';
import { PendingState } from '../../common/store/GenericReducerType';
import { getResourcePath } from '../../common/utility';

const EditGuard: React.FC = () => {
  const params = useParams();
  const nav = useNavigate();

  const recipeSlug = params.recipe ?? '';
  const isNew = recipeSlug === 'create';

  const accountState = useSelector((state: CombinedStore) => state.account);
  const recipeFormState = useSelector((state: CombinedStore) => state.recipeForm);
  const recipeForm = recipeFormState.item;
  const { pending } = recipeFormState.meta;

  const user = accountState.item;
  const mayEdit = user != null && (isNew || (recipeForm != null && user.id === recipeForm.author));

  useEffect(() => {
    if (user != null && pending === PendingState.COMPLETED && recipeForm != null && !mayEdit) {
      nav(getResourcePath(`/recipe/${recipeSlug}`));
    }
  }, [user, recipeFormState, recipeForm, mayEdit]);

  useEffect(() => {
    if (recipeForm == null) return;
    if (pending === PendingState.COMPLETED) {
      if (isNew) {
        nav(getResourcePath(`/recipe/edit/${recipeForm.slug}`));
      }
    }
  }, [pending]);

  return null;
};

export default EditGuard;
