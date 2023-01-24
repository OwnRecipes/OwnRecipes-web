import { Accordion } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import * as _ from 'lodash-es';

import '../css/internal_error.css';

import Modal from '../../common/components/Modal';
import P from '../../common/components/P';
import Input from '../../common/components/Input/Input';
import { InternalError } from '../../internal_error/store/types';

function getResponseText(internalError: InternalError | undefined): string | undefined {
  if (internalError == null || internalError.response == null) return undefined;
  const resp: string | undefined = _.get(internalError.response, 'text');
  if (resp == null) return undefined;
  const respS: string = resp;

  const ixBodyOpen  = respS.indexOf('<body>');
  const ixBodyClose = respS.indexOf('</body>');
  if (ixBodyOpen === -1 || ixBodyClose === -1 || ixBodyClose < ixBodyOpen) return resp;

  return respS.substring(ixBodyOpen + 6, ixBodyClose).trim();
}

interface IInternalErrorDialogFCProps {
  internalError: InternalError;
  onClose: () => void;
}

const InternalErrorDialogFC: React.FC<IInternalErrorDialogFCProps> = ({
    internalError, onClose }: IInternalErrorDialogFCProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    errorTitle: {
      id: 'internal_error.dialog_title',
      defaultMessage: 'Error',
    },
  });

  return (
    <Modal
        show
        title = {formatMessage(messages.errorTitle)}
        onClose = {onClose}
        noCloseButton
        size  = 'xl'
        className = 'internalError'>
      <InternalErrorDialogContent internalError={internalError} />
    </Modal>
  );
};

interface IInternalErrorDialogContentProps {
  internalError: InternalError | undefined;
}

const InternalErrorDialogContent: React.FC<IInternalErrorDialogContentProps> = ({
    internalError }: IInternalErrorDialogContentProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    heading_general: {
      id: 'internal_error.heading.general',
      defaultMessage: 'General',
    },
    heading_information: {
      id: 'internal_error.heading.information',
      defaultMessage: 'Extended information',
    },
    request: {
      id: 'internal_error.request',
      defaultMessage: 'Request',
    },
    response: {
      id: 'internal_error.response',
      defaultMessage: 'Response',
    },
  });

  const responseText = getResponseText(internalError);
  if (internalError) {
    // eslint-disable-next-line no-console
    console.error(`${internalError.message}\n\n${internalError.stack}`);
  }

  return (
    <Accordion defaultActiveKey='0' flush alwaysOpen>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>{formatMessage(messages.heading_general)}</Accordion.Header>
        <Accordion.Body>
          <>
            <P className='caption name'>{`${internalError?.name}:`}</P>
            <P className='text message'>{internalError?.message}</P>
          </>
          {internalError?.response == null && internalError?.url != null && (
            <>
              <P className='caption request'>{`${formatMessage(messages.request)}:`}</P>
              <P className='text request'>{`${internalError?.method} ${internalError?.url}`}</P>
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>

      {internalError?.response != null && (
        <Accordion.Item eventKey='1'>
          <Accordion.Header>{formatMessage(messages.heading_information)}</Accordion.Header>
          <Accordion.Body>
            {internalError?.url != null && (
              <>
                <P className='caption request'>{`${formatMessage(messages.request)}:`}</P>
                <P className='text request'>{`${internalError?.method} ${internalError?.url}`}</P>
              </>
            )}
            {responseText != null && (
              <>
                <P className='caption response'>{`${formatMessage(messages.response)}:`}</P>
                <Input
                    name  = 'response-text'
                    readOnly
                    rows  = {responseText == null || responseText.length < 300 ? 4 : 10}
                    value = {responseText} />
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
      )}
    </Accordion>
  );
};

export default InternalErrorDialogFC;
