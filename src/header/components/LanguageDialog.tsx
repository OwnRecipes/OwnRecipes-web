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

export const LanguageDialog: React.FC<ILanguageDialogProps> = ({
    show, settings, onChangeLanguage, onClose }: ILanguageDialogProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    language_modal_title: {
      id: 'nav.accountmenu.language_modal_title',
      description: 'Change language dialog title',
      defaultMessage: 'Choose language',
    },
  });

  const handleCloseClick = () => { onClose(); };

  return (
    <Modal
        show = {show}
        title = {formatMessage(messages.language_modal_title)}
        onClose = {handleCloseClick}
        size = 'sm'
        noCloseButton>
      <LanguageDialogContent
          settings = {settings}
          onChangeLanguage = {onChangeLanguage}
          onClose = {handleCloseClick} />
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
  const handleChangeLanguage = (lang: LanguageCode) => {
    onChangeLanguage(lang);
    onClose();
  };

  const languageButtons = Object.values(LanguageCode).map(l => (
    <ListGroup.Item key={l} action disabled={settings.language === l} onClick={() => handleChangeLanguage(l)}>{getMessagesFromLang(l)['1.display_name']}</ListGroup.Item>
  ));

  return (
    <ListGroup>
      {languageButtons}
    </ListGroup>
  );
};

export default LanguageDialog;
