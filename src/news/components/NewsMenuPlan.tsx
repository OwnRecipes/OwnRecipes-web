import { useCallback, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';

import '../css/news.css';

import { RootState } from '../../app/Store';
import { useSelector } from '../../common/store/redux';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import MenuItemsContainer from '../../menu_plan/containers/MenuItemsContainer';
import { PendingState } from '../../common/store/GenericReducerType';
import HeaderLink from '../../common/components/HeaderLink';
import { getRoutePath } from '../../common/utility';

const messages = defineMessages({
  news_menu_heading: {
    id: 'news.menu_heading',
    description: 'Menu plan heading',
    defaultMessage: 'Your Menu',
  },
});

const NewsMenuPlan: React.FC = () => {
  const { formatMessage } = useIntl();

  const menuItemsState = useSelector((state: RootState) => state.menuItems);

  const [rendersEmpty, setRendersEmpty] = useState<boolean>(false);

  const handleRender = useCallback((items: Record<string, unknown> | undefined) => {
    setRendersEmpty(items != null && Object.keys(items).length === 0);
  }, []);

  if (!menuItemsState.meta.hasConnection
    || menuItemsState.meta.error != null
    || (menuItemsState.meta.pending === PendingState.COMPLETED && rendersEmpty)) return null;

  return (
    <ErrorBoundary verbose printStack>
      <div>
        {menuItemsState.meta.pending === PendingState.COMPLETED && (
          <h2 id='news-menu-heading'>
            <Link className='link-text' to={getRoutePath('/menu')}>
              {formatMessage(messages.news_menu_heading)}
            </Link>
            <HeaderLink linkFor='menu-heading' />
          </h2>
        )}
        <Row>
          <MenuItemsContainer withPast={false} withDistantFuture={false} onRender={handleRender} />
        </Row>
      </div>
    </ErrorBoundary>
  );
};

export default NewsMenuPlan;
