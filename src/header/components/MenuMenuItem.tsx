import { defineMessages, useIntl } from 'react-intl';

import { getRoutePath } from '../../common/utility';
import NavLink from './NavLink';

const messages = defineMessages({
  menu: {
    id: 'nav.menu',
    description: 'menus',
    defaultMessage: 'Menu',
  },
});

const MenuMenuItem: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <NavLink to={getRoutePath('/menu')}>{formatMessage(messages.menu)}</NavLink>
  );
};

export default MenuMenuItem;
