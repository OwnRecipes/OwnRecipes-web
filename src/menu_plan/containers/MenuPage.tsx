import { Row } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import PageWrapper from '../../common/components/PageWrapper';
import MenuTabs from '../components/MenuTabs';

const MenuPage: React.FC = () => {
  const intl = useIntl();

  return (
    <PageWrapper title={intl.messages['nav.menuPlan'] as string}>
      <Row xs={1} className='menu-header-container'>
        <h2>{intl.messages['nav.menuPlan'] as string}</h2>
      </Row>
      <Row xs={1} className='menu-plan-container'>
        <MenuTabs />
      </Row>
    </PageWrapper>
  );
};

export default MenuPage;
