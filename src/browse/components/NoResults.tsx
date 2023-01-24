import { defineMessages, useIntl } from 'react-intl';

import P from '../../common/components/P';

const NoResults: React.FC = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    no_results: {
      id: 'browse.no_results',
      description: 'No results header',
      defaultMessage: 'There are no results for your search.',
    },
  });

  return (
    <P className='no-results placeholder'>{formatMessage(messages.no_results)}</P>
  );
};

export default NoResults;
