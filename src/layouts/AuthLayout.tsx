
const AuthLayout = ({children}) => {
  return (
    <div style={{minHeight: '100vh', maxHeight: '100vh'}} className='w-100 d-flex justify-content-center align-items-center'>
      {children}
    </div>
  );
};

export default AuthLayout;