import { useContext } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import '../css/demo.css';

import Alert from '../../common/components/Alert';
import DynamicHeightContext from '../../common/context/DynamicHeightContext';

const Demo = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    demoAlertTitle: {
      id: 'demo.alert.title',
      description: 'DEMO NOTICE',
      defaultMessage: 'DEMO NOTICE: Everything is Read-Only!',
    },
  });

  const dynamicHeightContext = useContext(DynamicHeightContext);

  return (
    <div
        className = 'list-error'
        style = {{ marginTop: `${(dynamicHeightContext.toolbarHeight) + 5}px`, marginBottom: `-${dynamicHeightContext.toolbarHeight}px` }}>
      <Alert severity='info' className='demo-alert demo-no-margin' title={formatMessage(messages.demoAlertTitle)}>
        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
        {''}
      </Alert>
    </div>
  );
};

export default Demo;
