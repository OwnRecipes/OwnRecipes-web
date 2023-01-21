import { ValidationResult } from '../../common/store/Validation';
import { GROCERY_LIST_FILTER } from '../containers/GroceryListContainer';
import { GroceryListItem, GroceryListItemCreate, GroceryListItemUpdate } from '../store/GroceryListItemTypes';
import { GroceryList, GroceryListCreate, GroceryListUpdate } from '../store/GroceryListTypes';
import GroceryListFooter from './GroceryListFooter';
import GroceryListHeader from './GroceryListHeader';
import GroceryListItems from './GroceryListItems';

export interface IGroceryListFCProps {
  list: GroceryList | undefined;
  isNew: boolean;
  onCreate: (item: GroceryListCreate) => Promise<ValidationResult>;
  onUpdate: (upd: GroceryListUpdate) => Promise<ValidationResult>;
  onRemove: () => void;

  items: Array<GroceryListItem> | undefined;
  filter: GROCERY_LIST_FILTER;
  onChangeFilter: (newFilter: GROCERY_LIST_FILTER) => void;

  onAddItem: (itemCreate: GroceryListItemCreate) => Promise<ValidationResult>;
  onToggleItem: (itemId: number, completed: boolean) => void;
  onToggleItems: (items: Array<GroceryListItem>, newCompleted: boolean) => void;
  onUpdateItem:  (itemId: number, upd: GroceryListItemUpdate) => Promise<ValidationResult>;
  onDeleteItem:  (itemId: number) => void;

  isClearPending: boolean;
  onClearCompleted: () => void;

  onCopyToClipboard: () => void;
}

const GroceryListFC: React.FC<IGroceryListFCProps> = ({
    list, isNew, onCreate, onUpdate, onRemove,
    items, filter, onChangeFilter,
    onAddItem, onToggleItem, onToggleItems, onUpdateItem, onDeleteItem,
    isClearPending, onClearCompleted,
    onCopyToClipboard }: IGroceryListFCProps) => { // eslint-disable-line arrow-body-style
  return (
    <>
      <GroceryListHeader
          list     = {list}
          isNew    = {isNew}
          onCreate = {onCreate}
          onUpdate = {onUpdate}
          onRemove = {onRemove}

          items    = {items}
          filter   = {filter}
          onChangeFilter = {onChangeFilter}
          />
      <GroceryListItems
          list     = {list}
          isNew    = {isNew}
          items    = {items}
          filter   = {filter}
          onAddItem     = {onAddItem}
          onToggleItem  = {onToggleItem}
          onToggleItems = {onToggleItems}
          onUpdateItem    = {onUpdateItem}
          onDeleteItem  = {onDeleteItem}
          />
      <GroceryListFooter
          list     = {list}
          isNew    = {isNew}
          items    = {items}
          isClearPending   = {isClearPending}
          onClearCompleted = {onClearCompleted}
          onCopyToClipboard = {onCopyToClipboard}
          />
    </>
  );
};

export default GroceryListFC;
