import '../scss/auth.scss';

import { useEffect } from 'react';
import { Label } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { login } from '../store/slices/auth/authSlice';
import AuthLayout from '../layouts/AuthLayout';
import { useAppContext } from '../App';

const Login = () => {
  
  const {dispatch, navigate, loggedIn, authState} = useAppContext();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const {error} = authState;

  const handleSubmit = (values: { username: string; password: string; }, {resetForm, setStatus}) => {
    setStatus(undefined);
    dispatch(login(values)).then((response: any) => {
      if(response.payload.success) {
        resetForm();
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
      >
        {({ status }) => (
          <Form className='auth-container'>
            <h2 className='auth-title'>Auto Forum | Login</h2>
            <Label for="username" className='auth-input__label'>Username</Label>
            <Field name="username" type="text" className='auth-input' />
            <ErrorMessage name="username" component="div" className='auth-input__error'/>
            <Label for="password" className='auth-input__label'>Password</Label>
            <Field name="password" type="password" className='auth-input' />
            <ErrorMessage name="password" component="div" className='auth-input__error'/>
            {error && <span className='auth-error'>{status}</span>}
            <Link to='/auth/registration' replace className='mt-3 auth-link'>Do not have an account? Register.</Link>
            <Button type="submit"  className='mt-3'>Login</Button>
          </Form>)}
      </Formik>
    </AuthLayout>
  );
};

export default Login;