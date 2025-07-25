import { FaFacebookF } from "react-icons/fa";

const Facebook = () => {
    return (
        <div>
            <a
  href="https://www.facebook.com/MisamMarifaFashionWorld"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-4 left-4 z-50"
>
  <div className="relative flex items-center justify-center">
    {/* Pulse Animation */}
    <span className="absolute inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-75 animate-ping"></span>

    {/* Actual Facebook Button */}
    <div className="relative z-10 flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-all duration-300">
      <FaFacebookF className="h-5 w-5" />
    </div>
  </div>
</a>

        </div>
    );
};

export default Facebook;