import { useMemo } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Beforeunload } from 'react-beforeunload';
import { defineMessages, useIntl } from 'react-intl';

import useBlocker from '../hooks/useBlocker';

const messages = defineMessages({
  navigation_warning: {
    id: 'navigationprompt.warning',
    description: 'Prompt displayed when navigating on a dirty page (unsaved changes).',
    defaultMessage: 'You have unsaved changed. If you continue, those change may be lost.',
  },
});

interface INavigationPromptProps {
  isDirty?: boolean | undefined;
}

const NavigationPrompt: React.FC<INavigationPromptProps> = ({ isDirty }: INavigationPromptProps) => {
  const { formatMessage } = useIntl();

  const promptMsg = useMemo(() => formatMessage(messages.navigation_warning), [formatMessage]);

  const dirtyBlocker = useBlocker(promptMsg, isDirty);

  return (
    <>
      {isDirty && (
        <Beforeunload onBeforeunload={() => promptMsg} />
      )}

      {dirtyBlocker}
    </>
  );
};

export default NavigationPrompt;
