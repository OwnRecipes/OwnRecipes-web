import { useIntl } from 'react-intl';

import PageWrapper from '../../common/components/PageWrapper';
import GroceryListsContainer from './GroceryListsContainer';

const GroceryListsPage: React.FC = () => {
  const intl = useIntl();

  return (
    <PageWrapper title={intl.messages['nav.groceryLists'] as string} className='optiwidth'>
      <GroceryListsContainer />
    </PageWrapper>
  );
};

export default GroceryListsPage;
