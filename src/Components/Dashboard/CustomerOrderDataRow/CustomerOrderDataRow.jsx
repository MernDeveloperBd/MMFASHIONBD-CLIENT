import PropTypes from 'prop-types'
import { useState } from 'react'
import DeleteModal from '../../Modals/DeleteModal/DeleteModal';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import toast from 'react-hot-toast';

const CustomerOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = UseAxiosSecure()
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const { _id, quantity, productId, status } = order;
  // handl delete order/cancelation
  const handleDelete = async () => {
    try {
      //fetch delete data
      await axiosSecure.delete(`/orders/${_id}`)
      //Increase quantity from product collection
      await axiosSecure.patch(`/products/quantity/${productId}`, { quantityToUpdate: quantity, status: 'increase' })
      toast.success("Order Cancel successful")
      refetch()
    } catch (error) {
      toast.error(error?.response?.data)
    } finally {
      closeModal()
    }
  }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={order?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{order?.title}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{order?.category}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>TK {order?.price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{order?.quantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{order?.status}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          disabled={status === 'Delivered'}
          className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
        >
          <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
          <span className='relative cursor-pointer'>Cancel</span>
        </button>

        <DeleteModal isOpen={isOpen} closeModal={closeModal} handleDelete={handleDelete} />
      </td>
    </tr>
  )
}


export default CustomerOrderDataRow;
CustomerOrderDataRow.propTypes = {
  order: PropTypes.object,
  refetch: PropTypes.func,
}
