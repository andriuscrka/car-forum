import '../scss/post-preview.scss';

import { Link } from 'react-router-dom';

type ThreadPreviewProps = {
  data: {
    _id: string;
    title: string;
    description: string;
    posts: []
  }
};

const ThreadPreview: React.FC<ThreadPreviewProps> = ({data}) => {

  const {_id, title, description, posts} = data;

  return (
    <Link to={`/threads/${_id}`}>
      <div className='post-preview'>
        <div className='image'/>
        <div className='text-container'> 
          <h3>{title}</h3>
          <p>{description}</p>
          <span className='information'>Posts: {posts.length}</span>
        </div>
      </div>
    </Link>
  );
};

export default ThreadPreview;