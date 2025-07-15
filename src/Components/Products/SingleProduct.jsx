import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import PropTypes from 'prop-types';


const SingleProduct = ({ product }) => {
    const { _id, title, price, oldPrice, category, ratings, image } = product;

    return (

        <Link to={`/product/${_id}`} >
            <div className="group">
                <div
                    className="border rounded-lg p-1 shadow-sm hover:shadow-md transition "
                >
                    <div className="overflow-hidden">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-48 object-cover rounded-md mb-3 transform transition-transform duration-300 group-hover:scale-105 "
                        />
                    </div>
                    <div className="px-2 space-y-1">
                        <h2 className="text-base font-semibold">{title?.length > 20 ? title.slice(0, 20) + '...' : title}</h2>
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-500">{category}</p>

                            <div className="flex items-center gap-1 my-2">
                                {[...Array(5)].map((_, i) =>
                                    i < ratings ? (
                                        <FaStar key={i} className="text-yellow-400 text-sm" />
                                    ) : (
                                        <FaRegStar key={i} className="text-gray-400 text-sm" />
                                    )
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-base font-bold">TK {price}</p>
                            {
                                oldPrice && <p className="text-base font-bold text-red-600 line-through">TK {oldPrice}</p>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </Link>

    );
};

export default SingleProduct;

SingleProduct.propTypes = {
    product: PropTypes.object,
}
