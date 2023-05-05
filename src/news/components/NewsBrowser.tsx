import { defineMessages, useIntl } from 'react-intl';

import '../css/news.css';

import { RootState } from '../../app/Store';
import { useSelector } from '../../common/store/redux';

import MiniBrowse from '../../browse/containers/MiniBrowse';
import ErrorBoundary from '../../common/components/ErrorBoundary';

const messages = defineMessages({
  recommendedRecipes: {
    id: 'nav.home.recommended_recipes_title',
    description: 'Recommended Recipes Title',
    defaultMessage: 'Recommended Recipes',
  },
});

const NewsBrowser: React.FC = () => {
  const { formatMessage } = useIntl();

  const miniBrowseMeta = useSelector((state: RootState) => state.browse.browserMini.meta);

  if (!miniBrowseMeta.hasConnection || miniBrowseMeta.error != null) return null;

  return (
    <ErrorBoundary verbose printStack>
      <div>
        <MiniBrowse heading={formatMessage(messages.recommendedRecipes)} count={4} />
      </div>
    </ErrorBoundary>
  );
};

export default NewsBrowser;
