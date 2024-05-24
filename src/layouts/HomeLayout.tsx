import Header from '../components/Header';

import { Col, Row, Container } from 'reactstrap';

import '../scss/header.scss';
import '../scss/home-layout.scss';

import PostPreviewPlaceholder from '../components/PostPreviewPlaceholder';

const HomeLayout = (posts) => {
  return (
    <>  
      <Header />
      <Container className='w-100 mt-5'>
        <Row className='d-flex flex-nowrap justify-content-centers'>
          <Col xs={1} className='home-card__col me-5'></Col>
          <Col xs={1} className='home-preview__col ms-5'>
            <PostPreviewPlaceholder />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeLayout;