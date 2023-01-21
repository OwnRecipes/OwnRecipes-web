import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as _ from 'lodash-es';

import { CombinedStore } from '../../app/Store';
import { useDispatch, useSelector } from '../../common/store/redux';
import * as GroceryListActions from '../store/GroceryListActions';
import * as GroceryListItemsActions from '../store/GroceryListItemsActions';
import PageWrapper from '../../common/components/PageWrapper';
import { getResourcePath } from '../../common/utility';
import GroceryListContainer from './GroceryListContainer';
import { defineMessages, useIntl } from 'react-intl';

const GroceryListPage: React.FC = () => {
  const intl = useIntl();
  const messages = defineMessages({
    new_grocery_list: {
      id: 'grocery_list.new_grocery_list',
      description: 'New GroceryList documentTitle',
      defaultMessage: 'New grocery list',
    },
  });

  const params = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const groceryListState  = useSelector((state: CombinedStore) => state.groceryList);
  const groceryListMeta   = groceryListState.meta;
  const groceryListItemsState  = useSelector((state: CombinedStore) => state.groceryListItems);
  const groceryListItemsMeta   = groceryListItemsState.meta;

  const listSlug = params.list;
  const isNew = listSlug === 'create';
  // Load GroceryList
  useEffect(() => {
    if (listSlug) {
      window.scrollTo(0, 0);
      if (isNew) {
        dispatch(GroceryListActions.reset());
        dispatch(GroceryListItemsActions.reset());
      } else {
        dispatch(GroceryListActions.load(listSlug));
      }
    }
  }, [listSlug]);

  useEffect(() => {
    if (groceryListState.item?.id && !isNew) {
      dispatch(GroceryListItemsActions.load(groceryListState.item.id));
    }
  }, [groceryListState.item?.id]);

  // If list not found, redirect to lists
  useEffect(() => {
    if (_.get(groceryListMeta.error, 'status') === 404) {
      nav(getResourcePath('/grocery-lists'));
    }
  }, [groceryListMeta.error]);

  // If list not found, redirect to lists
  useEffect(() => {
    if (_.get(groceryListItemsMeta.error, 'status') === 404) {
      nav(getResourcePath('/grocery-lists'));
    }
  }, [groceryListItemsMeta.error]);

  // componentWillUnmount
  useEffect(() => () => {
    dispatch(GroceryListActions.reset());
    dispatch(GroceryListItemsActions.reset());
  }, []);

  return (
    <PageWrapper title={isNew ? intl.formatMessage(messages.new_grocery_list) : groceryListState.item?.title}>
      <GroceryListContainer isNew={isNew} />
    </PageWrapper>
  );
};

export default GroceryListPage;
