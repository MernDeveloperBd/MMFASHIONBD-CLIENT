import { useQuery } from "@tanstack/react-query";
import SingleProduct from "./SingleProduct";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Link } from "react-router-dom";

const Products = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/products`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // popular products filter
  const popularProducts = products.filter((p) => p.popular);

  return (
    <div className="container mx-auto px-2">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Our Collections</h2>
        <Link to="/collections" className="btn btn-sm btn_color whitespace-nowrap">
          More
        </Link>
      </div>

      <div className="flex gap-6">
        {/* Sidebar - Popular Products */}
        <aside className="w-1/4 hidden md:block sticky top-20 h-[calc(100vh-80px)] overflow-auto border rounded p-3 bg-white shadow">
          <h3 className="text-lg font-semibold mb-4">Popular Products</h3>
          {popularProducts.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {popularProducts.map((product) => {
                const hasDiscount = product.oldPrice && product.oldPrice > product.price;
                const discountPercent = hasDiscount
                  ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
                  : 0;

                return (
                  <li
                    key={product._id}
                    className="border rounded p-2 hover:shadow cursor-pointer transition relative"
                  >
                    <Link to={`/product/${product._id}`} className="flex items-center gap-3 relative">
                      {/* Badges */}
                      {product.popular && (
                        <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] px-1 rounded z-10">
                          Popular
                        </span>
                      )}
                      {hasDiscount && (
                        <span className="absolute top-1 right-1 bg-green-600 text-white text-[10px] px-1 rounded z-10">
                          -{discountPercent}%
                        </span>
                      )}

                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">
                          {product.title.length > 25
                            ? product.title.slice(0, 25) + "..."
                            : product.title}
                        </p>
                        <p className="text-blue-600 font-bold text-sm">TK {product.price}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No popular products found.</p>
          )}
        </aside>

        {/* Main Products Grid */}
        <main className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.slice(0, 16).map((product) => (
                <SingleProduct key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-red-600 text-center">No Product</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
