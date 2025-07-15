

const Slider = ({image, text}) => {
    return (
        <div
        className="w-full bg-center bg-cover h-[24rem]"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
          <div className="text-center">
            <p className="text-3xl font-semibold text-white lg:text-4xl">
              {text}
            </p>
            <br />
            <button className="w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500">
             Shop Now
            </button>
          </div>
        </div>
      </div>
    );
};

export default Slider;