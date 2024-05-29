import { Home, Login, Registration, Threads, Post, Profile, ThreadPosts, CreatePost, NotFound } from './pages';

import { Routes, Route} from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/auth/login'} element={<Login />}/>
        <Route path={'/auth/registration'} element={<Registration />}/>
        <Route path={'/posts/:threadId/:postId?'} element={<Post />}/>
        <Route path={'/posts/create-post'} element={<CreatePost />} />
        <Route path={'/users/:userId'} element={<Profile />}/>
        <Route path={'/threads/'} element={<Threads />}/>
        <Route path={'/threads/:threadId'} element={<ThreadPosts />}/>
        <Route path={'*'} element={<NotFound />}/>
      </Routes>
    </>
  );
};