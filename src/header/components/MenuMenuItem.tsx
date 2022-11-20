import { defineMessages, useIntl } from 'react-intl';

import { getRoutePath } from '../../common/utility';
import NavLink from './NavLink';

const MenuMenuItem: React.FC = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    menu: {
      id: 'nav.menu',
      description: 'menus',
      defaultMessage: 'Menu',
    },
  });

  return (
    <NavLink to={getRoutePath('/menu')}>{formatMessage(messages.menu)}</NavLink>
  );
};

export default MenuMenuItem;
