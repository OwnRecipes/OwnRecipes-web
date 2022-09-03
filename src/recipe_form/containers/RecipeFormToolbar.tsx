import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import { CombinedStore } from '../../app/Store';
import { getResourcePath, isDemoMode } from '../../common/utility';
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

  const recipeState = useSelector((state: CombinedStore) => state.recipe);

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
            accessKey = {showViewButton(pristine) ? undefined : 's'}>
          {formatMessage(showViewButton(pristine) ? messages.view : messages.submit)}
        </Button>
      )}
    </FormSpy>
  );
};

export default RecipeFormToolbar;
