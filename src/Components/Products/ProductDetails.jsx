import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaRegStar, FaFacebook, FaTwitter, FaLinkedin, FaPinterest } from "react-icons/fa";
import axios from "axios";

import LoadingSpinner from "../Shared/LoadingSpinner";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import PurchaseModal from "../Modals/PurchaseModal";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import { useCart } from "../../Components/AuthProvider/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ rating: 0, comment: "", name: "" });

  const { data: product = {}, isLoading, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/product/${id}`, {
        withCredentials: true,
      });
      return data;
    },
  });

  const imageArray = [product.image, product.image1, product.image2, product.image3].filter(Boolean);

  const discount = product.oldPrice
    ? ((product.oldPrice - product.price) / product.oldPrice) * 100
    : 0;

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (product?._id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/reviews?productId=${product._id}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error("Error fetching reviews:", err));
    }
  }, [product]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const name = user?.displayName || formData.name?.trim() || "Anonymous";
    const photoURL = user?.photoURL || null;
    const email = user?.email || "";

    if (formData.rating > 0 && formData.comment.trim() && name) {
      const reviewToSend = {
        name,
        photoURL,
        email,
        rating: formData.rating,
        comment: formData.comment.trim(),
        productId: product._id,
      };

      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, reviewToSend);
        if (res.data.insertedId) {
          setReviews((prev) => [...prev, reviewToSend]);
          setFormData({ rating: 0, comment: "", name: "" });
          toast.success("Review submitted successfully!");
        }
      } catch (err) {
        toast.error("Error submitting review: " + err.message);
      }
    } else {
      toast.error("Please fill out all fields with valid data.");
    }
  };

  const { fetchCart } = useCart();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add to cart.");
      navigate("/login");
      return;
    }
    try {
      const payload = {
        productId: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        userId: user.uid || user.email,
      };
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, payload);
      if (res.data.insertedId || res.data.message === "Cart updated") {
        toast.success("Product added to cart!");
        fetchCart();
      }
    } catch (error) {
      toast.error("Failed to add product to cart.", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
       <Helmet>
              <title>{product?.title} - Stylish & Comfortable | MM Fashion BD</title>
            </Helmet>
        <div
          className="hero container mx-auto  h-[190px]"
          style={{
             backgroundImage: `url(${imageArray[selectedImage]})`,
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-2xl md:text-4xl font-bold ">PRODUCT DETAILS</h1>
              <p className="mb-3 text-xl">
                {product?.title}
              </p>
            </div>
          </div>
        </div>
    
      {/* Product Details */}
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-6 grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={imageArray[selectedImage]}
            alt={product.title}
            className="w-full h-[300px] sm:h-[360px] md:h-[440px] object-cover rounded-xl "
          />
          <div className="flex gap-4 mt-4">
            {imageArray.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 object-cover cursor-pointer rounded border-2 ${selectedImage === idx ? "border-blue-500" : "border-transparent"
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col min-h-[280px]">
          <div className="space-y-4 flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-sm text-gray-500"> {product.productCode ? <>Code: {product.productCode}</> : ''}</p>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) =>
                i < product.ratings ? (
                  <FaStar key={i} className="text-yellow-400" />
                ) : (
                  <FaRegStar key={i} className="text-gray-400" />
                )
              )}
            </div>

            <div className="text-2xl font-semibold text-gray-800">
              TK {product.price?.toFixed(2)}
              {product?.oldPrice && (
                <>
                  <span className="line-through text-red-500 text-base ml-2">
                    TK {product.oldPrice}
                  </span>
                  <span className="text-green-600 text-base ml-1">
                    ({discount?.toFixed(0)}% OFF)
                  </span>
                </>
              )}
            </div>

            <p>
              Quantity:{" "}
              <span className="font-semibold text-lg">
                {product.quantity > 0 ? (
                  product.quantity
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </span>
              {product.quantity > 0 && (product.quantity > 1 ? " Pieces left" : " Piece left")}
            </p>
            <p>For know more: <Link to='https://wa.me/8801749889595?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20products' target="_blank" className="text-green-700 font-bold">Whatsapp</Link></p>
            <div className="space-y-1 text-gray-600 leading-relaxed">
              {product.description
                ?.split(/\r?\n|।/)
                .map((line, index) =>
                  line.trim() ? <p key={index}>{line.trim()}</p> : null
                )}
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex gap-4">
              <button
                disabled={product.quantity <= 0}
                onClick={handleAddToCart}
                className={`px-6 py-2 rounded-lg transition duration-200 ${product.quantity <= 0
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "shop_now"
                  }`}
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  if (!user) {
                    toast.error("Please login to purchase.");
                    navigate("/login");
                  } else {
                    setIsOpen(true);
                  }
                }}
                disabled={product.quantity <= 0}
                className={`px-6 py-2 rounded-lg transition duration-200 ${product.quantity <= 0
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
              >
                Buy Now
              </button>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-4 text-lg text-gray-700">
              <span className="font-medium">Share:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}&quote=${encodeURIComponent(product.title + " - " + product.description)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
              >
                <FaFacebook />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}&text=${encodeURIComponent(product.title + " - " + product.description)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-600"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  window.location.href
                )}&title=${encodeURIComponent(product.title)}&summary=${encodeURIComponent(
                  product.description
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800"
              >
                <FaLinkedin />
              </a>
              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                  window.location.href
                )}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent(
                  product.title + " - " + product.description
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600"
              >
                <FaPinterest />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="container mx-auto px-2 md:px-4 pb-8 md:pb-16">
        <div className="mt-6 border-t pt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Customer Reviews</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Reviews List */}
            <div className="space-y-4 border rounded-lg p-4 bg-gradient-to-b from-blue-50 to-white shadow-inner max-h-[350px] overflow-y-scroll">
              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition duration-300"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <img
                        src={review.photoURL || `https://i.pravatar.cc/40?img=${index + 5}`}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{review.name}</h5>
                        <div className="flex">
                          {[...Array(5)].map((_, i) =>
                            i < review.rating ? (
                              <FaStar key={i} className="text-yellow-400 text-sm" />
                            ) : (
                              <FaRegStar key={i} className="text-gray-300 text-sm" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Review Form (Always visible) */}
            <form
              onSubmit={handleReviewSubmit}
              className="space-y-4 bg-gradient-to-br from-white to-blue-50 p-4 border border-blue-100 rounded-xl shadow-md h-fit"
            >
              <h4 className="text-lg font-semibold text-blue-800">Write a Review</h4>

              {!user && (
                <div>
                  <label className="block mb-1 text-sm text-gray-700">Your Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              )}

              {user && (
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || `https://i.pravatar.cc/40?img=1`}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full border"
                  />
                  <p className="text-gray-700">{user.displayName || "Anonymous"}</p>
                </div>
              )}

              <div>
                <label className="block mb-1 text-sm text-gray-700">Rating:</label>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: i + 1 })}
                      className="focus:outline-none"
                    >
                      {i < formData.rating ? (
                        <FaStar className="text-yellow-400 text-xl" />
                      ) : (
                        <FaRegStar className="text-gray-300 text-xl" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows="3"
                placeholder="Your comment..."
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              />

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        <PurchaseModal
          closeModal={closeModal}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          product={product}
          refetch={refetch}
        />
      </div>
      <div className="pb-4">
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductDetails;
