import { useContext, useState } from "react";
import { AuthContext } from "../../../Components/AuthProvider/AuthProvider";
import { imageUpload } from "../../../api/utils";
import { Helmet } from "react-helmet-async";
import AddProductForm from "../../../Components/Form/AddProductForm";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const [uploadImage, setUploadImage] = useState({ file: null, url: null });
  const [uploadImage1, setUploadImage1] = useState({ file: null, url: null });
  const [uploadImage2, setUploadImage2] = useState({ file: null, url: null });
  const [uploadImage3, setUploadImage3] = useState({ file: null, url: null });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value.trim();
    const price = parseFloat(form.price.value) || 0;
    const oldPrice = form.discountPrice.value ? parseFloat(form.discountPrice.value) : null;
    const quantity = parseInt(form.quantity.value) || 0;
    const ratings = parseInt(form.ratings.value) || 0;
    const category = form.category.value;
    const subCategory = form.subCategory.value;
    const popular = form.popular.value === "true";
    const description = form.description.value.trim();
    const color = form.color.value;

    try {
      const [imageUrl, imageUrl1, imageUrl2, imageUrl3] = await Promise.all([
        uploadImage.file ? imageUpload(uploadImage.file) : null,
        uploadImage1.file ? imageUpload(uploadImage1.file) : null,
        uploadImage2.file ? imageUpload(uploadImage2.file) : null,
        uploadImage3.file ? imageUpload(uploadImage3.file) : null,
      ]);

      const seller = {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      };

      const productData = {
        title,
        price,
        oldPrice,
        category,
        subCategory,
        popular,
        description,
        quantity,
        ratings,
        color,
        ...(imageUrl && { image: imageUrl }),
        ...(imageUrl1 && { image1: imageUrl1 }),
        ...(imageUrl2 && { image2: imageUrl2 }),
        ...(imageUrl3 && { image3: imageUrl3 }),
        seller,
      };

      await axiosSecure.post("/products", productData);
      toast.success("Product Added Successfully!");

      [uploadImage, uploadImage1, uploadImage2, uploadImage3].forEach(({ url }) => {
        if (url) URL.revokeObjectURL(url);
      });

      form.reset();
      setUploadImage({ file: null, url: null });
      setUploadImage1({ file: null, url: null });
      setUploadImage2({ file: null, url: null });
      setUploadImage3({ file: null, url: null });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Product | Dashboard</title>
      </Helmet>
      <AddProductForm
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        uploadImage1={uploadImage1}
        setUploadImage1={setUploadImage1}
        uploadImage2={uploadImage2}
        setUploadImage2={setUploadImage2}
        uploadImage3={uploadImage3}
        setUploadImage3={setUploadImage3}
        loading={loading}
      />
    </div>
  );
};

export default AddProduct;
