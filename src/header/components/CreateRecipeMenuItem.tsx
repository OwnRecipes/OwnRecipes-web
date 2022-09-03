import { defineMessages, useIntl } from 'react-intl';
import { useLocation } from 'react-router';
import { useDispatch } from '../../common/store/redux';

import { getResourcePath } from '../../common/utility';
import * as RecipeActions from '../../recipe/store/RecipeActions';
import NavLink from './NavLink';

const CreateRecipeMenuItem: React.FC = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    create_recipe: {
      id: 'nav.create_recipe',
      description: 'Create recipe title',
      defaultMessage: 'Create',
    },
  });

  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = () => {
    // dispatch(RecipeActions.reset());
  };

  return (
    <NavLink to={getResourcePath('/recipe/edit/create')} active={location.pathname.endsWith('/recipe/edit/create')} accessKey='n' onClick={handleClick}>{formatMessage(messages.create_recipe)}</NavLink>
  );
};

export default CreateRecipeMenuItem;
