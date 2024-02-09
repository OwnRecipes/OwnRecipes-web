import { defineMessages, useIntl } from 'react-intl';

import '../css/news.css';

import { RootState } from '../../app/Store';
import { useSelector } from '../../common/store/redux';

import MiniBrowse from '../../browse/containers/MiniBrowse';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import { getEnvAsBoolean } from '../../common/utility';

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
  const disableRecipeDiscovery = useSelector((state: RootState) => state.settings.disableRecipeDiscovery) || getEnvAsBoolean('REACT_APP_DISABLE_RECIPE_DISCOVERY') || false;

  if (!miniBrowseMeta.hasConnection || miniBrowseMeta.error != null || disableRecipeDiscovery) return null;

  return (
    <ErrorBoundary verbose printStack>
      <div>
        <MiniBrowse heading={formatMessage(messages.recommendedRecipes)} count={4} />
      </div>
    </ErrorBoundary>
  );
};

export default NewsBrowser;
