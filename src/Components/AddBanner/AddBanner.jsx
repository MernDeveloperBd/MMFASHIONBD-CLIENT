import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const AddBanner = () => {
  // ডাটা লোডিং
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["bannerProducts"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/products`);
      return data;
    },
  });

  // র‍্যান্ডম প্রডাক্ট সিলেক্টার (৪ টা)
  const getRandomProducts = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const bannerProducts = getRandomProducts(products, 4);

  if (isLoading || bannerProducts.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-10 sm:py-16">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        className="rounded-xl shadow-lg"
      >
        {bannerProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-r from-blue-50 to-white rounded-xl p-8 md:p-12 shadow-md overflow-hidden">
              
              {/* Left: Text Content */}
              <div className="z-10 space-y-5 max-w-xl md:pl-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                  {product.title.length > 45
                    ? product.title.slice(0, 45) + "..."
                    : product.title}
                </h2>
                <p className="text-gray-700 text-base sm:text-lg line-clamp-3">
                  {product.description || "Discover our exclusive collection."}
                </p>
                <p className="text-2xl font-extrabold text-blue-700">TK {product.price}</p>
                <Link
                  to={`/product/${product._id}`}
                  className="inline-block mt-3 shop_now shadow  "
                >
                  Shop Now
                </Link>
              </div>

              {/* Right: Product Image */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* Overlay Gradient for Better Text Contrast */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent z-0 rounded-xl" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default AddBanner;
