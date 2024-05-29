export const PORT = 3000;
export const HOST = `http://localhost:${PORT}`;

const Routes = {
  User: `${HOST}/api/users`,
  PostPreviews: `${HOST}/api/post-previews`,
  Posts: `${HOST}/api/posts`,
  Comments: `${HOST}/api/comments`,
  Profiles: `${HOST}/api/profiles`,
  Threads : `${HOST}/api/threads`,
};

export default Routes;