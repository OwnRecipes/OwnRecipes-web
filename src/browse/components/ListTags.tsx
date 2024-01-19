import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import '../css/list-tags.css';

import Icon from '../../common/components/Icon';
import Tooltip from '../../common/components/Tooltip';
import { optionallyFormatMessage } from '../../common/utility';
import { RecipeList } from '../../recipe/store/RecipeTypes';

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

  if (!recipe.oTags) return null;

  const renderTagsJsx: Array<React.ReactElement> = useMemo(() => {
    const res: Array<React.ReactElement> = [];

    RENDER_TAGS.forEach(t => {
      if (recipe.oTags?.[t.tag]) {
        res.push(
          <Tooltip key={`${recipe.id}-${t.tag}`} id={`${recipe.id}-${t.tag}`} tooltip={optionallyFormatMessage(intl, 'tag.', t.tag)}>
            <Icon icon={t.icon} variant={t.variant} />
          </Tooltip>
        );
      }
    });

    return res;
  }, [recipe.oTags]);

  if (renderTagsJsx.length === 0) return null;

  return (
    <div className='tags-list'>
      {renderTagsJsx}
    </div>
  );
};

export default ListTags;
