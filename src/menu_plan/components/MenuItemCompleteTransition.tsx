import { useCallback, useEffect } from 'react';

import '../css/menu_item_complete_transition.css';

import Button from '../../common/components/Button';
import Icon from '../../common/components/Icon';
import { MenuItem } from '../store/MenuItemTypes';

export interface IMenuItemCompleteTransitionProps {
  item: MenuItem;
  onHide: (item: MenuItem) => void;
}

const MenuItemCompleteTransition: React.FC<IMenuItemCompleteTransitionProps> = ({ item, onHide }: IMenuItemCompleteTransitionProps) => {
  useEffect(() => {
    if (item.complete) {
      setTimeout(() => {
        onHide(item);
      }, 3500);
    }
  }, [item.complete]);

  const handleHideClick = useCallback(() => {
    onHide(item);
  }, [item, onHide]);

  if (!item.complete) return null;

  return (
    <Button id={`hide-completed-menu-item-${item.id}`} className='menu-item-complete-transition' variant='transparent' onClick={handleHideClick}>
      <Icon icon='check' variant='light' />
    </Button>
  );
};

export default MenuItemCompleteTransition;
