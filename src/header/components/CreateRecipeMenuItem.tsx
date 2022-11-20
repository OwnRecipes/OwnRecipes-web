import { defineMessages, useIntl } from 'react-intl';
import { useLocation } from 'react-router';

import { getRoutePath } from '../../common/utility';
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

  const location = useLocation();

  return (
    <NavLink to={getRoutePath('/recipe/edit/create')} active={location.pathname.endsWith('/recipe/edit/create')} accessKey='n'>{formatMessage(messages.create_recipe)}</NavLink>
  );
};

export default CreateRecipeMenuItem;
