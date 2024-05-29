import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({children}) => {
  return (
    <>  
      <Header />
      <div className='mt-5 mb-5' style={{minHeight: '90vh'}}> 
        {children}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;