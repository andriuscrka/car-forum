import '../scss/post-preview.scss';

import { getTimeAgo } from '../utils';

import { Link } from 'react-router-dom';

type PostPreviewProps = {
  data: {
    _id: string;
    user_id: string;
    post_id: string;
    thread_id: string;
    author_name: string;
    thread_title: string;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    likes: [],
  }
};

const PostPreview: React.FC<PostPreviewProps> = ({data}) => {

  const {author_name, thread_title, title, createdAt, updatedAt, thread_id, post_id} = data;

  return (
    <Link to={`/posts/${thread_id}/${post_id}/`}>
      <div className='post-preview'>
        <div className='image'/>
        <div className='text-container'> 
          <Link to={`/threads/${thread_id}`}>
            <h3 className='thread'>{thread_title || 'untitled'}</h3>
          </Link>
          <h2 className='title'>{title || 'untitled'}</h2>
          <span className='information'>By: </span>
          <span className='information'>{author_name || 'noname'}</span>
          <span className='information'> | {getTimeAgo(createdAt)} | Last activity: {getTimeAgo(updatedAt)}</span>
        </div>
      </div>
    </Link>

  );
};

export default PostPreview;