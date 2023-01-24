import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import '../css/pagination.css';

export interface IPaginationLinkProps {
  title:     string;
  offset:    number;
  active?:   boolean;
  disabled?: boolean;
  buildUrl:  (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
  className?: string;
}

export const PaginationLink: React.FC<IPaginationLinkProps> = ({ title, offset, active, buildUrl, disabled, className }: IPaginationLinkProps) => {
  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (active || disabled) {
      event.preventDefault();
    }
  }, [active, disabled]);

  return (
    <li className={classNames('page-item', className, { active: active, disabled: disabled })}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link className={classNames('page-link', 'btn-outline-primary', { active: active, disabled: disabled })} to={!disabled ? buildUrl('offset', String(offset)) : '#'} onClick={handleClick}>
        {title}
      </Link>
    </li>
  );
};
