import { useCallback, useContext } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import '../css/recipe_header.css';

import Icon from '../../common/components/Icon';
import CookingModeContext from '../context/CookingModeContext';
import { useWakeLock } from '../../common/hooks/useWakeLock';
import Button from '../../common/components/Button';

const messages = defineMessages({
  activate_cooking_mode_tooltip: {
    id: 'recipe.activate_cooking_mode_tooltip',
    description: 'Tooltip displayed when hovering the activate cooking mode button',
    defaultMessage: 'Keep display awake.',
  },
  deactivate_cooking_mode_tooltip: {
    id: 'recipe.deactivate_cooking_mode_tooltip',
    description: 'Tooltip displayed when hovering the deactivate cooking mode button',
    defaultMessage: 'Release the display wake lock.',
  },
});

const CookingModeButton: React.FC = () => {
  const { formatMessage } = useIntl();

  const { isSupported } = useWakeLock();
  const cookingModeContext = useContext(CookingModeContext);
  const isCookingMode = cookingModeContext?.cookingMode ?? false;

  const handleClick = useCallback(() => {
    cookingModeContext?.setCookingMode(!isCookingMode);
  }, [cookingModeContext?.setCookingMode, isCookingMode]);

  if (!isSupported) return null;

  return (
    <Button id='cooking-mode-toggle' variant={isCookingMode ? 'primary' : 'outline-primary'} onClick={handleClick} tooltip={formatMessage(isCookingMode ? messages.deactivate_cooking_mode_tooltip : messages.activate_cooking_mode_tooltip)}>
      <Icon icon='stopwatch' variant={isCookingMode ? 'filled' : 'light'} />
    </Button>
  );
};

export default CookingModeButton;
