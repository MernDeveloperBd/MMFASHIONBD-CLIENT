import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useCart } from "../AuthProvider/CartContext"; // Cart context থেকে data নিয়ে আসো
import avatarImg from '../../assets/placeholder.jpg';
import Container from "../Shared/Container";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { cartCount } = useCart(); // Cart থেকে কাউন্ট

  const [isOpen, setIsOpen] = useState(false);

  const menuLinkClass = ({ isActive }) =>
    isActive
      ? "text-violet-700 font-semibold transition"
      : "text-gray-700 hover:text-violet-500 transition";

  const toggleDropdown = () => setIsOpen(!isOpen);

  const desktopMenu = (
    <>
      <NavLink to="/" className={menuLinkClass}>Home</NavLink>
      <NavLink to="/collections" className={menuLinkClass}>Collections</NavLink>
      <NavLink to="/about" className={menuLinkClass}>About</NavLink>
      <NavLink to="/contact" className={menuLinkClass}>Contact</NavLink>
    </>
  );

  return (
    <div className='fixed w-full bg-white opacity-95 z-50 shadow-sm'>
      <div className='py-3 border-b border-gray-300'>
        <Container>
          <div className='flex items-center justify-between'>

            {/* Logo */}
            <Link to='/' className="flex items-center gap-1 flex-shrink-0 text-xl font-bold ">
              <img src="https://i.ibb.co/bRLWLq9C/women-cloth-sell-Misam-marifa-fashion-world.jpg" alt="logo" className="w-8 h-8 md:w-10 md:h-10 border rounded-full shadow shadow-green-300" title="Haramain Khushbo" />
              <span className="text-2xl hidden md:block text-violet-700">MM Fashion World</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 font-semibold text-base justify-center flex-1">
              {desktopMenu}
            </div>

            {/* Avatar & Dropdown */}
           
                 {/* Cart Link */}
                    {
                      cartCount > 0 && <Link to="/cart" className="flex items-center gap-1 px-3 py-2 hover:bg-lime-100 primary_text transition" onClick={() => setIsOpen(false)}>
                      <span>Cart</span>
                      <div className="flex relative">
                        <FaShoppingCart className="text-xl "/>
                      {cartCount > 0 && (
                        <span className="ml-0.5 bg-green-600 text-white rounded-full w-4 h-4 flex justify-center items-center px-2 text-xs font-bold absolute -top-2 -right-2">
                          {cartCount}
                        </span>
                      )}
                      </div>
                    </Link>
                    }
           
            <div className='relative'>
              <div
                onClick={toggleDropdown}
                className='p-1 border border-gray-300 rounded-full cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out'
              >
                <img
                  className='rounded-full w-9 h-9 object-cover'
                  referrerPolicy='no-referrer'
                  src={user?.photoURL || avatarImg}
                  alt='profile'
                />
              </div>

              {isOpen && (
                <div className='absolute right-0 top-14 w-52 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden z-30'>
                  <div className="flex flex-col">

                    {/* Mobile Menu */}
                    <div className="flex flex-col gap-1 md:hidden border-b border-gray-200 px-4 py-3">
                      {desktopMenu}
                    </div>
                    {/* Auth Links */}
                    <div className="flex flex-col px-2 py-3 space-y-1">
                      {user ? (
                        <>
                          <p
                            className="block px-3 py-2 rounded-md text-white font-semibold transition bg-green-700"
                            onClick={() => setIsOpen(false)}
                          >
                            {user?.displayName}
                          </p>
                          <NavLink
                            to='/dashboard'
                            className="block px-3 py-2 rounded-md hover:bg-lime-100 text-lime-700 font-semibold transition"
                            onClick={() => setIsOpen(false)}
                          >
                            Dashboard
                          </NavLink>
                          <div
                            onClick={() => {
                              logOut();
                              setIsOpen(false);
                            }}
                            className='block cursor-pointer px-3 py-2 rounded-md hover:bg-lime-100 text-lime-700 font-semibold transition'
                          >
                            Logout
                          </div>
                        </>
                      ) : (
                        <>
                          <NavLink
                            to='/login'
                            className="block px-3 py-2 rounded-md hover:bg-lime-100 text-lime-700 font-semibold transition"
                            onClick={() => setIsOpen(false)}
                          >
                            Login
                          </NavLink>
                          <NavLink
                            to='/register'
                            className="block px-3 py-2 rounded-md hover:bg-lime-100 text-lime-700 font-semibold transition"
                            onClick={() => setIsOpen(false)}
                          >
                            Sign Up
                          </NavLink>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
