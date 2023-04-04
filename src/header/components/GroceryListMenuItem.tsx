import { useEffect } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { NavDropdown } from 'react-bootstrap';

import { getRoutePath } from '../../common/utility';
import { useDispatch, useSelector } from '../../common/store/redux';
import * as GroceryListsActions from '../../groceryList/store/GroceryListsActions';
import { RootState } from '../../app/Store';
import { NEW_ITEM_URL_ID } from '../../common/constants';
import NavLink from './NavLink';
import Chip from '../../common/components/Chip';

const GroceryListMenuItem: React.FC = () => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    grocery_list_create: {
      id: 'nav.grocery_list_create',
      description: 'Button to create a new grocery List',
      defaultMessage: 'New list',
    },
  });

  const dispatch = useDispatch();

  const groceryListsState = useSelector((state: RootState) => state.groceryLists);
  const { items } = groceryListsState;
  useEffect(() => {
    dispatch(GroceryListsActions.load());
  }, []);

  const listsJsx = items?.map(list => (
    <NavLink to={getRoutePath(`/grocery-lists/${list.slug}`)} key={list.id}>
      <span className='title'>{list.title}</span>
      <Chip variant='secondary' className='grocery-list-item-count'>{list.item_count}</Chip>
    </NavLink>
  ));
  const sumItemCount = items?.reduce((a, b) => a + b.item_count, 0);

  return (
    <NavDropdown
        id = 'grocery-lists-dropdown'
        title = {(
          <>
            <span>{intl.messages['nav.groceryLists'] as string}</span>
            {sumItemCount != null && sumItemCount > 0 && <Chip variant='secondary' className='grocery-list-item-count'>{sumItemCount}</Chip>}
          </>
        )}
        drop = 'start'
        className = 'dropdown-toggle-start grocery-lists-dropdown'>
      {listsJsx}
      {listsJsx && listsJsx.length > 0 && <NavDropdown.Divider />}
      <NavLink to={getRoutePath(`/grocery-lists/${NEW_ITEM_URL_ID}`)}>{formatMessage(messages.grocery_list_create)}</NavLink>
    </NavDropdown>

  );
};

export default GroceryListMenuItem;
