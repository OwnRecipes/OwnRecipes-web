import { Card, Col, Row } from 'react-bootstrap';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';

import '../css/footer.css';

import P from '../../common/components/P';
import Modal from '../../common/components/Modal';
import { getEnv, isDemoMode, optionallyFormatMessage, requireEnv } from '../../common/utility';

const messages = defineMessages({
  about_title: {
    id: 'footer.about.title',
    description: 'Title of the about dialog.',
    defaultMessage: 'About OwnRecipes',
  },

  about_developers: {
    id: 'footer.about.developers',
    description: 'Developers heading.',
    defaultMessage: 'Developers',
  },
  about_technical_info: {
    id: 'footer.about.technical info',
    description: 'Technical information heading.',
    defaultMessage: 'Version info',
  },
  about_technical_info_demo: {
    id: 'footer.about.technical info.demo alert',
    description: 'Info that this instance is a demo only.',
    defaultMessage: 'Demo mode.',
  },
  about_credits: {
    id: 'footer.about.credits',
    description: 'Credits heading.',
    defaultMessage: 'Credits',
  },

  founder_openeats: {
    id: 'footer.role.founder_openeats',
    description: 'Role description for the founder of OpenEats.',
    defaultMessage: 'Founder of OpenEats',
  },
  founder_ownrecipes: {
    id: 'footer.role.founder_ownrecipes',
    description: 'Role description for the founder of OwnRecipes.',
    defaultMessage: 'Founder of OwnRecipes',
  },
  backend: {
    id: 'footer.role.backend',
    description: 'Backend staff.',
    defaultMessage: 'Backend/api',
  },
  frontend: {
    id: 'footer.role.frontend',
    description: 'Frontend staff.',
    defaultMessage: 'Frontend',
  },
});

interface IAboutModalProps {
  show: boolean;
  onClose: () => void;
}
const AboutModal = ({ show, onClose }: IAboutModalProps) => {
  const { formatMessage } = useIntl();

  return (
    <Modal
        show = {show}
        title = {formatMessage(messages.about_title)}
        onClose = {onClose}
        noCloseButton
        className = 'modal-about'>
      <ModalAboutContent />
    </Modal>
  );
};

const ModalAboutContent: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <P variant='body1'>
        <FormattedMessage
            id='footer.credit'
            description='Footer credit'
            defaultMessage='Created with {link}, an open source recipe management site. You can share recipes with friends, rate recipes, manage your grocery lists, and more.'
            values={{
              link: <a href='https://github.com/ownrecipes/OwnRecipes'>OwnRecipes</a>,
            }} />
      </P>

      <hr />
      <h2>{formatMessage(messages.about_developers)}</h2>
      <Row xs={2} md={3} className='credits-people g-3'>
        <UserCard
            userName = 'Ryan Noelk'
            userUrl = 'https://github.com/RyanNoelk'
            imageSrc = 'https://avatars.githubusercontent.com/u/11916338?v=4'
            roles = {['founder_openeats']} />
        <UserCard
            userName = 'Frank "Roy" H.'
            userUrl = 'https://github.com/sepulzera'
            imageSrc = 'https://avatars.githubusercontent.com/u/43857716?v=4'
            roles = {['founder_ownrecipes', 'frontend']} />
        <UserCard
            userName = 'Sarajiko'
            userUrl = 'https://github.com/Sarajiko'
            imageSrc = 'https://avatars.githubusercontent.com/u/80350428?v=4'
            roles = {['backend']} />
      </Row>

      <hr />
      <h2>{formatMessage(messages.about_technical_info)}</h2>
      <P variant='body2'>
        <FormattedMessage
            id='footer.technical info.version'
            description='Version of OwnRecipes'
            defaultMessage='OwnRecipes: v{version}'
            values={{
              version: requireEnv('REACT_APP_VERSION'),
            }} />
      </P>
      <P variant='body2'>
        <FormattedMessage
            id='footer.technical info.api url'
            description='Api url'
            defaultMessage='Api url: {url}'
            values={{
              url: getEnv('REACT_APP_API_URL', window.location.origin),
            }} />
      </P>
      {isDemoMode() && (
        <P variant='body2'>
          {formatMessage(messages.about_technical_info_demo)}
        </P>
      )}

      <hr />
      <h2>{formatMessage(messages.about_credits)}</h2>
      <P variant='body2'>
        <FormattedMessage
            id='footer.credit_openeats'
            description='Footer credit for OpenEats'
            defaultMessage='OwnRecipes is a fork of {link} by Ryan Noelk.'
            values={{
              link: <a href='https://github.com/open-eats/OpenEats' target='_blank' rel='noreferrer'>OpenEats</a>,
            }} />
      </P>
      <P variant='body2'>
        <FormattedMessage
            id='footer.icon_credit'
            description='Footer icons credit'
            defaultMessage='Icons by {link} ({ccLink}).'
            values={{
              link: <a href='http://www.flaticon.com/authors/nikita-golubev' title='Nikita Golubev' target='_blank' rel='noreferrer'>Nikita Golubev</a>,
              ccLink: <a href='http://creativecommons.org/licenses/by/3.0/' title='Creative Commons' target='_blank' rel='noreferrer'>CC BY 3.0</a>,
            }} />
      </P>
    </>
  );
};

interface IUserCardProps {
  userName: string;
  userUrl: string;
  imageSrc: string;
  roles: Array<string>;
}
const UserCard = ({ userName, userUrl, imageSrc, roles }: IUserCardProps) => {
  const intl = useIntl();

  return (
    <Col>
      <Card>
        <Card.Img variant='top' src={imageSrc} />
        <Card.Body>
          <Card.Title><a href={userUrl} target='_blank' rel='noreferrer'>{userName}</a></Card.Title>
          <Card.Text>{roles.map(role => optionallyFormatMessage(intl, 'footer.role.', role)).join(', ')}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AboutModal;
