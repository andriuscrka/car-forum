import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getThreads } from '../store/slices/posts/postsSlice';
import MainLayout from '../layouts/MainLayout';

import { Link } from 'react-router-dom';

const Threads = () => {

  const dispatch = useDispatch();

  const [threads, setThreads] = useState([]);

  useEffect(() => {
    //@ts-expect-error eik nachui erroras
    dispatch(getThreads()).then((response) => {
      if(response.payload.success){
        setThreads(response.payload.data);
      }
    });
  }, []);

  console.log(threads);

  return (
    <MainLayout>
      <div className='w-100 mt-5 mb-3 d-flex justify-content-center' style={{}}>
        <div style={{width: '1000px', minHeight: '500px', backgroundColor: 'whitesmoke'}}>
          {threads.map((thread: any) => (
            <Link to={`/threads/${thread._id}`} key={thread._id}>
              <div style={{border: '1px solid black', padding: '10px', margin: '10px'}}>
                <h3>{thread.title}</h3>
                <p>{thread.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Threads;