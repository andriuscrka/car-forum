import { useEffect, useState } from 'react';
import { getThreads } from '../store/slices/posts/postsSlice';
import MainLayout from '../layouts/MainLayout';
import ThreadPreview from '../components/ThreadPreview';
import { useAppContext } from '../App';

const Threads = () => {

  const [threads, setThreads] = useState([]);
  const {dispatch, postsState} = useAppContext();

  useEffect(() => {
    dispatch(getThreads()).then((response) => {
      if(response.payload.success){
        setThreads(response.payload.data);
      }
    });
  }, [dispatch]);

  return (
    <MainLayout>
      <div className='w-100 mt-5 mb-3 d-flex flex-column align-items-center'>
        <div style={{width: '1000px'}} className='mb-3'>
          <h1 style={{fontSize: '30px', fontWeight: 'bold'}}>All threads</h1>
        </div>
        <div  style={{width: '1000px', minHeight: '500px', backgroundColor: 'whitesmoke'}}>
          {threads.map((thread: any) => (
            <ThreadPreview key={thread._id} data={thread}/>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Threads;