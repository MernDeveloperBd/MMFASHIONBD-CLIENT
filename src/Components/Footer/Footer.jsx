import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-base-200 text-base-content px-4 pt-10 pb-6 ">
      {/* Footer Main Content */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/about" className="link link-hover">About Us</Link></li>
            <li><Link to="/collections" className="link link-hover">Collections</Link></li>
            <li><Link to="/contact" className="link link-hover">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold mb-3">Contact Info</h2>
          <p>📞 +880 1794 889595</p>
          <p>📧 marifamisam@gmail.com</p>
          <p>🏠 Nawabgonj, Dhaka-1320</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-bold mb-3">Follow Us</h2>
          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <a href="https://www.facebook.com/MisamMarifaFashionWorld" target="_blank" className="hover:text-blue-600"><FaFacebookF /></a>
            <a href="#" className="hover:text-red-600"><FaYoutube /></a>
            <a href="#" className="hover:text-pink-600"><FaInstagram /></a>
          </div>
        </div>

        {/* Company Info */}
        <div>
          <h2 className="text-lg font-bold mb-3">Company</h2>
          <p>আমরা নিয়ে এসেছি আধুনিক ফ্যাশনের সাথে মানানসই কাপড় ও এক্সক্লুসিভ কালেকশন — যা আপনাকে দেবে আলাদা লুক ও আত্মবিশ্বাস। কোয়ালিটিতে আপস নয়, দামে সেরা অফার!</p>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="container mx-auto border-t border-gray-300 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-center gap-2">
        <p>
          © {new Date().getFullYear()} — All rights reserved by{" "}
          <Link to="/" className="font-semibold hover:underline">MM Fashion World</Link>
        </p>
        <p>
          Designed by{" "}
          <a
            href="https://www.instagram.com/misammehzabin/"
            target="_blank"
            rel="noopener noreferrer"
            className="primary_text "
          >
            Misam Mehzabin
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
