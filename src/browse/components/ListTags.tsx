import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import '../css/list-tags.css';

import Icon from '../../common/components/Icon';
import { optionallyFormatMessage } from '../../common/utility';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import Chip from '../../common/components/Chip';

export interface IListTagsProps {
  recipe: RecipeList;
}

type renderTagType = {
  tag: string;
  icon: string;
  variant: 'light' | 'filled';
}

const RENDER_TAGS: Array<renderTagType> = [
  {
    tag: 'easy',
    icon: 'bar-chart',
    variant: 'light',
  },
  {
    tag: 'vegetarian',
    icon: 'tree',
    variant: 'light',
  },
  {
    tag: 'vegan',
    icon: 'tree',
    variant: 'filled',
  },
];

const ListTags: React.FC<IListTagsProps> = ({
    recipe }: IListTagsProps) => {
  const intl = useIntl();

  const renderTagsJsx: Array<React.ReactElement> = useMemo(() => {
    if (!recipe.oTags) return [];

    const res: Array<React.ReactElement> = [];

    const recipeTags = { ...recipe.oTags };
    if (recipeTags.vegetarian && recipeTags.vegan) {
      delete recipeTags.vegetarian;
    }

    RENDER_TAGS.forEach(t => {
      if (recipeTags?.[t.tag]) {
        res.push(
          <Chip key={`${recipe.id}-${t.tag}`}>
            <Icon icon={t.icon} variant={t.variant} />
            {optionallyFormatMessage(intl, 'tag.', t.tag)}
          </Chip>
        );
      }
    });

    return res;
  }, [recipe.oTags, intl.locale]);

  if (renderTagsJsx.length === 0) return null;

  return (
    <div className='tags-list'>
      {renderTagsJsx}
    </div>
  );
};

export default ListTags;
