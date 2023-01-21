import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export interface INavButtonProps {
  to: string;
  variant?: 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary' | 'transparent';
  className?: string;
  children: React.ReactNode;
}

const NavButton: React.FC<INavButtonProps> = ({
  to, variant, className, children, ...rest }: INavButtonProps) => (
    <Button
        type = 'button'
        variant = {variant}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        as = {Link as any}
        to = {to}
        className = {className}
        {...rest}>
      {children}
    </Button>
);

export default NavButton;
