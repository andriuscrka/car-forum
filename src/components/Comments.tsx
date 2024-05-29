import '../scss/post.scss';

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {Field, Form, Formik} from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';

import { getTimeAgo } from '../utils';
import { getComments, addComment } from '../store/slices/comments/commentsSlice';
import { useAppContext } from '../App';

const Comments = () => {
  const [allComments, setAllComments] = useState([]);
  const {dispatch, loggedIn, commentsState, user} = useAppContext();
  const {postId} = useParams();

  const {_id, name} = user || {'_id': '', 'name': ''};

  const initialValues = {
    comment: '',
  };

  const validationSchema = Yup.object({
    comment: Yup.string().required('Required').max(2000, 'Must be at most 2000 characters')
  });

  useEffect(() => {
    dispatch(getComments(postId)).then((response) => {
      if(response.payload.success){
        const {users} = response.payload.data;
        const initComments = (users || [])
          .flatMap(user => user.comments.map(comment => ({...comment, author_name: user.author_name, author_id: user.user_id})));
      
        console.log(initComments);
        const sortedComments = initComments.sort((a, b) => (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any));

        setAllComments(sortedComments);
      }
    });
  }, []);

  const handleAddComment = (values: {comment: string}, {resetForm}: any) => {
    dispatch(addComment({postId, data: {text: values.comment, user_id: _id, author_name: name}})).then((response: any) => {
      console.log(response);
      if(response.payload.success){
        resetForm();
        setAllComments([{...response.payload.data, author_name: name, author_id: _id }, ...allComments]);
      }
    });
  };

  return (
    <>
      {loggedIn && <div className='reply-container'>
        <hr />
        <Formik 
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => handleAddComment(values, { resetForm })}>
          <Form >
            <Field name='comment' type='text' as='textarea' placeholder='Write a reply...' className='reply-input' />
            <Button type='submit' className='reply-button'>Reply</Button>
          </Form>
        </Formik>
        <hr />
      </div>}
      <span className='replies-title'>Replies</span>
      <div className='comments-container'>
        {allComments.length === 0 && <p>No replies yet</p>}
        {allComments.map((comment: any) => {
          const {_id, author_name, author_id, text, createdAt} = comment;
          return (<div key={_id} className='comment'>
            <Link to={`/users/${author_id}`} style={{width: 'fit-content', display: 'flex', alignItems: 'center'}}>
              <div className='comment-image'/>
              <h3 style={{fontWeight: 'bold'}}>{author_name}</h3>
            </Link>
            <p className='comment-text'>{text}</p>
            <span style={{fontStyle: 'italic'}}>{getTimeAgo(createdAt)}</span>
          </div>);
        })}
      </div>
    </>
  );
};

export default Comments;