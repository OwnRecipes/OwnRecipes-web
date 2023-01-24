import { lazy, Suspense, useCallback, useState } from 'react';
import { Button, Container, NavLink } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import '../css/footer.css';

import { getEnv } from '../../common/utility';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import LoadingSpinner from '../../common/components/LoadingSpinner';

const AboutModal = lazy(() => import('./AboutModal'));

const Footer: React.FC = () => (
  <footer className='footer print-hidden'>
    <Container>
      <ErrorBoundary verbose printStack={false}>
        <FooterContent />
      </ErrorBoundary>
    </Container>
  </footer>
);

const FooterContent: React.FC = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    about_link: {
      id: 'footer.about_link',
      description: 'Button title to open the about dialog.',
      defaultMessage: 'About OwnRecipes',
    },
    legal_link: {
      id: 'footer.legal_link',
      description: 'Link to the custom legal page.',
      defaultMessage: 'Legal',
    },
    privacy_link: {
      id: 'footer.privacy_link',
      description: 'Link to the custom privacy page.',
      defaultMessage: 'Privacy',
    },
  });

  const legalUrl = getEnv('REACT_APP_LEGAL_URL');
  const privacyUrl = getEnv('REACT_APP_PRIVACY_URL');

  const [openAbout, setOpenAbout] = useState<boolean>(false);

  const handleOpenAboutClick  = useCallback(() => { setOpenAbout(true); }, []);
  const handleCloseAbout = useCallback(() => { setOpenAbout(false); }, []);

  return (
    <>
      <div className='footer-container-inner'>
        <Button variant='link' onClick={handleOpenAboutClick}>{formatMessage(messages.about_link)}</Button>
        {legalUrl && <NavLink className='btn btn-link' href={legalUrl}>{formatMessage(messages.legal_link)}</NavLink>}
        {privacyUrl && <NavLink className='btn btn-link' href={privacyUrl}>{formatMessage(messages.privacy_link)}</NavLink>}
      </div>

      {openAbout && (
        <Suspense fallback={<LoadingSpinner position='screen-center' />}>
          <AboutModal show={openAbout} onClose={handleCloseAbout} />
        </Suspense>
      )}
    </>
  );
};

export default Footer;
