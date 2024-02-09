import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { useDispatch, useSelector } from '../../common/store/redux';
import * as GroceryListActions from '../store/GroceryListActions';
import * as GroceryListItemActions from '../store/GroceryListItemActions';
import * as GroceryListItemsActions from '../store/GroceryListItemsActions';
import { RootState } from '../../app/Store';
import { GroceryList, GroceryListCreate, GroceryListUpdate } from '../store/GroceryListTypes';
import GroceryListFC from '../components/GroceryList';
import useCrash from '../../common/hooks/useCrash';
import { copyToClipboard, getRoutePath } from '../../common/utility';
import { GroceryListItem, GroceryListItemCreate, GroceryListItemUpdate } from '../store/GroceryListItemTypes';

export interface IGroceryListContainerProps {
  isNew: boolean;
}

export enum GROCERY_LIST_FILTER {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

function toClipboardText(list: GroceryList, items: Array<GroceryListItem>): string {
  const titleText = `${list.title}:`;
  const itemsText = items
      .map(i => `${i.completed ? '[x]' : '[ ]'} ${i.title}`)
      .join('\n');

  return `${titleText}\n${itemsText}`;
}

const GroceryListContainer: React.FC<IGroceryListContainerProps> = ({
    isNew }: IGroceryListContainerProps) => {
  const dispatch = useDispatch();
  const crash = useCrash();
  const nav = useNavigate();

  const groceryListState = useSelector((state: RootState) => state.groceryList);
  const { item: list } = groceryListState;
  const listSlug = list?.slug;
  const prevList = useRef<GroceryList | undefined>();

  const groceryListItemsState = useSelector((state: RootState) => state.groceryListItems);
  const { items: listItems } = groceryListItemsState;
  const prevListItems = useRef<Array<GroceryListItem> | undefined>();

  const [filter, setFilter] = useState<GROCERY_LIST_FILTER>(GROCERY_LIST_FILTER.ALL);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  const createList = useCallback(async (listCreate: GroceryListCreate) => GroceryListActions.create(dispatch, listCreate), []);
  const updateList = useCallback(async (upd: GroceryListUpdate) => GroceryListActions.update(dispatch, listSlug ?? '', upd), [listSlug]);
  const removeList = useCallback(() => {
    if (list?.id == null) { crash('Invalid state: list item may not be null'); return; }
    setIsDeleting(true);
    dispatch(GroceryListActions.remove(list.id, listSlug ?? ''));
  }, [list?.id, listSlug]);

  const clearCompleted = useCallback(() => {
    if (list?.id == null) { crash('Invalid state: list item may not be null'); return; }
    setIsClearing(true);
    const completedItems = listItems?.filter(i => i.completed) ?? [];
    GroceryListItemsActions.clearCompleted(dispatch, list.id, completedItems)
      .then(() => {
        setIsClearing(false);
      });
  }, [list?.id, listItems]);

  const addItem = useCallback(async (itemCreate: GroceryListItemCreate) => (
    GroceryListItemActions.create(dispatch, list?.id ?? 0, itemCreate)
  ), [list?.id]);

  const toggleItem = useCallback((itemId: number, completed: boolean) => {
    if (list?.id == null) { crash('Invalid state: list item may not be null'); return; }
    // setIsToggling(true);
    dispatch(GroceryListItemActions.toggleItem(list.id, itemId, completed));
  }, [list?.id]);

  const toggleItems = useCallback((items: Array<GroceryListItem>, newCompleted: boolean) => {
    if (list?.id == null || listItems == null) { crash('Invalid state: list item may not be null'); return; }
    // setIsToggling(true);
    dispatch(GroceryListItemsActions.toggleItems(list.id, items, newCompleted));
  }, [list?.id, listItems]);

  const updateItem = useCallback(async (itemId: number, update: GroceryListItemUpdate) => {
    if (list?.id == null) { crash('Invalid state: list item may not be null'); return undefined; }
    return GroceryListItemActions.update(dispatch, list.id, itemId, update);
  }, [list?.id]);

  const removeItem = useCallback((itemId: number) => {
    if (list == null) { crash('Invalid state: list item may not be null'); return; }
    // setIsDeletingItem(true);
    dispatch(GroceryListItemActions.remove(list.id, itemId));
  }, [list]);

  // Handle deletion
  useEffect(() => {
    if (prevList.current == null) {
      prevList.current = list;
    } else if (isDeleting && prevList.current != null && list == null) {
      nav(getRoutePath('/grocery-lists'));
    }
  }, [list]);

  // Handle clear
  useEffect(() => {
    if (prevListItems.current == null) {
      prevListItems.current = listItems;
    } else if (isClearing) {
      setIsClearing(false);
    }
  }, [listItems]);

  const handleCopyToClipboard = useCallback(() => {
    if (list == null) { crash('Invalid state: list item may not be null'); return; }
    const text = toClipboardText(list, listItems ?? []);
    copyToClipboard(text);
  }, [list, listItems]);

  return (
    <GroceryListFC
        list     = {list}
        isNew    = {isNew}
        onCreate = {createList}
        onUpdate = {updateList}
        onRemove = {removeList}

        items    = {listItems}
        filter   = {filter}
        onChangeFilter = {setFilter}

        onAddItem     = {addItem}
        onToggleItem  = {toggleItem}
        onToggleItems = {toggleItems}
        onUpdateItem  = {updateItem}
        onDeleteItem  = {removeItem}

        isClearPending = {isClearing}
        onClearCompleted = {clearCompleted}

        onCopyToClipboard = {handleCopyToClipboard}
        />
  );
};

export default GroceryListContainer;
