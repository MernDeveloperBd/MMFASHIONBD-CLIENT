
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import WhatsApp from '../WhatsApp';
import Facebook from '../Facebook';
const MainLayout = () => {

    return (
        <div>
            <div className='h-16'>
                <Navbar></Navbar>
            </div>
            <div className='min-h-[calc(100vh-192px)] py-4 '>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            {/* ✅ WhatsApp Chat Button */}
           <WhatsApp/>
           <Facebook/>
        </div>
    );
};

export default MainLayout;