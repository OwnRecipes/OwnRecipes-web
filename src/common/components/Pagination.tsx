import { forwardRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import '../css/pagination.css';

import { CommonProps } from '../types/OverridableComponent';

export interface IPaginationLinkProps extends CommonProps {
  title:     string;
  offset:    number;
  active?:   boolean;
  disabled?: boolean;
  buildUrl:  (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

export const PaginationLink = forwardRef<HTMLLIElement, IPaginationLinkProps>(({
    title, offset, active, buildUrl, disabled,
    className, ...rest }: IPaginationLinkProps, ref) => {
  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (active || disabled) {
      event.preventDefault();
    }
  }, [active, disabled]);

  return (
    <li className={classNames('page-item', className, { active: active, disabled: disabled })} {...rest} ref={ref}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link className={classNames('page-link', 'btn-outline-primary', { active: active, disabled: disabled })} to={!disabled ? buildUrl('offset', offset.toString()) : '#'} onClick={handleClick}>
        {title}
      </Link>
    </li>
  );
});
