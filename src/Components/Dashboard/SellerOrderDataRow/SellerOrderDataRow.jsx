import PropTypes from 'prop-types'
import { useState } from 'react'
import DeleteModal from '../../Modals/DeleteModal/DeleteModal'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure'
import toast from 'react-hot-toast'

const SellerOrderDataRow = ({ orderData, refetch }) => {
  const axiosSecure = UseAxiosSecure();
  const {
    customer,
    title,
    price,
    quantity,
    address,
    _id,
    status,
    productId,
  } = orderData || {};

  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/orders/${_id}`);
      // increase product quantity again
      if (productId && quantity) {
        await axiosSecure.patch(`/products/quantity/${productId}`, {
          quantityToUpdate: quantity,
          status: 'increase',
        });
      }
      toast.success('Order Cancel successful');
      refetch();
    } catch (error) {
      toast.error(error?.response?.data || 'Something went wrong');
    } finally {
      closeModal();
    }
  };

  // handle status change
  const handleStatusChange = async (newStatus) => {
    if (status === newStatus) return;
    try {
      await axiosSecure.patch(`/orders/${_id}`, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      toast.error(error?.response?.data || 'Failed to update status');
    } finally {
      closeModal();
    }
  };

  return (
    <tr>
      <td className='px-3 py-3 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {customer?.name || 'N/A'}
        </p>
      </td>
      <td className='px-3 py-3 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {customer?.email || 'N/A'}
        </p>
      </td>
      <td className='px-3 py-3 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>TK {price || 0}</p>
      </td>
      <td className='px-3 py-3 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{quantity || 1}</p>
      </td>
      <td className='px-3 py-3 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {address || customer?.address || 'N/A'}
        </p>
      </td>
      <td className='px-3 py-3 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{status || 'Pending'}</p>
      </td>
      <td className='px-3 py-3 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center gap-2'>
          <select
            required
            defaultValue={status}
            disabled={status === 'Delivered'}
            onChange={(e) => handleStatusChange(e.target.value)}
            className='p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white'
            name='category'
          >
            <option value='Pending'>Pending</option>
            <option value='In Progress'>Start Processing</option>
            <option value='Delivered'>Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            disabled={status === 'Delivered'}
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
          >
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Cancel</span>
          </button>
        </div>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
        />
      </td>
    </tr>
  );
};

SellerOrderDataRow.propTypes = {
  orderData: PropTypes.object,
  refetch: PropTypes.func,
};

export default SellerOrderDataRow;
