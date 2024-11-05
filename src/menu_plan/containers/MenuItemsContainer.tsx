import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from '../../common/store/redux';
import * as MenuItemActions from '../store/MenuItemActions';
import * as MenuItemsActions from '../store/MenuItemsActions';
import * as RecipeActions from '../../recipe/store/RecipeActions';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { RootState } from '../../app/Store';
import MenuOverview from '../components/MenuOverview';
import { MenuItem } from '../store/MenuItemTypes';

export interface IMenuItemsContainerProps {
  withPast?: boolean;
  withDistantFuture?: boolean;
  onRender?: (items: Record<string, Array<MenuItem>> | undefined) => void;
}

const MenuItemsContainer: React.FC<IMenuItemsContainerProps> = ({
    ...rest }: IMenuItemsContainerProps) => {
  const dispatch = useDispatch();

  const menuItemsState = useSelector((state: RootState) => state.menuItems);
  const { items } = menuItemsState;
  useEffect(() => {
    dispatch(MenuItemsActions.load());
  }, []);

  const handleCompleteClick = useCallback((item: MenuItem) => {
    MenuItemActions.updateComplete(dispatch, item.id);
  }, []);

  const handleHideCompleted = useCallback((item: MenuItem) => {
    dispatch(MenuItemActions.hideCompleted(item.id));
  }, []);

  const handleOpenRecipe = useCallback((item: RecipeList) => {
    dispatch(RecipeActions.preload(item));
  }, []);

  const handleDelete = useCallback((item: MenuItem) => {
    dispatch(MenuItemActions.remove(item.id));
  }, []);

  return (
    <MenuOverview
        items = {items}
        pending = {menuItemsState.meta.pending}
        onCompleteClick = {handleCompleteClick}
        onHideCompleted = {handleHideCompleted}
        onOpenRecipe = {handleOpenRecipe}
        onDelete = {handleDelete}
        {...rest} />
  );
};

export default MenuItemsContainer;
