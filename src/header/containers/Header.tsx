// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import NavBar from '../components/NavBar';
import * as AuthActions from '../../account/store/actions';
// import * as ListActions from '../../list/store/actions';
import * as RandomRecipeActions from '../actions/RandomRecipeActions';
import { CombinedStore } from '../../app/Store';
import { ListItemType } from '../components/GroceryListMenuItem';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const accountState = useSelector((state: CombinedStore) => state.account);
  // const listState = useSelector((state: CombinedStore) => state.list.lists);
  const listState: Array<ListItemType> = [];

  /* TODO
  useEffect(() => {
    dispatch(ListActions.load());
  }, []); */

  const handleLogoutClick = () => {
    dispatch(AuthActions.logUserOut());
  };

  const handleRandomRecipe = () => {
    dispatch(RandomRecipeActions.randomRecipe(nav));
  };

  return (
    <NavBar
        isAuthenticated={accountState.item != null && accountState.item.id !== 0}
        lists={listState}

        onLogoutClick={handleLogoutClick}
        onRandomRecipeClick={handleRandomRecipe} />
  );
};

export default Header;