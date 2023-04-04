import { forwardRef } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { CommonProps } from '../types/OverridableComponent';

export interface INavButtonProps extends CommonProps {
  to: string;
  variant?: 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary' | 'transparent';
  children: React.ReactNode;
}

const NavButton = forwardRef<HTMLButtonElement, INavButtonProps>(({
  to, variant, children, ...rest }: INavButtonProps, ref) => (
    <Button
        type = 'button'
        variant = {variant}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        as = {Link as any}
        to = {to}
        {...rest}
        ref = {ref}>
      {children}
    </Button>
));

export default NavButton;
