import { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import classNames from 'classnames';
import { Row } from 'react-bootstrap';

import '../css/grocery_lists.css';

import { useDispatch, useSelector } from '../../common/store/redux';
import * as GroceryListsActions from '../store/GroceryListsActions';
import { RootState } from '../../app/Store';
import { PendingState } from '../../common/store/GenericReducerType';
import Loading from '../../common/components/Loading';
import P from '../../common/components/P';
import { getRoutePath } from '../../common/utility';
import { NEW_ITEM_URL_ID } from '../../common/constants';
import Chip from '../../common/components/Chip';
import NavLink from '../../header/components/NavLink';
import NavButton from '../../common/components/NavButton';

const messages = defineMessages({
  my_grocery_lists: {
    id: 'groceryLists.my_grocery_lists',
    description: 'My grocery lists heading',
    defaultMessage: 'My grocery lists',
  },
  no_grocery_lists: {
    id: 'groceryLists.no_grocery_lists',
    description: 'Info that the user has no grocery list.',
    defaultMessage: '(You don\'t have any grocery list, yet.)',
  },
});

const GroceryListsContainer: React.FC = () => {
  const intl = useIntl();
  const { formatMessage } = intl;

  const dispatch = useDispatch();

  const groceryListsState = useSelector((state: RootState) => state.groceryLists);
  const { items } = groceryListsState;
  useEffect(() => {
    dispatch(GroceryListsActions.load());
  }, []);

  const listsJsx = items?.map(list => (
    <li key={list.slug}>
      <NavLink to={getRoutePath(`/grocery-lists/${list.slug}`)} key={list.slug}>
        {list.title}
        <Chip color='secondary'>{list.item_count}</Chip>
      </NavLink>
    </li>
  )) ?? [];

  const pending = groceryListsState.meta.pending;
  const hasNoData = pending === PendingState.COMPLETED
      && (items == null || items.length === 0);

  return (
    <>
      <Row xs={1} className='groceries-header-container'>
        <h1>{formatMessage(messages.my_grocery_lists)}</h1>
      </Row>
      <Row xs={1} className='grocery-list-container'>
        <div className={classNames('grocery-lists')}>
          {pending === PendingState.LOADING && (items == null || items.length === 0) && <Loading />}
          {hasNoData && (
            <P className='placeholder'>{formatMessage(messages.no_grocery_lists)}</P>
          )}
          <ul>
            {listsJsx}
          </ul>
          <hr />
          <NavButton id='create-new-grocery-list' variant='outline-primary' to={getRoutePath(`/grocery-lists/${NEW_ITEM_URL_ID}`)}>
            {intl.messages['nav.grocery_list_create'] as string}
          </NavButton>
        </div>
      </Row>
    </>
  );
};

export default GroceryListsContainer;
