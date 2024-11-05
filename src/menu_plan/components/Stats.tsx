import moment from 'moment';
import { defineMessages, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import '../css/stats.css';

import { MenuStat } from '../store/MenuStatsTypes';
import { PendingState } from '../../common/store/GenericReducerType';
import P from '../../common/components/P';
import Loading from '../../common/components/Loading';
import { getRoutePath } from '../../common/utility';

const messages = defineMessages({
  stats_recipe: {
    id: 'stats.recipe',
    description: 'Recipe column heading',
    defaultMessage: 'Recipe',
  },
  stats_count: {
    id: 'stats.count',
    description: 'Count column heading',
    defaultMessage: 'Count',
  },
  stats_last_made: {
    id: 'stats.last_made',
    description: 'Last Made column heading',
    defaultMessage: 'Last Made',
  },
  no_stats: {
    id: 'stats.no_stats',
    description: 'Info that the user has not completed any menu item.',
    defaultMessage: '(You don\'t have a record of completed items.)',
  },
});

export interface IStatsProps {
  stats:   Array<MenuStat> | undefined;
  pending: PendingState;
}

const Stats: React.FC<IStatsProps> = ({ stats, pending }: IStatsProps) => {
  const { formatMessage } = useIntl();

  const hasNoData = pending === PendingState.COMPLETED
      && (stats == null || stats.length === 0);

  return (
    <>
      {pending === PendingState.LOADING && (stats == null || stats.length === 0) && <Loading />}
      {hasNoData && (
        <P className='placeholder'>{formatMessage(messages.no_stats)}</P>
      )}

      {stats && stats.length > 0 && (
        <Table striped id='stats-table'>
          <thead>
            <tr>
              <th>{formatMessage(messages.stats_recipe)}</th>
              <th>{formatMessage(messages.stats_count)}</th>
              <th>{formatMessage(messages.stats_last_made)}</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(row => (
              <tr key={row.slug}>
                <th><span><Link to={getRoutePath(`/recipe/${row.slug}`)}>{row.title}</Link></span></th>
                <th>{row.num_menuitems}</th>
                <th>{moment(row.last_made).format('ddd, MMMM D, YYYY')}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Stats;
