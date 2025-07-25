import { Link } from "react-router-dom";

const SmallAdBanner = ({ title, description, buttonText }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-4 flex items-center justify-between max-w-md mx-auto shadow-lg">
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
      <Link to='/collections'>
      <button className="bg-white text-blue-600 font-bold px-4 py-2 rounded hover:bg-gray-100 transition">
        {buttonText}
      </button>
      </Link>
    </div>
  );
};

const BannerGroup = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        <SmallAdBanner
          title="Special Offer!"
          description="Get 20% off on all products. Limited time only."
          buttonText="Shop Now"
        />
        <SmallAdBanner
          title="New Arrivals"
          description="Check out the latest collection for this season."
          buttonText="Explore"
        />
        <SmallAdBanner
          title="Free Shipping"
          description="Enjoy free shipping on orders over TK 5000."
          buttonText="Learn More"
        />
      </div>
    </div>
  );
};

export default BannerGroup;
