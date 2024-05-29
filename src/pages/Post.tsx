import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

import '../scss/post.scss';

import { getTimeAgo } from '../utils';
import MainLayout from '../layouts/MainLayout';
import { getPost } from '../store/slices/posts/postsSlice';
import { getComments, addComment } from '../store/slices/comments/commentsSlice';

const Post = () => {
  const [allComments, setAllComments] = useState([]);
  const { postId, threadId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-expect-error sudu kruva
    dispatch(getPost(postId));
    //@ts-expect-error sudu kruva
    dispatch(getComments(postId));
  }, []);

  const {post, status, error: postError} = useSelector((state: any) => state.posts);
  const {comments, error: commentsError} = useSelector((state: any) => state.comments);

  const {user_id, author_name} = post;
  const {_id, name} = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : { _id: null, name: null };

  const {loggedIn} = useSelector((state: any) => state.auth);

  useEffect(() => {
    console.log(comments);
    const initComments = (comments.users || [])
      .flatMap(user => user.comments.map(comment => ({...comment, author_name: user.author_name, author_id: user.user_id})));
      
    console.log(initComments);
    const sortedComments = initComments.sort((a, b) => (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any));

    setAllComments(sortedComments);
  }, [comments]);

  const initialValues = {
    comment: '',
  };

  const validationSchema = Yup.object({
    comment: Yup.string().required('Required').max(2000, 'Must be at most 2000 characters')
  });

  const handleAddComment = (values: {comment: string}, {resetForm}: any) => {
    //@ts-expect-error fuck off
    dispatch(addComment({postId, data: {text: values.comment, user_id: _id, author_name: name}})).then((response: any) => {
      console.log(response);
      if(response.payload.success){
        resetForm();
        setAllComments([{...response.payload.data, author_name: name, author_id: _id }, ...allComments]);
      }
    });
  };

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
          <h1 className='' style={{fontWeight: 'bold'}}>{post.title}</h1>
          <p className='text'>{post.text}</p>
        </div>
        {loggedIn && <div className='d-flex flex-column'>
          <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => handleAddComment(values, { resetForm })}>
            <Form >
              <Field name='comment' type='text' placeholder='Write a reply...' style={{width: '600px'}} />
              <button type='submit'>Reply</button>
            </Form>
          </Formik>
        </div>}
        <span>Replies</span>
        <div>
          {allComments.map((comment: any) => {
            const {_id, author_name, author_id, text, createdAt} = comment;
            return (<div key={_id} style={{width: '1000px', marginBlock: '10px'}}>
              <Link to={`/users/${author_id}`} style={{width: 'fit-content', display: 'inline-block'}}>
                <h3 style={{fontWeight: 'bold'}}>{author_name}</h3>
              </Link>
              <p>{text}</p>
              <span style={{fontStyle: 'italic'}}>{getTimeAgo(createdAt)}</span>
            </div>);
          })}
        </div>
      </div>
    </MainLayout> 
  );
};

export default Post;