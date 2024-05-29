import '../scss/home-layout.scss';

import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import MainLayout from '../layouts/MainLayout';
import Cards from '../components/Cards';
import PostPreview from '../components/PostPreview';
import { getPostPreviews } from './../store/slices/posts/postsSlice';
import { useAppContext } from '../App';
import { useDispatch } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();
  const [postPreviews, setPostPreviews] = useState([]);
  const {navigate, loggedIn, postsState} = useAppContext();
  const {status} = postsState;

  useEffect(() => {
    document.title = 'Auto Forum | Home';
    //@ts-expect-error sudu kruva
    dispatch(getPostPreviews()).then((response) => {
      if(response.payload.success){
        setPostPreviews(response.payload.data);
      }
    });
  }, []);

  return (
    <MainLayout>
      <div className='w-100 mt-5 mb-3 d-flex justify-content-center'>
        <div className='d-flex flex-nowrap justify-content-centers'>
          <div className='home-card__col me-5  p-0'>
            <Cards />
          </div>
          <div className='d-flex flex-column ms-5'>
            <div className='d-flex justify-content-between'>
              <h1 style={{fontSize: '30px', fontWeight: 'bold'}}>All posts</h1>
              {loggedIn && <Button onClick={() => navigate('/posts/create-post')}>Create post</Button>}
            </div>
            <div className='mt-3 home-preview__col'>
              {postPreviews.map((preview: any) => {
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