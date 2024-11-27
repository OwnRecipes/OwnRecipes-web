import { defineMessages, useIntl } from 'react-intl';

import Toast from '../../common/components/Toast';

const messages = defineMessages({
  add_menu_item_success_toast: {
    id: 'menu_item_modal.add_success_toast',
    description: 'Add menu item success toast',
    defaultMessage: 'Recipe added to your menu.',
  },
  save_menu_item_success_toast: {
    id: 'menu_item_modal.save_success_toast',
    description: 'Save menu item success toast',
    defaultMessage: 'Change saved.',
  },
});

export interface ISaveMenuItemSuccessToastProps {
  show: boolean;
  created?: boolean;
  onClose: () => void;
}

const SaveMenuItemSuccessToast: React.FC<ISaveMenuItemSuccessToastProps> = ({
  show, created, onClose,
}: ISaveMenuItemSuccessToastProps) => {
  const { formatMessage } = useIntl();

  return (
    <Toast
        show = {show}
        variant = 'success'
        anchorOrigin = {{ horizontal: 'center', vertical: 'bottom' }}
        onClose = {onClose}>
      {created ? formatMessage(messages.add_menu_item_success_toast) : formatMessage(messages.save_menu_item_success_toast)}
    </Toast>
  );
};

export default SaveMenuItemSuccessToast;
