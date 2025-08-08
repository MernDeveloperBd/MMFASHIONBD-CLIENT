import { useState } from 'react';
import DeleteModal from '../../Modals/DeleteModal/DeleteModal';
import UpdateProductModal from '../UpdateProductModal/UpdateProductModal';
import PropTypes from 'prop-types';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import toast from 'react-hot-toast';

const ProductDataRow = ({ productData, refetch }) => {
  const axiosSecure = UseAxiosSecure();

  // Delete modal state
  const [isOpen, setIsOpen] = useState(false);

  // Update modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { image, title, category, price, quantity, _id } = productData || {};

  // Delete modal open/close
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Handle delete
  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/products/${_id}`);
      toast.success('Product successfully deleted');
      refetch();
    } catch (error) {
      toast.error(error?.response?.data || 'Delete failed');
    } finally {
      closeModal();
    }
  };

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='product'
                src={image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{title}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{category}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>TK {price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{quantity}</p>
      </td>

      {/* Delete Button */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={openModal}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </span>
        <DeleteModal
          handleDelete={handleDelete}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>

      {/* Update Button */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsEditModalOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </span>

        {/* ✅ এখানে product ও refetch পাঠানো হয়েছে */}
        <UpdateProductModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          product={productData}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

ProductDataRow.propTypes = {
  productData: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ProductDataRow;
