import { ElementType, forwardRef } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { CommonProps } from '../../common/types/OverridableComponent';

export interface INavLinkProps extends CommonProps {
  id?: string;
  to?: string;
  active?: boolean;

  /**
   * @defaultValue `Link`
   */
  as?: ElementType;
  onClick?: () => void;

  accessKey?: string;

  children: React.ReactNode;
}

const NavLink = forwardRef<unknown, INavLinkProps>(({
  id, as = Link, to, active, children, ...rest }: INavLinkProps, ref) => (
    <Nav.Link
        id = {id}
        as = {as}
        to = {to ?? undefined}
        // This seems redundant, but is needed for
        // react bootstrap navbar collapseOnSelect to work.
        href = {to ?? undefined}
        active = {active}
        {...rest}
        ref = {ref}>
      {children}
    </Nav.Link>
));

export default NavLink;
