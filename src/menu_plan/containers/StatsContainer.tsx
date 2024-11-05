import { useEffect } from 'react';

import { useDispatch, useSelector } from '../../common/store/redux';
import * as MenuStatsActions from '../store/MenuStatsActions';
import { RootState } from '../../app/Store';
import Stats from '../components/Stats';

const StatsContainer: React.FC = () => {
  const dispatch = useDispatch();

  const menuStatsState = useSelector((state: RootState) => state.menuStats);
  const { items } = menuStatsState;

  useEffect(() => {
    dispatch(MenuStatsActions.load());
  }, []);

  return (
    <Stats stats={items} pending={menuStatsState.meta.pending} />
  );
};

export default StatsContainer;
