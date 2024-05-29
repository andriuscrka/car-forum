import '../scss/auth.scss';

import { useEffect, useState } from 'react';
import { Label } from 'reactstrap';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import MainLayout from '../layouts/MainLayout';
import { addPost } from '../store/slices/posts/postsSlice';
import { getThreads } from '../store/slices/posts/postsSlice';
import { useAppContext } from '../App';

const CreatePost = () => {

  const [threads, setThreads] = useState([]);
  const {dispatch, navigate, loggedIn, user, postsState} = useAppContext();
  const {error} = postsState;
  const {_id, name} = user;

  useEffect(() => {
    if(!loggedIn) {
      navigate('/', {replace: true});
    }
  }, [loggedIn, navigate]);

  const initialValues = {
    title: '',
    thread: '',
    text: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required').min(5, 'Must be at least 5 characters').max(100, 'Must be at most 100 characters'),
    thread: Yup.string().required('Required'),
    text: Yup.string().required('Required').min(20, 'Must be at least 20 characters').max(2000, 'Must be at most 2000 characters'),
  });       


  const handleSubmit = (values: any, { resetForm, setStatus }: any) => {
    const thread = JSON.parse(values.thread);
    const post = {
      title: values.title,
      text: values.text,
      user_id: _id,
      author_name: name,
      thread_id: thread.id,
      thread_name: thread.name
    };

    dispatch(addPost(post)).then((response) => {
      if(response.payload.success){
        resetForm();
        navigate(`/posts/${thread.id}/${response.payload.data._id}`);
      } else {
        setStatus({error: response.payload.message});
      }
    });
  };

  useEffect(() => {
    dispatch(getThreads()).then((response) => {
      if(response.payload.success){
        setThreads(response.payload.data);
      }
    });
  }, [dispatch]);

  return (
    <MainLayout>
      <div className='d-flex h-100 align-items-center justify-content-center'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setStatus }) => handleSubmit(values, { resetForm, setStatus })}
          validateOnChange={true}
        >
          {({ status }) => (
            <Form className='auth-container'>
              <h1 className='auth-title'>Create Post</h1>
              <Label className='auth-input__label' for="title">Title</Label>
              <Field className='auth-input' name="title" type="text" />
              <ErrorMessage className='auth-input__error' name="title" component="div" />
              <Label className='auth-input__label'  for="thread">Thread</Label>
              <Field className='auth-input' as="select" name="thread">
                <option value="">Select a thread</option>
                {threads.map((thread: any) => (
                  <option key={thread._id} value={JSON.stringify({id: thread._id, title: thread.title})}>{thread.title}</option>
                ))}
              </Field>
              <ErrorMessage className='auth-input__error' name="thread" component="div" />
              <Label className='auth-input__label'  for="text">Text</Label>
              <Field className='auth-input' name="text" as="textarea" style={{height: '200px'}} />
              <ErrorMessage className='auth-input__error'  name="text" component="div" />
              {error && <span className='auth-error'>{status}</span>}
              <Button type="submit" className='mt-3'>Post</Button>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
};

export default CreatePost;