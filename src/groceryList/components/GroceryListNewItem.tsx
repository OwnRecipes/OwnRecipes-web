import { useCallback, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'react-bootstrap';

import { GroceryListItemCreate } from '../store/GroceryListItemTypes';
import Input from '../../common/components/Input/Input';
import Icon from '../../common/components/Icon';
import { formatValidation, ValidationResult } from '../../common/store/Validation';

export interface IGroceryListNewItemProps {
  onAddItem: (item: GroceryListItemCreate) => Promise<ValidationResult>;
}

const GroceryListNewItem: React.FC<IGroceryListNewItemProps> = ({
    onAddItem }: IGroceryListNewItemProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    new_item_placeholder: {
      id: 'groceryList.items.new_item_placeholder',
      description: 'New item input, placeholder.',
      defaultMessage: '(New item)',
    },
  });

  const [newTitle, setNewTitle] = useState<string>('');
  const [error, setError] = useState<ValidationResult | undefined>();

  const handleAddItem = useCallback(async (newTitlee: string) => {
    onAddItem({ title: newTitlee })
        .then(() => {
          setNewTitle('');
        })
        .catch((e: ValidationResult) => { setError(e); });
  }, [onAddItem]);

  const handleAddItemClick = useCallback(() => {
    handleAddItem(newTitle);
  }, [handleAddItem, newTitle]);

  const handleLabelChange = useCallback((_name: string, newValue: string) => {
    if (newValue !== newTitle) {
      setNewTitle(newValue);
    }
  }, [newTitle]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (event.defaultPrevented || event.ctrlKey || event.shiftKey) return;
    if (event.key === 'Enter') {
      handleAddItem((event.currentTarget as HTMLInputElement).value);
    }
  }, [handleAddItem]);

  return (
    <>
      <Input
          name  = 'newItem'
          value = {newTitle}
          placeholder = {formatMessage(messages.new_item_placeholder)}
          errors      = {formatValidation(intl, error?.newItem)}
          className   = 'new-item-input grocery-list-item-margin'
          onChange    = {handleLabelChange}
          onKeyDown   = {handleKeyDown}
          />
      <Button
          variant = 'primary'
          disabled = {newTitle.length === 0}
          onClick = {handleAddItemClick}
          className = 'grocery-list-item-margin'>
        <Icon icon='arrow-right' variant='light' />
      </Button>
    </>
  );
};

export default GroceryListNewItem;
