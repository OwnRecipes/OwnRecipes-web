import { forwardRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';

import '../css/header_link.css';

import { CommonProps } from '../types/OverridableComponent';
import PageScroller from './PageScroller';

const messages = defineMessages({
  permalink_tooltip: {
    id: 'permalink.tooltip',
    description: 'Tooltip when hovering a permalink.',
    defaultMessage: 'Permalink to this headline',
  },
});

export interface IHeaderLinkProps extends CommonProps {
  linkFor: string;
}

const HeaderLink = forwardRef<HTMLAnchorElement, IHeaderLinkProps>(({ linkFor, className, ...rest }: IHeaderLinkProps, ref) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Link
          className = {classNames('headerlink', className)}
          to = {`#${linkFor}`}
          title = {formatMessage(messages.permalink_tooltip)}
          {...rest}
          ref = {ref}>
        ¶
      </Link>
      <PageScroller uriFragmentId={linkFor} />
    </>
  );
});

export default HeaderLink;
