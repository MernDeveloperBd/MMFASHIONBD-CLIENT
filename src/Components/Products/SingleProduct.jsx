import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import PropTypes from 'prop-types';

const SingleProduct = ({ product }) => {
  const { _id, title, price, oldPrice, category, ratings, image, popular } = product;

  const hasDiscount = oldPrice && oldPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${_id}`}>
      <div className="group relative">
        {/* Badge: Popular */}
        {popular && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md z-10">
            Popular
          </span>
        )}

        {/* Badge: Discount */}
        {hasDiscount && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md z-10">
            -{discountPercent}%
          </span>
        )}

        <div className="border rounded-lg p-1 shadow-sm hover:shadow-md transition bg-white">
          {/* Image */}
          <div className="overflow-hidden rounded-md">
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover rounded-md mb-3 transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="px-2 space-y-1">
            <h2 className="text-base font-semibold">
              {title?.length > 20 ? title.slice(0, 20) + '...' : title}
            </h2>

            <div className="flex justify-between items-center">
             <div>
               <p className="text-sm text-gray-500 capitalize">{category}</p>
             </div>

              {/* Ratings */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) =>
                  i < parseInt(ratings) ? (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-400 text-sm" />
                  )
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between gap-2">
              <p className="text-base font-bold text-blue-700">TK {price}</p>
              {hasDiscount && (
                <p className="text-sm font-semibold text-red-600 line-through">TK {oldPrice}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

SingleProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
    category: PropTypes.string,
    ratings: PropTypes.number,
    image: PropTypes.string.isRequired,
    popular: PropTypes.bool
  }).isRequired,
};

export default SingleProduct;
