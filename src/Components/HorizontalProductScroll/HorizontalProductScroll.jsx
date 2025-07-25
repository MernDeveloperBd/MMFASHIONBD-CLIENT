import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { Link } from "react-router-dom";

const HorizontalProductScroll = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/products`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Our Products
      </h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={false}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="pb-10"
      >
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          products.map((product) => (
            <SwiperSlide key={product._id}>
              <Link
                to={`/product/${product._id}`}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.03] transition duration-300 ease-in-out p-5 block border border-gray-200"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-44 object-cover rounded-lg mb-4 border border-gray-200"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 capitalize mb-2 truncate">
                  {product.category}
                </p>
                <p className="mt-2 font-bold text-blue-800 text-lg">
                  TK {product.price}
                </p>
              </Link>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default HorizontalProductScroll;
