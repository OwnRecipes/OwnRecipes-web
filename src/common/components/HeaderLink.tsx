import { forwardRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import '../css/header_link.css';

import { CommonProps } from '../types/OverridableComponent';
import PageScroller from './PageScroller';

export interface IHeaderLinkProps extends CommonProps {
  linkFor: string;
}

const HeaderLink = forwardRef<HTMLAnchorElement, IHeaderLinkProps>(({ linkFor, className, ...rest }: IHeaderLinkProps, ref) => (
  <>
    <Link
        className = {classNames('headerlink', className)}
        to = {`#${linkFor}`}
        title = 'Permalink to this headline'
        {...rest}
        ref = {ref}>
      ¶
    </Link>
    <PageScroller uriFragmentId={linkFor} />
  </>
));

export default HeaderLink;
