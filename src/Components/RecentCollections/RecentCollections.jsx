import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { categories } from "../..//Components/filtersData";

const RecentCollections = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch all products
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/products`);
      return data;
    },
  });

  // Shuffle utility
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Filter, sort by date, then shuffle
  const filteredProducts = shuffleArray(
    allProducts
      .filter((product) => {
        if (selectedCategory === "all") return true;
        return (
          product.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a.uploadDate || 0);
        const dateB = new Date(b.createdAt || b.uploadDate || 0);
        return dateB - dateA;
      })
  ).slice(0, 15); // take 15 random from latest

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-2">
      <h1 className="text-xl font-bold mb-6">Recent Collections</h1>

      {/* Category Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="overflow-x-auto w-full">
          <div className="flex gap-3 w-max whitespace-nowrap px-1">
            {categories.map((cat) => (
              <button
                key={cat.catValue}
                onClick={() => setSelectedCategory(cat.catValue)}
                className={`px-4 py-1.5 rounded-full border font-medium ${
                  selectedCategory === cat.catValue
                    ? "cat_tab_bg_select"
                    : "bg-white text-gray-700"
                } cat_tab_hover`}
              >
                {cat.catName}
              </button>
            ))}
          </div>
        </div>

        {/* All Products button */}
        <div className="sm:ml-auto sm:flex-shrink-0">
          <Link to="/collections">
            <button className="btn btn-sm btn_color">More</button>
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found in this category.
          </p>
        ) : (
          filteredProducts.map((product) => {
            const hasDiscount =
              product.oldPrice && product.oldPrice > product.price;
            const discountPercent = hasDiscount
              ? Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100
                )
              : 0;

            return (
              <Link key={product._id} to={`/product/${product._id}`}>
                <div className="relative border rounded-lg p-2 shadow-sm hover:shadow-md transition group cursor-pointer overflow-hidden">
                  {/* Badges */}
                  {product.popular && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md z-10">
                      Popular
                    </div>
                  )}
                  {hasDiscount && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md z-10">
                      -{discountPercent}%
                    </div>
                  )}

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-md mb-4 group-hover:scale-105 transition-transform duration-300 "
                  />
                  <h2 className="text-base font-semibold">
                    {product?.title?.length > 20
                      ? product?.title.slice(0, 20) + "..."
                      : product?.title}
                  </h2>
                  <p className="text-sm text-gray-500 capitalize">
                    {product.category}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 my-2">
                    {[...Array(5)].map((_, i) =>
                      i < parseInt(product.ratings) ? (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ) : (
                        <FaRegStar key={i} className="text-gray-400 text-sm" />
                      )
                    )}
                  </div>

                  {/* Price */}
                 <div className="flex gap-1 items-center">
                   <p className="text-base font-bold text-blue-700">
                    TK {product.price}
                  </p>
                  {hasDiscount && (
                    <p className="text-sm line-through text-red-600">
                      TK {product.oldPrice}
                    </p>
                  )}
                 </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentCollections;
