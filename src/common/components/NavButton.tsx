import { forwardRef } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { CommonProps } from '../types/OverridableComponent';
import ConditionalWrapper from './ConditionalWrapper';
import Tooltip from './Tooltip';
import { IButtonProps } from './Button';

export interface INavButtonProps extends
    Omit<IButtonProps, 'type'>,
    CommonProps {
  to: string;
}

const NavButton = forwardRef<HTMLButtonElement, INavButtonProps>(({
  id, to,
  tooltip,
  children, ...rest }: INavButtonProps, ref) => (
    <ConditionalWrapper
        condition = {Boolean(tooltip)}
        render = {childr => <Tooltip id={`${id}-tooltip`} tooltip={tooltip}>{childr}</Tooltip>}>
      <Button
          type = 'button'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          as = {Link as any}
          to = {to}
          aria-label = {tooltip}
          {...rest}
          ref = {ref}>
        {children}
      </Button>
    </ConditionalWrapper>
));

export default NavButton;
