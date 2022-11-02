import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import '../css/connection.css';

import { useSelector } from '../../common/store/redux';
import Alert from '../../common/components/Alert';
import DynamicHeightContext from '../../common/context/DynamicHeightContext';
import { CombinedStore } from '../Store';

const ConnectionObserver: React.FC = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    no_connection_title: {
      id: 'connection.no_connection_title',
      description: 'No connection alert title',
      defaultMessage: 'Bad connection',
    },
    no_connection_message: {
      id: 'connection.no_connection_message',
      description: 'No connection alert message',
      defaultMessage: 'Connection to the server failed. Please try again later.',
    },
  });

  const dynamicHeightContext = useContext(DynamicHeightContext);

  const connectionState = useSelector((state: CombinedStore) => state.connection);

  if (connectionState.hasConnection) return null;

  return (
    <Container
        className = 'no-connection'
        style = {{ marginTop: `${(dynamicHeightContext.toolbarHeight) + 5}px`, marginBottom: `-${dynamicHeightContext.toolbarHeight}px` }}>
      <Alert severity='danger' title={formatMessage(messages.no_connection_title)}>
        {formatMessage(messages.no_connection_message)}
      </Alert>
    </Container>
  );
};

export default ConnectionObserver;
