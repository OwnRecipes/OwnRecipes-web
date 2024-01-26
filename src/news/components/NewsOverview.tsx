import { useCallback, useEffect, useState } from 'react';

import '../css/news.css';

import LocalStorageHelper from '../../common/LocalStorageHelper';
import { RootState } from '../../app/Store';
import { useSelector } from '../../common/store/redux';
import NewsCarousel from './NewsList';
import FeaturesOverview from './FeaturesOverview';
import ToggleNewsButton from './ToggleNewsButton';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import { getEnvAsBoolean } from '../../common/utility';

const SHOW_NEWS_STORAGE_KEY = 'show_news';

const NewsOverview: React.FC = () => {
  const accountState = useSelector((state: RootState) => state.account);
  const user = accountState.item;
  const userName = user?.username;

  const disableNews = useSelector((state: RootState) => state.settings.disableNews) || getEnvAsBoolean('REACT_APP_DISABLE_NEWS') || false;

  const [showNews, setShowNews] = useState<boolean>(false);

  useEffect(() => {
    setShowNews(LocalStorageHelper.getItem(SHOW_NEWS_STORAGE_KEY, userName) !== 'false');
  }, [userName]);

  const handleToggleNewsClick = useCallback(() => {
    if (showNews) {
      LocalStorageHelper.setItem(SHOW_NEWS_STORAGE_KEY, 'false', userName);
      setShowNews(false);
    } else {
      LocalStorageHelper.removeItem(SHOW_NEWS_STORAGE_KEY, userName);
      setShowNews(true);
    }
  }, [showNews, userName]);

  return (
    <ErrorBoundary verbose printStack>
      {disableNews && <h1 style={{ textAlign: 'center' }}>OwnRecipes</h1>}
      {!disableNews && showNews && (
        <>
          <NewsCarousel />
          <FeaturesOverview />
        </>
      )}
      {!disableNews && <ToggleNewsButton showNews={showNews} onClick={handleToggleNewsClick} />}
    </ErrorBoundary>
  );
};

export default NewsOverview;
