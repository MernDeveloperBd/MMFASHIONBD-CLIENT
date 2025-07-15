import { useState } from "react";
import { FaStar, FaRegStar, FaTh, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { categories, subCategories, colors } from "../../Components/filtersData";
import PropTypes from "prop-types";

const priceRanges = [
  { label: "All Prices", range: [0, Infinity] },
  { label: "TK 1 to TK 500", range: [1, 500] },
  { label: "TK 501 to TK 1000", range: [501, 1000] },
  { label: "TK 1001 to TK 2000", range: [1001, 2000] },
  { label: "TK 2001 and above", range: [2001, Infinity] },
];

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = [];

  const delta = 2;
  let left = currentPage - delta;
  let right = currentPage + delta;

  if (left < 1) {
    right += 1 - left;
    left = 1;
  }
  if (right > totalPages) {
    left -= right - totalPages;
    right = totalPages;
  }
  left = Math.max(left, 1);

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
      pageNumbers.push(i);
    } else if (pageNumbers[pageNumbers.length - 1] !== "...") {
      pageNumbers.push("...");
    }
  }

  return (
    <div className="flex justify-center gap-2 mt-6 items-center">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md border ${
          currentPage === 1
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white"
        }`}
      >
        Prev
      </button>

      {pageNumbers.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-1 text-gray-500 select-none">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`px-3 py-1 rounded-md border ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md border ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
}

const Collections = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0].range);
  const [selectedColor, setSelectedColor] = useState(""); // <-- কালার স্টেট যোগ করলাম
  const [searchTerm, setSearchTerm] = useState("");
  const [isGridView, setIsGridView] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 24;

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/products`);
      return data;
    },
  });

  const currentSubCategories =
    selectedCategory !== "all" ? subCategories[selectedCategory] || [] : [];

  const filteredProducts = allProducts.filter((product) => {
    const productCategory = product.category || "all";
    const productSubCategory = product.subCategory || "all";
    const productColor = product.color || ""; // <-- কালার

    const categoryMatch =
      selectedCategory === "all" ? true : productCategory === selectedCategory;

    const subCategoryMatch =
      selectedSubCategory === "all" ? true : productSubCategory === selectedSubCategory;

    const price = Number(product.price);
    const [minPrice, maxPrice] = selectedPriceRange;
    const priceMatch = price >= minPrice && price <= maxPrice;

    const colorMatch = selectedColor === "" ? true : productColor === selectedColor;

    const title = product.title || "";
    const searchMatch = title.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && subCategoryMatch && priceMatch && colorMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-2 py-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 border p-2 rounded-md shadow-sm space-y-8">
          {/* Categories */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Shop By Categories</h2>
            <div className="flex flex-col gap-2">
              {categories.map(({ catValue, catName }) => (
                <button
                  key={catValue}
                  onClick={() => {
                    setSelectedCategory(catValue);
                    setSelectedSubCategory("all");
                    setCurrentPage(1);
                  }}
                  className={`text-left px-4 py-1.5 rounded-md border ${
                    selectedCategory === catValue
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  } hover:bg-blue-500 hover:text-white transition`}
                >
                  {catName}
                </button>
              ))}
            </div>
          </div>

          {/* SubCategories */}
          {selectedCategory !== "all" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Shop By Subcategories</h2>
              <div className="flex flex-col gap-2">
                {currentSubCategories.length === 0 ? (
                  <p className="text-gray-500 italic">No subcategories available.</p>
                ) : (
                  currentSubCategories.map(({ catValue, catName }) => (
                    <button
                      key={catValue}
                      onClick={() => {
                        setSelectedSubCategory(catValue);
                        setCurrentPage(1);
                      }}
                      className={`text-left px-4 py-1.5 rounded-md border ${
                        selectedSubCategory === catValue
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700"
                      } hover:bg-blue-500 hover:text-white transition`}
                    >
                      {catName}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Price Filter */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Filter by Price</h2>
            <div className="flex flex-col gap-3">
              {priceRanges.map(({ label, range }) => (
                <button
                  key={label}
                  onClick={() => {
                    setSelectedPriceRange(range);
                    setCurrentPage(1);
                  }}
                  className={`text-left px-4 py-1.5 rounded-md border ${
                    selectedPriceRange === range
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  } hover:bg-blue-500 hover:text-white transition`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Filter by Color</h2>
            <div className="flex flex-col gap-2">
              {colors.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => {
                    setSelectedColor(value);
                    setCurrentPage(1);
                  }}
                  className={`text-left px-4 py-1.5 rounded-md border ${
                    selectedColor === value
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  } hover:bg-blue-500 hover:text-white transition`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid/List */}
        <section className="md:col-span-4">
          {/* Search + View toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full sm:w-72 border rounded-md px-4 py-2 focus:outline-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />

            <div className="flex gap-2 text-gray-600">
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-md hover:bg-blue-500 hover:text-white transition ${
                  isGridView ? "bg-blue-600 text-white" : "bg-white"
                }`}
                aria-label="Grid View"
              >
                <FaTh size={20} />
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-md hover:bg-blue-500 hover:text-white transition ${
                  !isGridView ? "bg-blue-600 text-white" : "bg-white"
                }`}
                aria-label="List View"
              >
                <FaBars size={20} />
              </button>
            </div>
          </div>

          {currentProducts.length === 0 ? (
            <p className="text-center text-gray-500">
              No products found matching the filters.
            </p>
          ) : isGridView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
              {currentProducts.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <div className="border rounded-lg p-2 shadow-sm hover:shadow-md transition group cursor-pointer overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-105"
                    />
                    <h2 className="text-base font-semibold">
                      {product?.title?.length > 20
                        ? product?.title.slice(0, 20) + "..."
                        : product?.title}
                    </h2>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-sm text-gray-500">Color: {product.color}</p>
                    <div className="flex items-center gap-1 my-2">
                      {[...Array(5)].map((_, i) =>
                        i < parseInt(product.ratings) ? (
                          <FaStar key={i} className="text-yellow-400 text-sm" />
                        ) : (
                          <FaRegStar key={i} className="text-gray-400 text-sm" />
                        )
                      )}
                    </div>
                    <p className="text-base font-bold text-blue-700">
                      TK {product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {currentProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="border rounded-lg p-2 shadow-sm hover:shadow-md transition flex items-center justify-between gap-4 group cursor-pointer overflow-hidden"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-32 h-24 object-cover rounded-md flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{product.title}</h2>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="text-sm text-gray-500">Color: {product.color}</p>
                      <div className="flex items-center gap-1 my-2">
                        {[...Array(5)].map((_, i) =>
                          i < parseInt(product.ratings) ? (
                            <FaStar key={i} className="text-yellow-400 text-sm" />
                          ) : (
                            <FaRegStar key={i} className="text-gray-400 text-sm" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-base font-bold text-blue-700 whitespace-nowrap">
                    TK {product.price}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {filteredProducts.length > productsPerPage && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Collections;

Collections.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};
