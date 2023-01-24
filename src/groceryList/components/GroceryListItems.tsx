import { useCallback, useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import '../css/grocery_list_items.css';

import { GroceryList } from '../store/GroceryListTypes';
import { GroceryListItem, GroceryListItemCreate, GroceryListItemUpdate } from '../store/GroceryListItemTypes';
import Checkbox from '../../common/components/Input/Checkbox';
import GroceryListNewItem from './GroceryListNewItem';
import GroceryListItemFC from './GroceryListItem';
import { ValidationResult } from '../../common/store/Validation';
import { GROCERY_LIST_FILTER } from '../containers/GroceryListContainer';
import P from '../../common/components/P';

export interface IGroceryListItemsProps {
  list: GroceryList | undefined;
  isNew: boolean;
  items: Array<GroceryListItem> | undefined;
  filter: GROCERY_LIST_FILTER;

  onAddItem:     (itemCreate: GroceryListItemCreate) => Promise<ValidationResult>;
  onToggleItem:  (itemId: number, completed: boolean) => void;
  onToggleItems: (items: Array<GroceryListItem>, newCompleted: boolean) => void;
  onUpdateItem:  (itemId: number, upd: GroceryListItemUpdate) => Promise<ValidationResult>;
  onDeleteItem:  (itemId: number) => void;
}

export function filterListItems(items: Array<GroceryListItem>, filter: GROCERY_LIST_FILTER): Array<GroceryListItem> {
  switch (filter) {
    case GROCERY_LIST_FILTER.ALL:
      return items;
    case GROCERY_LIST_FILTER.ACTIVE:
      return items.filter(i => !i.completed);
    case GROCERY_LIST_FILTER.COMPLETED:
      return items.filter(i => i.completed);
    default: return items;
  }
}

const GroceryListItems: React.FC<IGroceryListItemsProps> = ({
    list, isNew, items, filter, onAddItem, onToggleItem, onToggleItems, onUpdateItem, onDeleteItem }: IGroceryListItemsProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    toggle_all: {
      id: 'grocery_list.items.toggle_all',
      defaultMessage: 'Toggle all',
    },
    filtered_items_info: {
      id: 'grocery_list.items.filtered_items_info',
      defaultMessage: '({sum, plural, one {# filtered item} other {# filtered items}})',
    },
  });

  const filteredItems = useMemo(() => filterListItems(items ?? [], filter), [filterListItems, items, filter]);

  const handleToggleItemsClick = useCallback(() => {
    const allItemsCompleted = filteredItems.find(i => !i.completed) == null;
    onToggleItems(filteredItems, !allItemsCompleted);
  }, [onToggleItems, filteredItems]);

  if (!list || isNew || items == null) return null;

  const itemsJsx: Array<React.ReactNode> = filteredItems.map(i => (
    <li key={`${i.listId}-${i.id}`}>
      <GroceryListItemFC
          item = {i}
          className = 'grocery-list-flex-container'
          onToggle = {onToggleItem}
          onUpdate = {onUpdateItem}
          onDelete = {onDeleteItem}
          />
    </li>
  ));

  const hasUncheckedItem = items.find(i => !i.completed) != null;
  const numberOfHiddenItems = items.length - filteredItems.length;

  return (
    <>
      <Checkbox
          name = 'toggle-all'
          label = {formatMessage(messages.toggle_all)}
          value = {items != null && items.length > 0 && !hasUncheckedItem}
          readOnly = {items == null || filteredItems.length === 0}
          errors = {undefined} /* TODO get error from meta */
          className = 'toggle-all grocery-list-item-margin'
          onChange = {handleToggleItemsClick}
          />
      {numberOfHiddenItems > 0 && (
        <div className='grocery-list-flex-container'>
          <Checkbox
              name = 'hidden-placeholder-toggle'
              value = {false}
              disabled
              className = 'visibility-hidden'
              />
          <P className='placeholder grocery-list-item-margin'>{formatMessage(messages.filtered_items_info, { sum: numberOfHiddenItems })}</P>
        </div>
      )}
      <ul className='grocery-list-items'>
        {itemsJsx}
        <li className='print-hidden'>
          <div className='grocery-list-flex-container'>
            <Checkbox
                name = 'new-item-toggle'
                value = {false}
                disabled
                className = 'visibility-hidden'
                />
            <GroceryListNewItem
                onAddItem = {onAddItem}
                />
          </div>
        </li>
      </ul>
    </>
  );
};

export default GroceryListItems;
