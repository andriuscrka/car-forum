import '../scss/home-layout.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPostPreviewsByThread } from './../store/slices/posts/postsSlice';
import MainLayout from '../layouts/MainLayout';
import Cards from '../components/Cards';
import PostPreviewPlaceholder from '../components/PostPreviewPlaceholder';
import PostPreview from '../components/PostPreview';
import { useAppContext } from '../App';

const ThreadPosts = () => {

  const [postPreviews, setPostPreviews] = useState([]);
  const [threadTitle, setThreadTitle] = useState('');
  const {dispatch, loggedIn, postsState} = useAppContext();
  const {threadId} = useParams();
  const {status, error} = postsState;
  
  useEffect(() => {
    dispatch(getPostPreviewsByThread(threadId)).then((response) => {
      if(response.payload.success){
        setPostPreviews(response.payload.data.previews);
        setThreadTitle(response.payload.data.thread_title);
      }
    });
  }, [dispatch, threadId]);

  return (
    <MainLayout>
      <div className='w-100 mt-5 mb-3 d-flex justify-content-center'>
        <div className='d-flex flex-nowrap justify-content-centers'>
          <div className='home-card__col me-5  p-0'>
            <Cards/>
          </div>
          <div className='d-flex flex-column ms-5'>
            <h1 style={{fontSize: '30px', fontWeight: 'bold'}}>Posts in {threadTitle}</h1>
            <div className='mt-3 home-preview__col'>
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