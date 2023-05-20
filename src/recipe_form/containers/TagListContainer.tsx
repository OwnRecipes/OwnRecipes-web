import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import * as RecipeGroupActions from '../../recipe_groups/store/actions';
import { RootState } from '../../app/Store';
import { useDispatch, useSelector } from '../../common/store/redux';
import useSingle from '../../common/hooks/useSingle';
import { optionallyFormatMessage, sortByLabel } from '../../common/utility';
import { Tag } from '../../recipe/store/RecipeTypes';
import ReCreatableSelect from '../../common/components/ReduxForm/ReCreatableSelect';

export interface ITagListContainerProps {
  name: string;
  label: string;
}

const TagListContainer: React.FC<ITagListContainerProps> = ({
    name, label }: ITagListContainerProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const fetchTags = useCallback(() => { dispatch(RecipeGroupActions.fetchTags()); }, []);
  const tags = useSelector((state: RootState) => state.recipeGroups.tags.items);
  useSingle(fetchTags, tags);

  const data = useMemo(() => tags
      ?.filter(t => t.title.length > 0)
      .map(t => ({ value: t.title, label: optionallyFormatMessage(intl, 'tag.', t.title) }))
      .sort(sortByLabel), [tags, intl.locale]);

  const parser = useCallback((newValue: Array<string> | undefined): Array<Tag> | undefined => {
    if (newValue == null) {
      return undefined;
    } else {
      const selected: Array<Tag> = [];
      newValue.forEach(v => {
        const tag = tags?.find(t => t.title === v);
        selected.push(tag ?? { title: v } as Tag);
      });

      return selected;
    }
  }, [tags]);

  const formatter = useCallback((value: Array<Tag> | Tag): Array<string> | string => {
    if (Array.isArray(value)) {
      return value.map(v => v.title);
    } else {
      return value.title;
    }
  }, []);

  return (
    <ReCreatableSelect
        name = {name}
        label = {label}
        data = {data}
        parser = {parser}
        formatter = {formatter}
        isMulti
        />
  );
};

export default TagListContainer;
