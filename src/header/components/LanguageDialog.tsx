import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { ListGroup } from 'react-bootstrap';

import Modal from '../../common/components/Modal';
import { Settings } from '../../account/store/settings/types';
import { getMessagesFromLang, LanguageCode } from '../../common/language';

export interface ILanguageDialogProps {
  show:     boolean;
  settings: Settings;
  onChangeLanguage: (language: LanguageCode) => void;
  onClose:  () => void;
}

const messages = defineMessages({
  language_modal_title: {
    id: 'nav.accountmenu.language_modal_title',
    description: 'Change language dialog title',
    defaultMessage: 'Choose language',
  },
});

export const LanguageDialog: React.FC<ILanguageDialogProps> = ({
    show, settings, onChangeLanguage, onClose }: ILanguageDialogProps) => {
  const { formatMessage } = useIntl();

  return (
    <Modal
        show = {show}
        title = {formatMessage(messages.language_modal_title)}
        onClose = {onClose}
        size = 'sm'
        noCloseButton>
      <LanguageDialogContent
          settings = {settings}
          onChangeLanguage = {onChangeLanguage}
          onClose = {onClose} />
    </Modal>
  );
};

interface ILanguageDialogContentProps {
  settings: Settings;
  onChangeLanguage: (language: LanguageCode) => void;
  onClose: () => void;
}

const LanguageDialogContent: React.FC<ILanguageDialogContentProps> = ({
    settings, onChangeLanguage, onClose }: ILanguageDialogContentProps) => {
  const handleChangeLanguage = useCallback((lang: LanguageCode) => {
    if (settings.language !== lang) {
      onChangeLanguage(lang);
    }
    onClose();
  }, [onChangeLanguage, onClose, settings.language]);

  const languageButtons = Object.values(LanguageCode).map(l => (
    <ListGroup.Item key={l} role='listitem' action active={settings.language === l} aria-current={settings.language === l} onClick={() => handleChangeLanguage(l)}>{getMessagesFromLang(l)['1.display_name']}</ListGroup.Item>
  ));

  return (
    <ListGroup as='ol' role='list'>
      {languageButtons}
    </ListGroup>
  );
};

export default LanguageDialog;
