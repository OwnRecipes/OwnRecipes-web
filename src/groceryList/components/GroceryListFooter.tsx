import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'react-bootstrap';

import '../css/grocery_list_footer.css';

import { GroceryList } from '../store/GroceryListTypes';
import { isDemoMode } from '../../common/utility';
import { GroceryListItem } from '../store/GroceryListItemTypes';
import Icon from '../../common/components/Icon';
import Tooltip from '../../common/components/Tooltip';
import Toast from '../../common/components/Toast';

export interface IGroceryListFooterProps {
  list: GroceryList | undefined;
  isNew: boolean;
  items: Array<GroceryListItem> | undefined;
  onClearCompleted: () => void;
  isClearPending: boolean;
  onCopyToClipboard: () => void;
}

const GroceryListFooter: React.FC<IGroceryListFooterProps> = ({
    list, isNew, items, onClearCompleted, isClearPending, onCopyToClipboard }: IGroceryListFooterProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    clear_completed_tooltip: {
      id: 'grocery_list.footer.clear_completed_tooltip',
      defaultMessage: 'Clear completed',
    },
    copy_to_clipboard_tooltip: {
      id: 'grocery_list.footer.copy_to_clipboard_tooltip',
      defaultMessage: 'Copy to clipboard',
    },
    copy_to_clipboard_toast: {
      id: 'grocery_list.footer.copy_to_clipboard_toast',
      defaultMessage: 'Copied to clipboard.',
    },
  });

  const [showCopyToast, setShowCopyToast] = useState<boolean>(false);

  const handleCopyToClipboard = () => {
    onCopyToClipboard();
    setTimeout(() => {
      setShowCopyToast(true);
    }, 0);
  };
  const handleCloseCopyToast = () => { setShowCopyToast(false); };

  if (!list || isNew) return null;

  const hasCheckedItem = items?.find(i => i.completed) != null;

  return (
    <div className='grocery-list-footer print-hidden'>
      {items != null && items.length > 0 && (
        <>
          <Tooltip id='clear_completed_tooltip' tooltip={formatMessage(messages.clear_completed_tooltip)}>
            <Button
                variant  = 'primary'
                type     = 'button'
                disabled = {isDemoMode() || !hasCheckedItem || isClearPending}
                className = 'check'
                onClick = {onClearCompleted}>
              <Icon icon='check' variant='light' size='2x' />
            </Button>
          </Tooltip>
          <Tooltip id='copy_to_clipboard_tooltip' tooltip={formatMessage(messages.copy_to_clipboard_tooltip)}>
            <Button
                variant  = 'outline-primary'
                type     = 'button'
                onClick = {handleCopyToClipboard}>
              <Icon icon='clipboard' />
            </Button>
          </Tooltip>
        </>
      )}
      <Toast
          show = {showCopyToast}
          variant = 'success'
          anchorOrigin = {{ horizontal: 'center', vertical: 'bottom' }}
          onClose = {handleCloseCopyToast}>
        {formatMessage(messages.copy_to_clipboard_toast)}
      </Toast>
    </div>
  );
};

export default GroceryListFooter;
