import classNames from 'classnames';
import moment from 'moment';
import { useCallback, useMemo, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import ListRecipes, { IListRecipe } from '../../browse/components/ListRecipes';
import Button from '../../common/components/Button';
import Icon from '../../common/components/Icon';
import Modal from '../../common/components/Modal';
import { Toolbar } from '../../common/components/Toolbar';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { MenuItem } from '../store/MenuItemTypes';
import MenuItemCompleteTransition from './MenuItemCompleteTransition';
import MenuItemModal from './MenuItemModal';
import SaveMenuItemSuccessToast from './SaveMenuItemSuccessToast';

const messages = defineMessages({
  mark_as_completed_button: {
    id: 'menu_item.mark_as_completed_button',
    defaultMessage: 'Mark as completed',
  },
  edit_button: {
    id: 'menu_item.edit_button',
    defaultMessage: 'Edit menu item',
  },
  delete_button: {
    id: 'menu_item.delete_button',
    defaultMessage: 'Remove menu item',
  },
  confirm_delete_message: {
    id: 'menu_item.confirm_delete',
    description: 'Are you sure you want to delete this item?',
    defaultMessage: 'Are you sure you want to delete this item?',
  },
});

export interface IMenuItemsProps {
  items: Array<MenuItem>;
  onCompleteClick: (item: MenuItem) => void;
  onHideCompleted: (item: MenuItem) => void;
  onOpenRecipe: (recipe: RecipeList) => void;
  onDelete: (item: MenuItem) => void;
}

const MenuItems: React.FC<IMenuItemsProps> = ({ items, onCompleteClick, onHideCompleted, onOpenRecipe, onDelete }: IMenuItemsProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;

  const [showItemModal, setShowItemModal] = useState<Partial<MenuItem> | undefined>(undefined);
  const handleCloseItemModal = useCallback(() => { setShowItemModal(undefined); }, []);

  const [showSaveMenuItemSuccessToast, setShowSaveMenuItemToast] = useState<string>('');
  const handleSaveMenuItemSuccess = useCallback(() => { setShowSaveMenuItemToast(showItemModal?.id == null ? 'create' : 'update'); }, [showItemModal]);
  const handleCloseSaveMenuItemToast = useCallback(() => { setShowSaveMenuItemToast(''); }, []);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<MenuItem | undefined>(undefined);
  const handleDeleteClick = useCallback((itm: MenuItem) => { setShowDeleteConfirm(itm); }, []);
  const handleDeleteClose  = useCallback(() => { setShowDeleteConfirm(undefined); }, []);
  const handleDeleteAccept = useCallback(() => { if (showDeleteConfirm) onDelete?.(showDeleteConfirm); }, [showDeleteConfirm]);

  const listRecipes: Array<IListRecipe> = useMemo(() => items.map(itm => ({
    key: String(itm.id),
    className: classNames({ completed: itm.complete, active: moment(itm.start_date).isSame(new Date(), 'day') }),
    ...itm.recipe_data,
    header: (
      <span>
        {`${moment(itm.start_date).format('dddd')} (${moment(itm.start_date).format('l')})`}
      </span>
    ),
    footer: (
      <>
        <Toolbar position='end' className='print-hidden'>
          <Button
              id = {`complete-btn-menu-item-${itm.id}`}
              variant = 'outline-primary'
              tooltip = {formatMessage(messages.mark_as_completed_button)}
              onClick = {() => onCompleteClick(itm)}
              style={{ padding: 0 }}>
            <Icon icon='check' variant='light' size='2x' />
          </Button>
          <Button
              id = {`edit-btn-menu-item-${itm.id}`}
              variant = 'outline-primary'
              tooltip = {formatMessage(messages.edit_button)}
              onClick = {() => { setShowItemModal(itm); }}>
            <Icon icon='pencil' />
          </Button>
          <Button
              id = {`delete-btn-menu-item-${itm.id}`}
              variant='outline-danger'
              className = 'menu-2x-button'
              tooltip = {formatMessage(messages.delete_button)}
              onClick = {() => handleDeleteClick(itm)}>
            <Icon icon='x' variant='light' size='2x' />
          </Button>
        </Toolbar>
        <MenuItemCompleteTransition item={itm} onHide={onHideCompleted} />
      </>
    ),
   })), [items]);

  return (
    <>
      <ListRecipes
          lg   = {4}
          data = {listRecipes}
          onOpenRecipe = {onOpenRecipe} />

      <MenuItemModal
          show     = {Boolean(showItemModal)}
          item     = {showItemModal}
          onSaveSuccess = {handleSaveMenuItemSuccess}
          onClose  = {handleCloseItemModal} />
      <SaveMenuItemSuccessToast
          show = {Boolean(showSaveMenuItemSuccessToast)}
          created = {showSaveMenuItemSuccessToast === 'create'}
          onClose = {handleCloseSaveMenuItemToast} />
      <Modal
          show = {Boolean(showDeleteConfirm)}
          title = {intl.messages['recipe.confirm_delete_title'] as string}
          acceptTitle = {intl.messages['recipe.confirm_delete_accept'] as string}
          onAccept = {handleDeleteAccept}
          onClose  = {handleDeleteClose}
          acceptButtonProps = {{ variant: 'danger' }}>
        {formatMessage(messages.confirm_delete_message)}
      </Modal>
    </>
  );
};

export default MenuItems;
