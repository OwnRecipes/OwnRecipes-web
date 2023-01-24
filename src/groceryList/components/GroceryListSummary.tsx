import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Dropdown } from 'react-bootstrap';

import P from '../../common/components/P';
import { optionallyFormatMessage } from '../../common/utility';
import { GroceryList } from '../store/GroceryListTypes';
import { GroceryListItem } from '../store/GroceryListItemTypes';
import { GROCERY_LIST_FILTER } from '../containers/GroceryListContainer';

export interface IGroceryListSummaryProps {
  list: GroceryList | undefined;
  items: Array<GroceryListItem> | undefined;
  filter: GROCERY_LIST_FILTER;
  onChangeFilter: (newFilter: GROCERY_LIST_FILTER) => void;
}

const GroceryListSummary: React.FC<IGroceryListSummaryProps> = ({
    list, items, filter, onChangeFilter }: IGroceryListSummaryProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    groceryList_items_summary_empty: {
      id: 'groceryList.items_summary_empty',
      description: 'Summary for grocery list with no items.',
      defaultMessage: 'Empty list',
    },
    groceryList_items_summary_completed: {
      id: 'groceryList.items_summary_completed',
      description: 'Number of items, all done.',
      defaultMessage: '{sum, plural, one {# item} other {# items}}, all done 😀',
    },
    groceryList_items_summary_incompleted: {
      id: 'groceryList.items_summary_incompleted',
      description: 'Number of items, with not completed sum.',
      defaultMessage: '{sum, plural, one {# item} other {# items}}, {sum_not_completed} not completed',
    },
    groceryList_filter_by: {
      id: 'groceryList.filter_by',
      description: 'Filter items',
      defaultMessage: 'Show items: {filter}',
    },

    filter_off: {
      id: 'groceryList.filter_items.ALL',
      defaultMessage: 'All',
    },
    filter_active: {
      id: 'groceryList.filter_items.ACTIVE',
      defaultMessage: 'Not completed',
    },
    filter_completed: {
      id: 'groceryList.filter_items.COMPLETED',
      defaultMessage: 'Completed',
    },
  });

  const itemsCount = items?.length ?? 0;
  const completedCount = items?.filter(i => i.completed).length ?? 0;
  const incompletedCount = items?.filter(i => !i.completed).length ?? 0;

  const handleFilterByClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, newFilter: GROCERY_LIST_FILTER) => {
    if (filter === newFilter) {
      event.preventDefault();
    } else {
      onChangeFilter(newFilter);
    }
  }, [filter, onChangeFilter]);

  const dropdownItems = Object.values(GROCERY_LIST_FILTER).map(f => (
    <Dropdown.Item key={f} active={filter === f} onClick={(event: React.MouseEvent<HTMLAnchorElement>) => handleFilterByClick(event, f)}>
      {optionallyFormatMessage(intl, 'groceryList.filter_items.', f)}
    </Dropdown.Item>
  ));

  return (
    <div className='grocery-list-summary'>
      <P className='summary'>
        {itemsCount === 0 && formatMessage(messages.groceryList_items_summary_empty)}
        {itemsCount > 0 && completedCount === itemsCount && formatMessage(messages.groceryList_items_summary_completed, { sum: list?.item_count ?? 0 })}
        {itemsCount > 0 && incompletedCount > 0 && formatMessage(messages.groceryList_items_summary_incompleted, { sum: list?.item_count ?? 0, sum_not_completed: incompletedCount })}
      </P>
      <Dropdown className='filter-items-dropdown'>
        <Dropdown.Toggle variant='outline-primary' id='filter-items-button' disabled={list == null || list.item_count === 0}>
          {formatMessage(messages.groceryList_filter_by, { filter: optionallyFormatMessage(intl, 'groceryList.filter_items.', filter) })}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {dropdownItems}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default GroceryListSummary;
