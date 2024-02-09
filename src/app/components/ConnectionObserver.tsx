import { useContext, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import '../css/connection.css';

import { useSelector } from '../../common/store/redux';
import Alert from '../../common/components/Alert';
import DynamicHeightContext from '../../common/context/DynamicHeightContext';
import { RootState } from '../Store';
import { getEnv } from '../../common/utility';

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
  no_connection_malformed_api_host: {
    id: 'connection.no_connection_malformed_api_host',
    description: 'No connection alert that the api_host REACT_APP_API_URL is malformed',
    defaultMessage: 'Please contact the administrator: the configuration seems to be malformed (REACT_APP_API_URL).',
  },
});

function checkApiHost(apiUrl: string | undefined): boolean {
  return !apiUrl || !apiUrl.includes('//');
}

const apiUrl = getEnv('REACT_APP_API_URL', window.location.origin);

const ConnectionObserver: React.FC = () => {
  const { formatMessage } = useIntl();
  const dynamicHeightContext = useContext(DynamicHeightContext);
  const connectionState = useSelector((state: RootState) => state.connection);

  const isApiUrlMalformed = useMemo(() => checkApiHost(apiUrl), [apiUrl]);

  if (connectionState.hasConnection) return null;

  return (
    <Container
        className = 'no-connection'
        style = {{ marginTop: `${(dynamicHeightContext.toolbarHeight) + 5}px`, marginBottom: `-${dynamicHeightContext.toolbarHeight}px` }}>
      <Alert severity='danger' title={formatMessage(messages.no_connection_title)}>
        {formatMessage(messages.no_connection_message)}
        {isApiUrlMalformed && (
          <>
            <br />
            <span>
              {formatMessage(messages.no_connection_malformed_api_host)}
            </span>
          </>
        )}
      </Alert>
    </Container>
  );
};

export default ConnectionObserver;
