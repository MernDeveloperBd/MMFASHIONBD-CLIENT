const OfferBanner = () => {
  return (
    <div className="container mx-auto bg-[#f1f1f1] rounded-lg shadow-md p-8 my-6 flex flex-col md:flex-row items-center justify-between border border-gray-200 max-h-[420px] overflow-hidden">
      <div className="mb-6 md:mb-0 md:max-w-lg flex flex-col justify-center h-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">
          Special Summer Offer!
        </h2>
        <p className="text-gray-600 mb-5 leading-relaxed">
          Enjoy up to <span className="font-semibold text-indigo-600">30% OFF</span> on all Haramain Khushbo products.
          Hurry, limited time offer.
        </p>
        <button className="bg-indigo-600 text-white font-medium px-6 py-3 rounded-md shadow hover:bg-indigo-700 transition w-max">
          Shop Now
        </button>
      </div>
      <div className="md:max-w-md h-[300px] md:h-[420px] flex-shrink-0">
        <img
          src="https://i.ibb.co/bRLWLq9C/women-cloth-sell-Misam-marifa-fashion-world.jpg"
          alt="Haramain Khushbo Offer"
          className="rounded-lg shadow-md w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default OfferBanner;
