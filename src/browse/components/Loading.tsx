import { Col, Row } from 'react-bootstrap';

import CircularProgress from '../../common/components/CircularProgress';

const Loading: React.FC = () => (
  <Row>
    <Col xs={12}>
      <Row id='browse'>
        <div className='spinner'>
          <CircularProgress />
        </div>
      </Row>
    </Col>
  </Row>
);

export default Loading;
