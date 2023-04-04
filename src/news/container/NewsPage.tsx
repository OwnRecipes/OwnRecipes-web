import { useIntl } from 'react-intl';

import '../css/news.css';

// import UpComingRecipes from '../../menu/components/UpComingRecipes';
// import Menu from '../../menu/containers/Menu';
import PageWrapper from '../../common/components/PageWrapper';
import NewsBrowser from '../components/NewsBrowser';
import NewsOverview from '../components/NewsOverview';

const NewsPage: React.FC = () => {
  const intl = useIntl();
  // const accountState = useSelector((state: RootState) => state.account);
  // const user = accountState.item;

  return (
    <PageWrapper title={intl.messages['nav.home'] as string}>
      <NewsOverview />
      {/*
      <Row>
        { user && user.id !== 0 && ['user', 'staff', 'admin'].includes(user.role)
          ? <Menu SimpleLayout={UpComingRecipes} public />
          : ''}
      </Row>
      */}
      <NewsBrowser />
    </PageWrapper>
  );
};

export default NewsPage;
