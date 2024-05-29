import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { useEffect } from 'react';

import { RootState } from '../store/store';

import AuthLayout from '../layouts/AuthLayout';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Label } from 'reactstrap';
import * as Yup from 'yup';

import { register } from '../store/slices/auth/authSlice';

const Registration = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loggedIn, error} = useSelector((state: RootState) => state.auth);

  const date = new Date();
  date.setFullYear(date.getFullYear() - 16);

  const initialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    birthday: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required').min(2, 'Must be at least 2 characters').matches(/^[a-zA-Z]*$/, 'Name can only contain letters'),
    username: Yup.string().required('Required').min(3, 'Must be at least 3 characters').matches(/^[a-zA-Z0-9]*$/, 'Username must be alphanumeric'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required').min(8, 'Must be at least 8 characters'),
    repeatPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    birthday: Yup.date().required('Required').max(date, 'User must be at least 16 years old'),
  });

  const handleSubmit = (values: { username: string; password: string; }, {resetForm, setStatus}) => {
    console.log('handlesubmit');
    setStatus(undefined);
    //@ts-expect-error gaidys 
    dispatch(register(values)).then((response: any) => {
      console.log(response);
      if(response.payload.success) {
        resetForm();
        navigate('/auth/login', {replace: true});
      } else {
        setStatus(response.payload.message);
      }
    });
  };

  useEffect(() => {
    if(loggedIn) {
      navigate('/', {replace: true});
    }
  }, [loggedIn, navigate]);

  return (
    <AuthLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setStatus }) => handleSubmit(values, { resetForm, setStatus })}
        validateOnChange={false}
      >
        {({ status }) => (
          <Form className='d-flex flex-column'>

            <Label for="name">Name</Label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" />

            <Label for="username">Username</Label>
            <Field name="username" type="text" />
            <ErrorMessage name="username" component="div" />

            <Label for="email">Email</Label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />

            <Label for="password">Password</Label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />

            <Label for="repeatPassword">Repeat Password</Label>
            <Field name="repeatPassword" type="password" />
            <ErrorMessage name="repeatPassword" component="div" />

            <Label for="birthday">Birthday</Label>
            <Field name="birthday" type="date" />
            <ErrorMessage name="birthday" component="div" />

            {error && <span>{status}</span>}
            <Link to='/auth/login' replace>Already have an account? Login.</Link>
            <button type="submit" className='mt-3'>Register</button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Registration;