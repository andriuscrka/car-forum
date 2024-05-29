import MainLayout from '../layouts/MainLayout';

import '../scss/home-layout.scss';

import PostPreviewPlaceholder from '../components/PostPreviewPlaceholder';

import { Card, Button } from 'react-bootstrap';
import PostPreview from '../components/PostPreview';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostPreviewsByThread } from './../store/slices/posts/postsSlice';
import { RootState } from '../store/store';

import { useState } from 'react';

import { Link } from 'react-router-dom';

const ThreadPosts = () => {

  const [postPreviews, setPostPreviews] = useState([]);
  const [threadTitle, setThreadTitle] = useState('');

  const {threadId} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-expect-error sudu kruva
    dispatch(getPostPreviewsByThread(threadId)).then((response) => {
      if(response.payload.success){
        console.log(response.payload.data);
        setPostPreviews(response.payload.data.previews);
        setThreadTitle(response.payload.data.thread_title);
      }
    });

  }, []);

  const {status, error} = useSelector((state: RootState) => state.posts);
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
            <h1 style={{fontSize: '30px', fontWeight: 'bold'}}>Posts in {threadTitle}</h1>
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

export default ThreadPosts;