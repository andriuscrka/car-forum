import MainLayout from '../layouts/MainLayout';

import { Label } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from '../store/slices/posts/postsSlice';

import { getThreads } from '../store/slices/posts/postsSlice';

import { useNavigate   } from 'react-router-dom';

const CreatePost = () => {
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

  const {_id, name} = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : { _id: null, name: null };
  
  const [threads, setThreads] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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

    //@ts-expect-error sudu kruva
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
    //@ts-expect-error aik nachui
    dispatch(getThreads()).then((response) => {
      if(response.payload.success){
        setThreads(response.payload.data);
      }
    });
  }, []);

  return (
    <MainLayout> 
      <div className='d-flex justify-content-center mt-5'>
        <div style={{width: '1000px', minHeight: '500px', backgroundColor: 'whitesmoke'}}>
          <h1>Create Post</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setStatus }) => handleSubmit(values, { resetForm, setStatus })}
            validateOnChange={false}
          >
            {({ status }) => (
              <Form className='d-flex flex-column'>

                <Label for="title">Title</Label>
                <Field name="title" type="text" />
                <ErrorMessage name="title" component="div" />

                <Label for="thread">Thread</Label>
                <Field as="select" name="thread">
                  <option value="">Select a thread</option>
                  {threads.map((thread: any) => (
                    <option key={thread._id} value={JSON.stringify({id: thread._id, title: thread.title})}>{thread.title}</option>
                  ))}
                </Field>
                <ErrorMessage name="thread" component="div" />

                <Label for="text">Text</Label>
                <Field name="text" as="textarea" style={{height: '150px'}} />
                <ErrorMessage name="text" component="div" />

                <button type="submit" className='mt-3'>Post</button>
                
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatePost;