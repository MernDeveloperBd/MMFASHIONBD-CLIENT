
import PropTypes from "prop-types";
import categories from "../../../api/categories";
import  subCategories  from "../../../api/subCategories";
import { TbFidgetSpinner } from "react-icons/tb";

const UpdateProductForm = ({
  handleSubmit,
  loading,
  defaultValues,
}) => {


  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 px-2 md:px-4">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="space-y-6 w-full">
            {/* Title, Price, Discount Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="title">Product Title</label>
                <input
                  name="title"
                  id="title"
                  type="text"
                  defaultValue={defaultValues?.title || ""}
                  className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="price">Price</label>
                <input
                  name="price"
                  id="price"
                  type="number"
                  defaultValue={defaultValues?.price || ""}
                  className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="discountPrice">Old Price</label>
                <input
                  name="discountPrice"
                  id="discountPrice"
                  type="number"
                  defaultValue={defaultValues?.discountPrice || ""}
                  className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                />
              </div>
            </div>

            {/* Quantity, Category, SubCategory */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity">Quantity</label>
                <input
                  name="quantity"
                  id="quantity"
                  type="number"
                  defaultValue={defaultValues?.quantity || ""}
                  className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  defaultValue={defaultValues?.category || ""}
                  className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                  required
                >
                  {categories
                    .filter((cat) => cat.catValue !== "all")
                    .map(({ catValue, catName }) => (
                      <option key={catValue} value={catValue}>
                        {catName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="subCategory">Sub Category</label>
                <select
                  name="subCategory"
                  defaultValue={defaultValues?.subCategory || ""}
                  className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                  required
                >
                  {subCategories.map(({ catValue, catName }) => (
                    <option key={catValue} value={catValue}>
                      {catName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                defaultValue={defaultValues?.description || ""}
                className="block w-full h-32 px-4 py-3 border border-lime-300 rounded-md bg-white"
              ></textarea>
            </div>
            {/* Ratings & Submit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 text-sm">
                <label htmlFor="ratings">Ratings</label>
                <input
                  name="ratings"
                  id="ratings"
                  type="number"
                  max={5}
                  defaultValue={defaultValues?.ratings || ""}
                  className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                  required
                />
              </div>
              <div className="pt-5">
                <button
                  type="submit"
                  className="w-full p-3 text-white font-medium rounded bg-lime-500"
                  disabled={loading}
                >
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin m-auto" />
                  ) : (
                    "Update Product"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

UpdateProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setUploadImage: PropTypes.func.isRequired,
  setUploadImage1: PropTypes.func.isRequired,
  uploadImage: PropTypes.object,
  uploadImage1: PropTypes.object,
  loading: PropTypes.bool,
  defaultValues: PropTypes.object,
};

export default UpdateProductForm;
