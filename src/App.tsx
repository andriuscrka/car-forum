import Home from './pages/Home';
import Login from './pages/Login';

import { logout } from './store/slices/auth/authSlice';
import { useDispatch } from 'react-redux';

import { Routes, Route, Link} from 'react-router-dom';


export const App = () => {
  
  const dispatch = useDispatch();

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/login'} element={<Login />}/>
      </Routes>
    </>
  );
};