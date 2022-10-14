import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Accordion } from 'react-bootstrap';

import Icon from '../../common/components/Icon';
import { optionallyFormatMessage, sortByLabel } from '../../common/utility';
import Tooltip from '../../common/components/Tooltip';
import ConditionalWrapper from '../../common/components/ConditionalWrapper';

export type RecipeFilter = {
  id:      number;
  title:   string;
  slug:    string;
  total?:  number;
  rating?: number;
}

export interface IFilterProps {
  title:   string;
  qsTitle: string;
  qs:      Record<string, string>;
  data:    Array<RecipeFilter> | undefined;
  multiSelect?: boolean;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;

  sort?: 'off' | 'on';

  cssClass?: string;
}

type EnhancedFilterData = {
  label: string;
  active: boolean;
} & RecipeFilter;

const Filter: React.FC<IFilterProps> = ({ title, qsTitle, data, qs, multiSelect, cssClass, buildUrl, sort }: IFilterProps) => {
  const intl = useIntl();

  const dataFormatted: Array<EnhancedFilterData> = useMemo(() => {
    let res = (data
      ?.map(item => {
        let active = false;
        if (qs[qsTitle]) {
          if (qs[qsTitle].split(',').includes(item.slug)) {
            active = true;
          }
        }

        if (!active && (item.total == null || item.total === 0)) {
          return undefined as unknown as EnhancedFilterData;
        }

        return ({
          ...item,
          label: optionallyFormatMessage(intl, `${qsTitle}.`, item.title),
          active: active,
        });
    }) ?? [])
    .filter(item => item != null);

    if (sort == null || sort === 'on') {
      res = res.sort(sortByLabel);
    }

    return res;
  }, [data, qs, qsTitle]);

  const items = useMemo(() => (
    dataFormatted
    .map(item => (
      <li key={item.slug}>
        <ConditionalWrapper
            condition = {item.label.length > 10}
            render = {childr => <Tooltip id={item.title} tooltip={item.label} placement='bottom' className='filter-title-tooltip'>{childr}</Tooltip>}>
          <Link to={buildUrl(qsTitle, item.slug, multiSelect)} className={classNames('list-group-item list-group-item-action', { active: item.active })}>
            <div className='name'>{item.label}</div>
            <span className='count'>{`(${item.total})`}</span>
            {item.active && <Icon icon='x-square' variant='light' />}
          </Link>
        </ConditionalWrapper>
      </li>
    )) ?? []
  ), [dataFormatted, qsTitle, multiSelect, buildUrl]);

  if (data != null && items.length === 0) return null;

  return (
    <Accordion.Item eventKey={qsTitle} className={classNames('filter-group', cssClass)}>
      <Accordion.Header as='h3' className='list-group-title'>{title}</Accordion.Header>
      <Accordion.Body as='ul' className='filter-list'>
        {items}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Filter;
