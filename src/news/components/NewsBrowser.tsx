import React from 'react';
import { useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';

import '../css/news.css';

import { CombinedStore } from '../../app/Store';

import MiniBrowse from '../../browse/containers/MiniBrowse';
import ErrorBoundary from '../../common/components/ErrorBoundary';

const NewsBrowser: React.FC = () => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    recommendedRecipes: {
      id: 'nav.home.recommended_recipes_title',
      description: 'Recommended Recipes Title',
      defaultMessage: 'Recommended Recipes',
    },
  });

  const miniBrowseMeta = useSelector((state: CombinedStore) => state.browse.miniBrowse.meta);

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
