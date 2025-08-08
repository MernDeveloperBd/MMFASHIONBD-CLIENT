import PropTypes from 'prop-types'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import UpdateProductForm from '../UpdateProductForm/UpdateProductForm'


import toast from 'react-hot-toast'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure'


const UpdateProductModal = ({ setIsEditModalOpen, isOpen, product, refetch }) => {
  
  const axiosSecure = UseAxiosSecure()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
     e.preventDefault()
    setLoading(true)
    const form = e.target
    const title = form.title.value
    const price = parseFloat(form.price.value)
    const oldPrice = parseFloat(form.discountPrice.value)
    const quantity = parseInt(form.quantity.value)
    const ratings = parseInt(form.ratings.value)
    const category = form.category.value
    const subCategory = form.subCategory.value
    const description = form.description.value  

  

    const updatedData = {
        title,
      price,
      oldPrice,
      category,
      subCategory,
      description,
      quantity,
      ratings,
      
    }

    try {
      await axiosSecure.put(`/products/${product._id}`, updatedData)
      toast.success('Product Updated Successfully!')
      refetch()
      setIsEditModalOpen(false)
    } catch (err) {
      console.error(err)
      toast.error('Failed to update product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsEditModalOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Update Product
                </DialogTitle>
                <div className='mt-2 w-full'>
                  <UpdateProductForm
                    handleSubmit={handleSubmit}
                    loading={loading}
                    defaultValues={product}
                  />
                </div>
                <hr className='mt-8 ' />
                <div className='mt-2 '>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

UpdateProductModal.propTypes = {
  setIsEditModalOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  product: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default UpdateProductModal
