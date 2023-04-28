import { useCallback } from 'react';
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

  return (
    <Modal
        show = {show}
        title = {formatMessage(messages.theme_modal_title)}
        onClose = {onClose}
        size = 'sm'
        noCloseButton>
      <ThemeDialogContent
          settings = {settings}
          onChangeTheme = {onChangeTheme}
          onClose = {onClose} />
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

  const handleChangeTheme = useCallback((theme: ThemeMode) => {
    if (settings.themeMode !== theme) {
      onChangeTheme(theme);
    }
    onClose();
  }, [onChangeTheme, onClose, settings.themeMode]);

  const themeButtons = Object.values(ThemeMode).map(t => (
    <ListGroup.Item key={t} role='listitem' action active={settings.themeMode === t} aria-current={settings.themeMode === t} onClick={() => handleChangeTheme(t)}>{formatMessage(messages[`theme_mode_${t}`])}</ListGroup.Item>
  ));

  return (
    <ListGroup as='ol' role='list'>
      {themeButtons}
    </ListGroup>
  );
};

export default ThemeDialog;
