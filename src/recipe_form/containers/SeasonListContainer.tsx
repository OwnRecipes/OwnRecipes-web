import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import * as _ from 'lodash-es';

import * as RecipeGroupActions from '../../recipe_groups/store/actions';
import { RootState } from '../../app/Store';
import { useDispatch, useSelector } from '../../common/store/redux';
import useSingle from '../../common/hooks/useSingle';
import { optionallyFormatMessage } from '../../common/utility';
import { Season } from '../../recipe/store/RecipeTypes';
import ReSelect from '../../common/components/ReInput/ReSelect';
import useCrash from '../../common/hooks/useCrash';

export interface ISeasonListContainerProps {
  name: string;
  label: string;
}

const SeasonListContainer: React.FC<ISeasonListContainerProps> = ({
    name, label }: ISeasonListContainerProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const crash = useCrash();

  const fetchSeasons = useCallback(() => { dispatch(RecipeGroupActions.fetchSeasons()); }, []);
  const seasons = useSelector((state: RootState) => state.recipeGroups.seasons.items);
  useSingle(fetchSeasons, seasons);

  const data = useMemo(() => seasons
      ?.filter(s => s.title.length > 0)
      .map(s => ({ value: s.title, label: optionallyFormatMessage(intl, 'season.', s.title) })), [seasons, intl.locale]);

  const parser = useCallback((newValue: Array<string> | undefined): Array<Season> | undefined => {
    if (newValue == null) {
      return undefined;
    } else {
      const selected: Array<Season> = [];
      newValue.forEach(v => {
        const season = (seasons ?? []).find(s => s.title === v);
        if (!season) {
          crash(`Selected season does not exist! season=${JSON.stringify(season)}, seasons=${JSON.stringify(seasons ?? [])}`);
        } else {
          selected.push(season);
        }
      });

      return selected;
    }
  }, [seasons]);

  const formatter = useCallback((value: Array<Season> | Season): Array<string> | string => (
    _.castArray(value).map(v => v.title)
  ), []);

  return (
    <ReSelect
        name = {name}
        label = {label}
        data = {data}
        parser = {parser}
        formatter = {formatter}
        isMulti
        />
  );
};

export default SeasonListContainer;
