import { forwardRef } from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';

import '../css/button.css';

import { CommonProps } from '../types/OverridableComponent';
import ConditionalWrapper from './ConditionalWrapper';
import Tooltip from './Tooltip';

export interface IButtonProps extends CommonProps {
  id:         string;
  type?:      'button' | 'reset' | 'submit';
  variant?:   'primary' | 'secondary' | 'danger' | 'outline-primary' | 'outline-secondary' | 'outline-danger' | 'transparent';
  size?:      'sm' | 'lg';
  disabled?:  boolean;
  onClick?:   (event: React.MouseEvent<HTMLButtonElement>) => void;

  tooltip?:   string;
  tooltipPlacement?: Placement;

  children:   React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(({
  id,
  tooltip, tooltipPlacement,
  children, ...rest }: IButtonProps, ref) => (
    <ConditionalWrapper
        condition = {Boolean(tooltip)}
        render = {childr => <Tooltip id={`${id}-tooltip`} tooltip={tooltip} placement={tooltipPlacement}>{childr}</Tooltip>}>
      <BootstrapButton id={id} aria-label={tooltip || undefined} aria-describedby={undefined} {...rest} ref={ref}>
        {children}
      </BootstrapButton>
    </ConditionalWrapper>
));

export default Button;
