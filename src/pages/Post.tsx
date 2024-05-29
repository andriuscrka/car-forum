import '../scss/post.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import { getPost } from '../store/slices/posts/postsSlice';
import Comments from '../components/Comments';
import { useAppContext } from '../App';

const Post = () => {
  const [post, setPost] = useState({});
  const {postId } = useParams();
  const {dispatch} = useAppContext();
  const {user_id, author_name} = post;
  
  useEffect(() => {
    dispatch(getPost(postId)).then((response) => {
      if(response.payload.success){
        setPost(response.payload.data);
      }
    });
  }, []);

  return (
    <MainLayout>
      <div className='w-100 mt-5 mb-5 d-flex flex-column align-items-center flex-nowrap justify-content-center'>
        <div className='author-container'>
          <div className='author_image' />
          <Link to={`/users/${user_id}`} >
            <h3 style={{fontWeight: 'bold'}}>{author_name}</h3>
          </Link>
        </div>
        <div className='post-container'>
          <div>
            <h1 className='post-title'>{post.title}</h1>
            <p className='post-text'>{post.text}</p>
          </div>
        </div>
        <Comments />
      </div>
    </MainLayout> 
  );
};

export default Post;