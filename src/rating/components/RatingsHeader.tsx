import { Button, Card, Col, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import HeaderLink from '../../common/components/HeaderLink';
import UserRole from '../../common/types/UserRole';

export interface IRatingsHeaderProps {
  userRole:  UserRole | undefined;
  showNewRating: boolean;
  onShowNewRating: () => void;
}

const RatingsHeader: React.FC<IRatingsHeaderProps> = ({ userRole, showNewRating, onShowNewRating }: IRatingsHeaderProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    title: {
      id: 'recipe.comments.title',
      description: 'Comments heading',
      defaultMessage: 'Comments',
    },
    new_rating_button: {
      id: 'recipe.comments.new_rating',
      description: 'Label for the new rating button',
      defaultMessage: 'New rating',
    },
  });

  return (
    <Card.Header>
      <Row>
        <Col className='ratings-heading-col'>
          <h2 id='ratings-heading'>
            {formatMessage(messages.title)}
            <HeaderLink linkFor='ratings-heading' />
          </h2>
        </Col>
        {!showNewRating && userRole != null && [UserRole.USER, UserRole.STAFF, UserRole.ADMIN].includes(userRole) && (
          <Col xs='auto'>
            <Button variant='outline-primary' onClick={onShowNewRating}>{formatMessage(messages.new_rating_button)}</Button>
          </Col>
        )}
      </Row>
    </Card.Header>
  );
};

export default RatingsHeader;
