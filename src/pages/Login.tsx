import { login } from '../store/slices/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { RootState } from '../store/store';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import AuthLayout from '../layouts/AuthLayout';
import { Label } from 'reactstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const {status, error, loggedIn} = useSelector((state: RootState) => state.auth);

  const handleSubmit = (values: { username: string; password: string; }, {resetForm, setStatus}) => {
    setStatus(undefined);
    //@ts-expect-error gaidys
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
          <Form className='d-flex flex-column'>
            <Label for="username">Username</Label>
            <Field name="username" type="text" />
            <ErrorMessage name="username" component="div" />

            <Label for="password">Password</Label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          
            {error && <span>{status}</span>}
            <Link to='/auth/registration' replace>Do not have an account? Register.</Link>
            <button type="submit" className='mt-3'>Login</button>
          </Form>)}
      </Formik>
    </AuthLayout>
  );
};

export default Login;