import {Card, Button} from 'react-bootstrap';
import { useAppContext } from '../App';

const Cards = () => {

  const {loggedIn, navigate} = useAppContext();

  return (
    <>
      <Card style={{ border: 'none', backgroundColor: 'whitesmoke'}} className='w-100 mb-4'>
        <Card.Body>
          <Card.Title>Auto Forum</Card.Title>
          <Card.Text style={{color: 'gray', textAlign: 'justify'}} className='mb-3 mt-3'>
                    A forum community dedicated to car owners and enthusiasts. Come join the discussion about performance, builds, modifications, troubleshooting, motor sports, maintenance, and more!
          </Card.Text>
          {!loggedIn && <Button onClick={() => navigate('/auth/registration')} variant="primary" className='w-100 ps-0 pe-0' >Join Community</Button>}
        </Card.Body>
      </Card>
      <Card style={{ border: 'none', backgroundColor: 'whitesmoke'}} className='w-100'>
        <Card.Body>
          <Card.Title>Our Most Popular Threads</Card.Title>
          <Card.Text style={{color: 'gray'}} className='ms-3 mb-3 mt-3'>
            <li>Thread #1</li>
            <li>Thread #2</li>
            <li>Thread #3</li>
            <li>Thread #4</li>
            <li>Thread #5</li>
          </Card.Text>
          <Button onClick={() => navigate('/threads')} variant="primary" className='w-100 ps-0 pe-0'>See All</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Cards;