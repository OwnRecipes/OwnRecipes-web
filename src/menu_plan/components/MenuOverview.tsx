import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Col } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import moment from 'moment';
import classNames from 'classnames';

import '../css/menu.css';

import { PendingState } from '../../common/store/GenericReducerType';
import P from '../../common/components/P';
import Loading from '../../common/components/Loading';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import Button from '../../common/components/Button';
import { Toolbar } from '../../common/components/Toolbar';
import Icon from '../../common/components/Icon';
import { MenuItem } from '../store/MenuItemTypes';
import MenuItems from './MenuItems';

const messages = defineMessages({
  no_items: {
    id: 'menu.no_items',
    description: 'Info that the user has no item on the menu.',
    defaultMessage: '(You don\'t have any item on your menu.)',
  },
  force_show_previous_button: {
    id: 'menu.force_show_previous_button',
    description: 'Show previous weeks button',
    defaultMessage: 'Show previous weeks',
  },
  section_this_week: {
    id: 'menu.section_this_week_heading',
    description: 'Heading of the "This week (...)" section',
    defaultMessage: 'This Week ({title})',
  },
  section_next_week: {
    id: 'menu.section_next_week_heading',
    description: 'Heading of the "Next week (...)" section',
    defaultMessage: 'Next Week ({title})',
  },
  section_last_week: {
    id: 'menu.section_last_week_heading',
    description: 'Heading of the "Last week (...)" section',
    defaultMessage: 'Last Week ({title})',
  },
});

export interface IMenuOverviewProps {
  items:   Array<MenuItem> | undefined;
  pending: PendingState;
  withPast?: boolean;
  withDistantFuture?: boolean;
  className?: string;
  onRender?: (groups: Record<string, Array<MenuItem>> | undefined) => void;
  onCompleteClick: (item: MenuItem) => void;
  onHideCompleted: (item: MenuItem) => void;
  onOpenRecipe: (recipe: RecipeList) => void;
  onDelete: (item: MenuItem) => void;
}

function sortMenuItemsAsc(a: MenuItem, b: MenuItem) {
  return moment(a.start_date).diff(moment(b.start_date));
}

function filterMenuItems(items: Array<MenuItem> | undefined, withPast: boolean, withDistantFuture: boolean): Array<MenuItem> | undefined {
  if (!items) return items;

  const thisWeekStart = moment().startOf('week');

  let res = items;
  if (!withPast) {
    res = res.filter(itm => moment(itm.start_date).diff(thisWeekStart) >= 0);
  }
  if (!withDistantFuture) {
    const nextWeekStart = moment().add(2, 'week').startOf('week');
    res = res.filter(itm => moment(itm.start_date).diff(nextWeekStart) < 0);
  }

  return res;
}

const MenuOverview: React.FC<IMenuOverviewProps> = ({
    items, pending, withPast = true, withDistantFuture = true, className,
    onRender, onCompleteClick, onHideCompleted, onOpenRecipe, onDelete, ...rest }: IMenuOverviewProps) => {
  const { formatMessage } = useIntl();

  const [forceShowPrevious, setForceShowPrevious] = useState<boolean>(false);
  const handleShowPreviousClick = useCallback(() => { setForceShowPrevious(true); }, []);

  const groups: Record<string, Array<MenuItem>> | undefined = useMemo(() => {
    const itemsSorted = items?.sort(sortMenuItemsAsc);
    const itemsFiltered = filterMenuItems(itemsSorted, withPast || forceShowPrevious, withDistantFuture);

    const nextWeek = moment().add(1, 'week').startOf('week').format('MMMM D');
    const thisWeek = moment().startOf('week').format('MMMM D');
    const lastWeek = moment().subtract(1, 'week').startOf('week').format('MMMM D');

    const res = itemsFiltered?.reduce((acc, menuItem) => {
      const date = menuItem.start_date;
      const weekStart = moment(date).startOf('week').format('MMMM D');
      const weekEnd = moment(date).endOf('week').format('MMMM D');

      let title = `${weekStart} - ${weekEnd}`;
      if (thisWeek === weekStart) {
        title = formatMessage(messages.section_this_week, { title: title });
      } else if (nextWeek === weekStart) {
        title = formatMessage(messages.section_next_week, { title: title });
      } else if (lastWeek === weekStart) {
        title = formatMessage(messages.section_last_week, { title: title });
      }

      if (typeof acc[title] === 'undefined') {
        acc[title] = [];
      }
      acc[title].push(menuItem);
      return acc;
    }, {} as Record<string, Array<MenuItem>>);

    return res;
  }, [items, withPast, withDistantFuture, forceShowPrevious, formatMessage]);

  const hasNoData = pending === PendingState.COMPLETED
      && (items == null || items.length === 0 || groups == null || Object.keys(groups).length === 0);

  useEffect(() => {
    onRender?.(groups);
  }, [groups]);

  return (
    <div className={classNames('menu-plan', className)} {...rest}>
      {pending === PendingState.LOADING && (items == null || items.length === 0) && <Loading />}
      {hasNoData && (
        <P className='placeholder'>{formatMessage(messages.no_items)}</P>
      )}

      {withPast && !forceShowPrevious && (
        <Toolbar position='center'>
          <Button id='show-previous-menu-items-button' variant='outline-primary' onClick={handleShowPreviousClick}>
            <Icon icon='arrow-up' variant='light' style={{ marginRight: '0.25em' }} />
            {formatMessage(messages.force_show_previous_button)}
          </Button>
        </Toolbar>
      )}

      {groups && items && items.length > 0 && (
        <Col xs={12} className='recipes'>
          {Object.keys(groups).map(key => (
            <Fragment key={key}>
              <h3 className='page-header'>{key}</h3>
              <MenuItems
                  items = {groups[key]}
                  onCompleteClick = {onCompleteClick}
                  onHideCompleted = {onHideCompleted}
                  onOpenRecipe    = {onOpenRecipe}
                  onDelete        = {onDelete} />
            </Fragment>
          ))}
        </Col>
      )}
    </div>
  );
};

export default MenuOverview;
