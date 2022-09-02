import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import { CombinedStore } from '../../app/Store';
import { getResourcePath, isDemoMode } from '../../common/utility';
import { PendingState } from '../../common/store/GenericReducerType';

const RecipeFormToolbar: React.FC = () => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    submit: {
      id: 'recipe.create.submit',
      description: 'Submit recipe button',
      defaultMessage: 'Submit recipe',
    },
    save: {
      id: 'recipe.create.save',
      description: 'Save recipe button',
      defaultMessage: 'Save',
    },
    view: {
      id: 'recipe.create.view',
      description: 'View recipe button',
      defaultMessage: 'View',
    },
  });

  const recipeFormState = useSelector((state: CombinedStore) => state.recipeForm);

  const id = recipeFormState.item?.id;
  const isNew = id == null || id === 0;
  const showViewButton = !isNew && !recipeFormState.meta.dirty && recipeFormState.item?.slug != null;

  return (
    <Button
        variant  = 'primary'
        type     = {showViewButton ? 'button' : 'submit'}
        disabled = {recipeFormState.meta.pending === PendingState.SAVING || (isDemoMode() && !showViewButton)}
        as = {showViewButton ? Link as any : undefined} // eslint-disable-line @typescript-eslint/no-explicit-any
        to = {showViewButton ? getResourcePath(`/recipe/${recipeFormState.item?.slug}`) : null}
        accessKey = {showViewButton ? undefined : 's'}>
      {formatMessage(showViewButton ? messages.view : messages.submit)}
    </Button>
  );
};

export default RecipeFormToolbar;
