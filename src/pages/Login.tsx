import { login } from '../store/slices/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store/store';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  
  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const {status, error, user, loggedIn} = useSelector((state: RootState) => state.auth);

  const handleSubmit = (values: { username: string; password: string; }, {resetForm}) => {
    //@ts-expect-error gaidys 
    dispatch(login(values)).then((response: any) => {
      if(response.payload && response.payload.userId) {
        resetForm();
      }
    });
  };

  return (
    <div>
      <span>status: {status} </span>
      <span>error: {error} </span>
      <span>user: {user} </span>
      <span>loggedIn: {loggedIn ? 'true' : 'false'} </span>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
      >
        <Form>
          <Field name="username" type="text" />
          <Field name="password" type="password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;