import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import * as _ from 'lodash-es';

import * as RecipeGroupActions from '../../recipe_groups/store/actions';
import { useDispatch, useSelector } from '../../common/store/redux';
import { RootState } from '../../app/Store';
import useSingle from '../../common/hooks/useSingle';
import { optionallyFormatMessage } from '../../common/utility';
import { Season } from '../../recipe/store/RecipeTypes';
import ReCreatableSelect from '../../common/components/ReduxForm/ReCreatableSelect';

export interface ISeasonSelectContainerProps {
  name: string;
  label: string;
}

const SeasonSelectContainer: React.FC<ISeasonSelectContainerProps> = ({
    name, label }: ISeasonSelectContainerProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const fetchSeasons = useCallback(() => { dispatch(RecipeGroupActions.fetchSeasons()); }, []);
  const seasons = useSelector((state: RootState) => state.recipeGroups.seasons.items);
  useSingle(fetchSeasons, seasons);

  const data = useMemo(() => seasons
      ?.map(c => ({ value: c.title, label: optionallyFormatMessage(intl, 'season.', c.title) })), [seasons, intl.locale]);

  const parser = useCallback((newValue: string | undefined): Season | undefined => {
    if (newValue == null) {
      return undefined;
    } else {
      return seasons?.find(c => c.title === newValue) ?? { title: newValue } as Season;
    }
  }, [seasons]);

  const formatter = useCallback((value: Array<Season> | Season): Array<string> | string => (
    _.castArray(value).map(v => v.title)
  ), []);

  return (
    <ReCreatableSelect
        name = {name}
        label = {label}
        data = {data}
        parser = {parser}
        formatter = {formatter}
        />
  );
};

export default SeasonSelectContainer;
