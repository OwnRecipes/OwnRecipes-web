import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import { CombinedStore } from '../../app/Store';
import { useDispatch, useSelector } from '../../common/store/redux';
import { getResourcePath, isDemoMode } from '../../common/utility';
import * as RecipeActions from '../../recipe/store/RecipeActions';
import { FormSpy } from 'react-final-form';

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

  const dispatch = useDispatch();

  const recipeState = useSelector((state: CombinedStore) => state.recipeForm);

  const preload = () => { if (recipeState.item) dispatch(RecipeActions.preload(recipeState.item)); };

  const id = recipeState.item?.id;
  const isNew = id == null || id === 0;

  // eslint-disable-next-line arrow-body-style
  const showViewButton = (pristine: boolean) => {
    return !isNew && pristine;
  };

  return (
    <FormSpy subscription={{ pristine: true, submitting: true }}>
      {({ pristine, submitting }) => (
        <Button
            variant  = 'primary'
            type     = {showViewButton(pristine) ? 'button' : 'submit'}
            disabled = {submitting || (isDemoMode() && !showViewButton)}
            as = {showViewButton(pristine) ? Link as any : undefined} // eslint-disable-line @typescript-eslint/no-explicit-any
            to = {showViewButton(pristine) ? getResourcePath(`/recipe/${recipeState.item?.slug}`) : null}
            onClick = {preload}
            accessKey = {showViewButton(pristine) ? undefined : 's'}>
          {formatMessage(showViewButton(pristine) ? messages.view : messages.submit)}
        </Button>
      )}
    </FormSpy>
  );
};

export default RecipeFormToolbar;
