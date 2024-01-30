import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import * as _ from 'lodash-es';

import * as RecipeGroupActions from '../../recipe_groups/store/actions';
import { useDispatch, useSelector } from '../../common/store/redux';
import { RootState } from '../../app/Store';
import useSingle from '../../common/hooks/useSingle';
import { optionallyFormatMessage, sortByLabel } from '../../common/utility';
import { Cuisine } from '../../recipe/store/RecipeTypes';
import ReCreatableSelect from '../../common/components/ReduxForm/ReCreatableSelect';

export interface ICuisineSelectContainerProps {
  name: string;
  label: string;
}

const CuisineSelectContainer: React.FC<ICuisineSelectContainerProps> = ({
    name, label }: ICuisineSelectContainerProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const fetchCuisines = useCallback(() => { dispatch(RecipeGroupActions.fetchCuisines()); }, []);
  const cuisines = useSelector((state: RootState) => state.recipeGroups.cuisines.items);
  useSingle(fetchCuisines, cuisines);

  const data = useMemo(() => cuisines
      ?.map(c => ({ value: c.title, label: optionallyFormatMessage(intl, 'cuisine.', c.title) }))
      .sort(sortByLabel), [cuisines, intl.locale]);

  const parser = useCallback((newValue: string | undefined): Cuisine | undefined => {
    if (newValue == null) {
      return undefined;
    } else {
      return cuisines?.find(c => c.title === newValue) ?? { title: newValue ?? '' } as Cuisine;
    }
  }, [cuisines]);

  const formatter = useCallback((value: Array<Cuisine> | Cuisine): Array<string> | string => (
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

export default CuisineSelectContainer;
