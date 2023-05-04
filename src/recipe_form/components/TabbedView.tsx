import { useCallback } from 'react';
import classNames from 'classnames';
import { Tabs, Tab } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import Icon from '../../common/components/Icon';
import Tooltip from '../../common/components/Tooltip';

export interface ITabbedViewProps {
  id:          string;
  labels:      Array<string>;
  tooltips?:   Array<string>;

  initialTab?: string;
  activeTab?:  string;
  onSelect?:   (newActiveTab: string) => void;

  errors?:     string;
  children:    Array<React.ReactNode>;
}

const messages = defineMessages({
  preview: {
    id: 'recipe.create.preview',
    description: 'Preview',
    defaultMessage: 'Preview',
  },
});

const TabbedView: React.FC<ITabbedViewProps> = ({
    id, labels, errors, tooltips,
    initialTab, activeTab, onSelect,
    children } : ITabbedViewProps) => {
  const { formatMessage } = useIntl();

  const contentClassName = classNames('content', {
    'has-error': !!errors,
  });

  const navClassName = classNames('nav', 'nav-tabs', {
    'has-error': !!errors,
  });

  const tabs = children.slice(0, children.length - 1).map((childr, index) => (
    <Tab
        // eslint-disable-next-line react/no-array-index-key
        key = {index.toString()}
        title = {(
          <>
            {labels[index]}
            {tooltips?.[index] && (
              <>
                &nbsp;
                <Tooltip
                    id = {`${labels[index]}-tooltip`}
                    tooltip   = {tooltips[index]}>
                  <Icon icon='info-circle' className='tooltip-icon' aria-label={tooltips[index]} aria-describedby={undefined} />
                </Tooltip>
              </>
            )}
          </>
        )}
        eventKey  = {index.toString()}
        className = 'editor'>
      <div className={contentClassName}>{childr}</div>
    </Tab>
  ));

  const handleSelect = useCallback((selectedKey: string | null) => {
    if (selectedKey) {
      onSelect?.(selectedKey);
    }
  }, [onSelect]);

  return (
    <div className='live-editor'>
      <Tabs
          id = {`${id}-tabs`}
          defaultActiveKey = {initialTab || '0'}
          activeKey = {activeTab}
          onSelect  = {handleSelect}
          className = {navClassName}>
        {tabs}
        <Tab
            title = {formatMessage(messages.preview)}
            className = 'preview'
            eventKey  = 'preview'>
          <div className={contentClassName}>{children[children.length - 1]}</div>
        </Tab>
      </Tabs>
      <div className='help-text error'>{errors}</div>
    </div>
  );
};

export default TabbedView;
