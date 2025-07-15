import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Fragment, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../AuthProvider/AuthProvider';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PurchaseModal = ({ closeModal, isOpen, setIsOpen, product, refetch }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');

  const totalPrice = (product?.price || 0) * (totalQuantity || 1);

  const handleQuantity = (value) => {
    if (value > product?.quantity) {
      setTotalQuantity(product?.quantity);
      return toast.error("Quantity exceeds available stock");
    }
    if (value < 1) {
      setTotalQuantity(1);
      return toast.error("Quantity cannot be less than 1");
    }
    setTotalQuantity(value);
  };

  const handlePurchase = async () => {
    if (!address.trim()) return toast.error("Address is required");
    if (!mobile.trim()) return toast.error("Mobile number is required");

    const newPurchaseInfo = {
      customer: {
        name: user?.displayName || "Guest",
        email: user?.email || "N/A",
        userImage: user?.photoURL || "",
        phone: mobile.trim(),
        address: address.trim(),
      },
      productId: product?._id,
      title: product?.title,
      category: product?.category,
      price: product?.price,
      image: product?.image,
      description: product?.description,
      quantity: totalQuantity,
      totalPrice,
      status: 'Pending',
      orderDate: new Date(),
    };

    try {
      await axiosSecure.post('/orders', newPurchaseInfo);
      await axiosSecure.patch(`/products/quantity/${product?._id}`, {
        quantityToUpdate: totalQuantity,
        status: 'decrease',
      });

      toast.success("Purchase completed. Wait for seller reply");
      refetch();
      setIsOpen(false);
      navigate('/dashboard/my-orders');
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to complete purchase");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-xl font-semibold text-center text-gray-800 mb-4"
                >
                  Review Info Before Purchase
                </DialogTitle>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={product?.image}
                    alt="product"
                    className="w-24 h-24 object-cover rounded-lg shadow"
                  />
                  <div>
                    <p className="text-gray-700"><span className="font-medium">Product:</span> {product?.title}</p>
                    <p className="text-gray-700 mt-1"><span className="font-medium">Category:</span> {product?.category}</p>
                    <p className="text-gray-700 mt-1"><span className="font-medium">Price:</span> TK {product?.price}</p>
                    <p className="text-gray-700 mt-1"><span className="font-medium">Available qty:</span> {product?.quantity}</p>
                  </div>
                </div>

                <p className='pb-2'>
                  <span className='font-bold'>Courier charge:</span> <span className='text-green-700'>80 TK</span> (Only Khulna) And <span className='text-green-700'>150 TK</span> (Whole Bangladesh)
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max={product?.quantity}
                    value={totalQuantity}
                    onChange={(e) => handleQuantity(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                  <textarea
                    rows={3}
                    name="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>

                <div className="mb-6 text-right text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Total Price:</span> TK {totalPrice?.toFixed(2)}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                    onClick={handlePurchase}
                  >
                    Submit
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;

PurchaseModal.propTypes = {
  product: PropTypes.object,
  closeModal: PropTypes.func,
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  refetch: PropTypes.func,
};
