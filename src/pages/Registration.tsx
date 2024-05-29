import '../scss/auth.scss';

import { useEffect } from 'react';
import { Label } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import AuthLayout from '../layouts/AuthLayout';
import { register } from '../store/slices/auth/authSlice';
import { useAppContext } from '../App';

const Registration = () => {

  const {dispatch, navigate, loggedIn, authState} = useAppContext();
  const {error} = authState;

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
    setStatus(undefined);
    dispatch(register(values)).then((response: any) => {
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
          <Form className='auth-container'>
            <h2 className='auth-title'>Auto Forum | Registration</h2>
            <Label  className='auth-input__label' for="name">Name</Label>
            <Field className='auth-input' name="name" type="text" />
            <ErrorMessage className='auth-input__error' name="name" component="div" />
            <Label  className='auth-input__label' for="username">Username</Label>
            <Field className='auth-input' name="username" type="text" />
            <ErrorMessage className='auth-input__error' name="username" component="div" />
            <Label className='auth-input__label' for="email">Email</Label>
            <Field className='auth-input' name="email" type="email" />
            <ErrorMessage className='auth-input__error' name="email" component="div" />
            <Label className='auth-input__label' for="password">Password</Label>
            <Field className='auth-input' name="password" type="password" />
            <ErrorMessage className='auth-input__error' name="password" component="div" />
            <Label className='auth-input__label' for="repeatPassword">Repeat Password</Label>
            <Field className='auth-input' name="repeatPassword" type="password" />
            <ErrorMessage className='auth-input__error' name="repeatPassword" component="div" />
            <Label for="birthday">Birthday</Label>
            <Field className='auth-input' name="birthday" type="date" />
            <ErrorMessage className='auth-input__error' name="birthday" component="div" />
            {error && <span className='auth-error'>{status}</span>}
            <Link className='auth-link' to='/auth/login' replace>Already have an account? Login.</Link>
            <Button  type="submit" className='mt-3'>Register</Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Registration;