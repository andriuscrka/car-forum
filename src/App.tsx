import {createContext, useContext, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Home, Login, Registration, Threads, Post, Profile, ThreadPosts, CreatePost, NotFound } from './pages';

import { RootState } from './store/store';

export const AppContext = createContext(null);

export function useAppContext() {
  return useContext(AppContext);
}

export const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state: RootState) => state.auth);
  const commentsState = useSelector((state: RootState) => state.comments);
  const postsState = useSelector((state: RootState) => state.posts);

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;

  const contextValue = {
    dispatch,
    navigate,
    loggedIn: authState.loggedIn || false,
    user,
    authState,
    postsState,
    commentsState
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/auth/login'} element={<Login />}/>
          <Route path={'/auth/registration'} element={<Registration />}/>
          <Route path={'/posts/:threadId/:postId?'} element={<Post />}/>
          <Route path={'/posts/create-post'} element={<CreatePost />} />
          <Route path={'/users/:userId'} element={<Profile />}/>
          <Route path={'/threads'} element={<Threads />}/>
          <Route path={'/threads/:threadId'} element={<ThreadPosts />}/>
          <Route path={'*'} element={<NotFound />}/>
        </Routes>
      </AppContext.Provider>
    </>
  );
};