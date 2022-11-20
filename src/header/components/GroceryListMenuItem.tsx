import { useIntl, defineMessages } from 'react-intl';
import { NavDropdown } from 'react-bootstrap';

import { getRoutePath } from '../../common/utility';

export type ListItemType = {
  id:    string;
  title: string;
  slug:  string;
}

export interface IGroceryListMenuItemProps {
  data: Array<ListItemType> | undefined;
}

const GroceryListMenuItem: React.FC<IGroceryListMenuItemProps> = (props: IGroceryListMenuItemProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    grocery_list: {
      id: 'nav.grocery_list',
      description: 'Grocery List',
      defaultMessage: 'Grocery List',
    },
  });

  const lists = props.data?.map(list => (
    <NavDropdown.Item href={getRoutePath(`/list/${list.slug}`)} key={list.id}>
      {list.title}
    </NavDropdown.Item>
  ));

  return (
    <NavDropdown
        title={formatMessage(messages.grocery_list)}
        id='basic-nav-dropdown'>
      {lists}
      {props.data != null && props.data.length > 0 && <NavDropdown.Divider />}
      <NavDropdown.Item href={getRoutePath('/list')}>{formatMessage(messages.grocery_list)}</NavDropdown.Item>
    </NavDropdown>

  );
};

export default GroceryListMenuItem;
