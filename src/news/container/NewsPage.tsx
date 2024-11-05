import { useIntl } from 'react-intl';

import '../css/news.css';

import PageWrapper from '../../common/components/PageWrapper';
import { isDemoMode } from '../../common/utility';
import NewsBrowser from '../components/NewsBrowser';
import NewsOverview from '../components/NewsOverview';
import NewsMenuPlan from '../components/NewsMenuPlan';

const NewsPage: React.FC = () => {
  const intl = useIntl();

  return (
    <PageWrapper title={intl.messages['nav.home'] as string}>
      <NewsOverview />
      {!isDemoMode() && <NewsMenuPlan />}
      <NewsBrowser />
    </PageWrapper>
  );
};

export default NewsPage;
