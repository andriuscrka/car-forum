import MainLayout from '../layouts/MainLayout';

import '../scss/home-layout.scss';

import PostPreviewPlaceholder from '../components/PostPreviewPlaceholder';

import { Card, Button } from 'react-bootstrap';
import PostPreview from '../components/PostPreview';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostPreviews } from './../store/slices/posts/postsSlice';
import { RootState } from '../store/store';

import { Link } from 'react-router-dom';

import {useNavigate} from 'react-router-dom';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //document.title = 'Auto Forum | Home';
    //@ts-expect-error sudu kruva
    dispatch(getPostPreviews());

  }, []);

  const status = useSelector((state: RootState) => state.posts.status);
  const postPreviews = useSelector((state: RootState) => state.posts.postPreviews);
  const {loggedIn} = useSelector((state: RootState) => state.auth);

  return (
    <MainLayout>
      <div className='w-100 mt-5 mb-3 d-flex justify-content-center'>
        <div className='d-flex flex-nowrap justify-content-centers'>
          <div className='home-card__col me-5  p-0'>
            <Card style={{ border: 'none', backgroundColor: 'whitesmoke'}} className='w-100 mb-4'>
              <Card.Body>
                <Card.Title>Auto Forum</Card.Title>
                <Card.Text style={{color: 'gray', textAlign: 'justify'}}>
                    A forum community dedicated to car owners and enthusiasts. Come join the discussion about performance, builds, modifications, troubleshooting, motor sports, maintenance, and more!
                </Card.Text>
                {!loggedIn && <Button variant="primary" className='w-100 ps-0 pe-0'>Join Community</Button>}
              </Card.Body>
            </Card>
            <Card style={{ border: 'none', backgroundColor: 'whitesmoke'}} className='w-100'>
              <Card.Body>
                <Card.Title>Our Most Popular Threads</Card.Title>
                <Card.Text style={{color: 'gray'}}>
                  <ul>
                    <li>Test</li>
                    <li>Test</li>
                    <li>Test</li>
                    <li>Test</li>
                    <li>Test</li>
                  </ul>
                </Card.Text>
                <Link to='/threads'>
                  <Button variant="primary" className='w-100 ps-0 pe-0'>See All</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
          <div className='d-flex flex-column ms-5'>
            <div className='d-flex justify-content-between'>
              <h1 style={{fontSize: '30px', fontWeight: 'bold'}}>All posts</h1>
              {loggedIn && <Button onClick={() => navigate('/posts/create-post')}>Create post</Button>}
            </div>
            <div className='mt-3 home-preview__col'>
              {postPreviews.length === 0 && status === 'loading' ? <PostPreviewPlaceholder/> : null}
              {postPreviews && status === 'succeeded' && postPreviews.map((preview: any) => {
                return (   
                  <PostPreview 
                    key={preview._id}
                    data={preview}
                  />);
              })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;