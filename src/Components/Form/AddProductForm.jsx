import PropTypes from "prop-types";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { categories, subCategories, colors } from "../../Components/filtersData"; // ইম্পোর্টে colors যোগ করো

const AddProductForm = ({
  handleSubmit,
  uploadImage,
  setUploadImage,
  uploadImage1,
  setUploadImage1,
  uploadImage2,
  setUploadImage2,
  uploadImage3,
  setUploadImage3,
  loading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const currentSubCategories = selectedCategory ? subCategories[selectedCategory] || [] : [];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleImageChange = (e, setImage, currentImage) => {
    const file = e.target.files[0];
    if (file) {
      if (currentImage?.url) {
        URL.revokeObjectURL(currentImage.url);
      }
      setImage({ file, url: URL.createObjectURL(file) });
    }
  };

  const images = [
    { uploadImage, setUploadImage, name: "image", label: "Upload Image 1" },
    { uploadImage: uploadImage1, setUploadImage: setUploadImage1, name: "image1", label: "Upload Image 2" },
    { uploadImage: uploadImage2, setUploadImage: setUploadImage2, name: "image2", label: "Upload Image 3" },
    { uploadImage: uploadImage3, setUploadImage: setUploadImage3, name: "image3", label: "Upload Image 4" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold pb-2 text-green-700">Add Product</h2>
      <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 px-2 md:px-4">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="main space-y-6 w-full">
            {/* Title, Price, Old Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="title" className="block text-gray-600">Product Title</label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="title"
                  id="title"
                  type="text"
                  placeholder="Product Title"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">Price</label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price per unit"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="discountPrice" className="block text-gray-600">Old Price</label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="discountPrice"
                  id="discountPrice"
                  type="number"
                  placeholder="Old price (optional)"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Quantity, Category, SubCategory, Popular, Color */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">Quantity</label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="quantity"
                  id="quantity"
                  type="number"
                  placeholder="Quantity"
                  required
                  min="0"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="category" className="block text-gray-600">Category</label>
                <select
                  required
                  className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="category"
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.catValue} value={cat.catValue}>
                      {cat.catName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="subCategory" className="block text-gray-600">Sub Category</label>
                <select
                  className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="subCategory"
                  id="subCategory"
                  disabled={!selectedCategory}
                  value={selectedSubCategory}
                  onChange={handleSubCategoryChange}
                >
                  {currentSubCategories.length > 0 ? (
                    currentSubCategories.map((sub) => (
                      <option key={sub.catValue} value={sub.catValue}>
                        {sub.catName}
                      </option>
                    ))
                  ) : (
                    <option value="">Select Category First</option>
                  )}
                </select>
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="popular" className="block text-gray-600">Popular</label>
                <select
                  
                  className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="popular"
                  id="popular"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>

              {/* Color select dropdown */}
              <div className="space-y-1 text-sm">
                <label htmlFor="color" className="block text-gray-600">Color</label>
                <select
                  name="color"
                  id="color"
                  className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  value={selectedColor}
                  onChange={handleColorChange}
                  
                >
                  <option value="">Select Color</option>
                  {colors.map((col) => (
                    <option key={col.value} value={col.value}>
                      {col.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">Description</label>
              <textarea
                id="description"
                placeholder="Write product description here..."
                className="block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-lime-300 bg-white focus:outline-lime-500"
                name="description"
                required
              />
            </div>

            {/* Images upload */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {images.map(({ uploadImage, setUploadImage, name, label }, idx) => (
                <div key={idx}>
                  <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                    <label>
                      <input
                        onChange={(e) => handleImageChange(e, setUploadImage, uploadImage)}
                        className="hidden"
                        type="file"
                        name={name}
                        accept="image/*"
                      />
                      <div className="bg-lime-500 text-white rounded font-semibold cursor-pointer p-1 px-3">
                        {uploadImage?.file?.name || label}
                      </div>
                    </label>
                  </div>
                  {uploadImage?.file && (
                    <div className="flex gap-5 items-center mt-2">
                      <img
                        className="w-20"
                        src={uploadImage.url}
                        alt={`Preview ${idx + 1}`}
                      />
                      <p>Size: {uploadImage.file.size} Bytes</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Ratings and Submit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="ratings" className="block text-gray-600">Ratings</label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="ratings"
                  id="ratings"
                  type="number"
                  max={5}
                  min={0}
                  placeholder="Rating (max 5)"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="ratings" className="block text-gray-600">Product Code</label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="productCode"
                  id="productCode"
                  type="text"
                  placeholder="Product Code"
                  
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 mt-5 text-center font-medium text-white rounded shadow-md bg-lime-500"
                disabled={loading}
              >
                {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Save & Continue"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

AddProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setUploadImage: PropTypes.func.isRequired,
  setUploadImage1: PropTypes.func.isRequired,
  setUploadImage2: PropTypes.func.isRequired,
  setUploadImage3: PropTypes.func.isRequired,
  uploadImage: PropTypes.shape({
    file: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    url: PropTypes.string,
  }),
  uploadImage1: PropTypes.shape({
    file: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    url: PropTypes.string,
  }),
  uploadImage2: PropTypes.shape({
    file: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    url: PropTypes.string,
  }),
  uploadImage3: PropTypes.shape({
    file: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    url: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

AddProductForm.defaultProps = {
  uploadImage: { file: null, url: null },
  uploadImage1: { file: null, url: null },
  uploadImage2: { file: null, url: null },
  uploadImage3: { file: null, url: null },
  loading: false,
};

export default AddProductForm;
