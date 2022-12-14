import { Link } from 'react-router-dom';

import '../css/header_link.css';
import PageScroller from './PageScroller';

export interface IHeaderLinkProps {
  linkFor: string;
}

const HeaderLink: React.FC<IHeaderLinkProps> = ({ linkFor }: IHeaderLinkProps) => (
  <>
    <Link className='headerlink' to={`#${linkFor}`} title='Permalink to this headline'>¶</Link>
    <PageScroller uriFragmentId={linkFor} />
  </>
);

export default HeaderLink;
