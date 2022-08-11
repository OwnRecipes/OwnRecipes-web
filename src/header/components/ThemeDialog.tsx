import { defineMessages, useIntl } from 'react-intl';
import { ListGroup } from 'react-bootstrap';

import Modal from '../../common/components/Modal';
import { Settings, ThemeMode } from '../../account/store/settings/types';

export interface IThemeDialogProps {
  show:  boolean;
  settings: Settings;

  onChangeTheme: (theme: ThemeMode) => void;
  onClose: () => void;
}

export const ThemeDialog: React.FC<IThemeDialogProps> = ({
    show, settings, onChangeTheme, onClose }: IThemeDialogProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    theme_modal_title: {
      id: 'nav.accountmenu.theme_modal_title',
      description: 'Change theme mode dialog title',
      defaultMessage: 'Choose theme',
    },
  });

  const handleCloseClick = () => { onClose(); };

  return (
    <Modal
        show = {show}
        title = {formatMessage(messages.theme_modal_title)}
        onClose = {handleCloseClick}
        size = 'sm'
        noCloseButton>
      <ThemeDialogContent
          settings = {settings}
          onChangeTheme = {onChangeTheme}
          onClose = {handleCloseClick} />
    </Modal>
  );
};

interface IThemeDialogContentProps {
  settings: Settings;

  onChangeTheme: (theme: ThemeMode) => void;
  onClose: () => void;
}

const ThemeDialogContent: React.FC<IThemeDialogContentProps> = ({
    settings, onChangeTheme, onClose }: IThemeDialogContentProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    theme_modal_title: {
      id: 'nav.accountmenu.theme_modal_title',
      description: 'Change theme mode dialog title',
      defaultMessage: 'Choose theme',
    },
    theme_mode_dark: {
      id: 'theme.mode.dark',
      description: 'Dark mode',
      defaultMessage: 'Dark',
    },
    theme_mode_light: {
      id: 'theme.mode.light',
      description: 'Light mode',
      defaultMessage: 'Light',
    },
  });

  const handleChangeTheme = (theme: ThemeMode) => {
    onChangeTheme(theme);
    onClose();
  };

  const themeButtons = Object.values(ThemeMode).map(t => (
    <ListGroup.Item key={t} action disabled={settings.themeMode === t} onClick={() => handleChangeTheme(t)}>{formatMessage(messages[`theme_mode_${t}`])}</ListGroup.Item>
  ));

  return (
    <ListGroup>
      {themeButtons}
    </ListGroup>
  );
};

export default ThemeDialog;
