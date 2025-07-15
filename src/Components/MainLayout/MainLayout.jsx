
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

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
            <a
                href="https://wa.me/8801749889595?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-full shadow-lg transition-all duration-300"
            >
                <i className="ri-whatsapp-line text-2xl" title='Chat on Whatsapp'></i>
            </a>
        </div>
    );
};

export default MainLayout;