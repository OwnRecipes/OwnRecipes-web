import { useCallback, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import ErrorBoundary from '../../common/components/ErrorBoundary';
import { MenuItem } from '../store/MenuItemTypes';
import MenuItemsContainer from '../containers/MenuItemsContainer';
import StatsContainer from '../containers/StatsContainer';
import SaveMenuItemSuccessToast from './SaveMenuItemSuccessToast';
import MenuItemModal from './MenuItemModal';

const messages = defineMessages({
  tab_menu: {
    id: 'menu_plan.tab_menu',
    description: 'Tab menu on the menu plan page',
    defaultMessage: 'On The Menu',
  },
  tab_stats: {
    id: 'menu_plan.tab_stats',
    description: 'Tab stats on the menu plan page',
    defaultMessage: 'History',
  },
  tab_new_menu_item: {
    id: 'menu_plan.new_menu_item',
    description: 'Button label to put a new item on the menu plan',
    defaultMessage: '+ Add Item',
  },
});

const MenuTabs: React.FC = () => {
  const { formatMessage } = useIntl();

  const [activeKey, setActiveKey] = useState<string>('menuplan');

  const [showItemModal, setShowItemModal] = useState<Partial<MenuItem> | undefined>(undefined);
  const handleCloseItemModal = useCallback(() => { setShowItemModal(undefined); }, []);

  const [showAddMenuItemSuccessToast, setShowAddMenuItemToast] = useState<boolean>(false);
  const handleAddMenuItemSuccess = useCallback(() => { setShowAddMenuItemToast(true); }, []);
  const handleCloseAddMenuItemSuccessToast = useCallback(() => { setShowAddMenuItemToast(false); }, []);

  const handleSelect = useCallback((key: string | null) => {
    if (key === 'new') {
      setShowItemModal({});
    } else {
      setActiveKey(key || 'menuplan');
    }
  }, []);

  return (
    <>
      <Tabs
          id = 'menu-plan-tabs'
          activeKey = {activeKey}
          onSelect  = {handleSelect}
          unmountOnExit
          mountOnEnter
          transition = {false}
          className='print-hidden'>
        <Tab eventKey='menuplan' title={formatMessage(messages.tab_menu)}>
          <ErrorBoundary verbose printStack>
            <MenuItemsContainer />
          </ErrorBoundary>
        </Tab>
        <Tab eventKey='stats' title={formatMessage(messages.tab_stats)}>
          <ErrorBoundary verbose printStack>
            <div className='print-only'><h2>{formatMessage(messages.tab_stats)}</h2></div>
            <StatsContainer />
          </ErrorBoundary>
        </Tab>
        <Tab eventKey='new' title={formatMessage(messages.tab_new_menu_item)} />
      </Tabs>

      <MenuItemModal
          show     = {Boolean(showItemModal)}
          item     = {showItemModal}
          onSaveSuccess = {handleAddMenuItemSuccess}
          onClose  = {handleCloseItemModal} />
      <SaveMenuItemSuccessToast
          show = {showAddMenuItemSuccessToast}
          created
          onClose = {handleCloseAddMenuItemSuccessToast} />
    </>
  );
};

export default MenuTabs;
