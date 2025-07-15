import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductHeroBannerWithSideImages = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/products`);
      return data;
    },
  });

  const [bannerProducts, setBannerProducts] = useState([]);
  const [sideImages, setSideImages] = useState([]);

  useEffect(() => {
    if (products.length) {
      // ১. ব্যানারের জন্য ৪ টা র‍্যান্ডম প্রডাক্ট নাও (কোন ক্যাটেগরি ফিল্টার ছাড়াই)
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setBannerProducts(shuffled.slice(0, 4));

      // ২. আলাদা আলাদা ক্যাটেগরি থেকে ৪ টি প্রডাক্ট সিলেক্ট করব ডানপাশের জন্য
      // (প্রতিটি ক্যাটেগরি থেকে ১ টি)
      const categoriesSet = new Set();
      const sideSelection = [];

      // ক্যাটেগরি আলাদা করে ফিল্টার করার জন্য লুপ
      for (const product of shuffled) {
        if (
          product.category &&
          !categoriesSet.has(product.category) &&
          sideSelection.length < 4
        ) {
          categoriesSet.add(product.category);
          sideSelection.push(product);
        }
        if (sideSelection.length >= 4) break;
      }

      setSideImages(sideSelection);
    }
  }, [products]);

  if (isLoading) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - big banner slider (50%) */}
        <div className="md:w-3/5 rounded-lg overflow-hidden shadow-lg">
          <Swiper
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            modules={[Navigation, Pagination, Autoplay]}
            className="rounded-lg"
            style={{ height: "400px" }}
          >
            {bannerProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="relative w-full h-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 sm:px-12">
                    <h2 className="text-white text-2xl sm:text-4xl font-bold leading-tight drop-shadow-md">
                      {product.title.length > 50
                        ? product.title.slice(0, 50) + "..."
                        : product.title}
                    </h2>
                    <p className="text-white text-lg font-semibold mt-2 drop-shadow">
                      TK {product.price}
                    </p>
                    <div className="mt-4">
                      <Link
                        to={`/product/${product._id}`}
                        className=" bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right side - 4 random category images (50%) */}
        <div className="md:w-2/5 grid grid-cols-2 gap-4">
          {sideImages.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="relative group rounded-lg overflow-hidden shadow-md cursor-pointer"
              style={{ height: "190px" }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white font-semibold text-sm sm:text-base truncate z-10">
                TK {product.price}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHeroBannerWithSideImages;
