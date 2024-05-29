import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({children}) => {
  return (
    <>  
      <Header />
      <div style={{minHeight: '100vh'}}> 
        {children}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;