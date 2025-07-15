import { useState } from 'react'
import PropTypes from 'prop-types'
import UpdateUserModal from '../UpdateUserModal/UpdateUserModal'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure'
import toast from 'react-hot-toast'
const UserDataRow = ({userData, refetch}) => {
  const axiosSecure = UseAxiosSecure()
  const [isOpen, setIsOpen] = useState(false)
  const{email, role, status } = userData;
  // handle user role
const updateRole = async(selectedRole) =>{
  if(role === selectedRole) return
  try {
    await axiosSecure.patch(`/user/role/${email}`,{role:selectedRole})
    toast.success(`Role update to ${selectedRole} successful`)
    refetch()
    
  } catch (error) {
    toast.error(error?.response?.data)
    
  }finally{
    setIsOpen(false)
  }
}
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className={`${status === 'Requested' && 'text-yellow-500'} ${status === 'Verified' && 'text-green-600'} whitespace-no-wrap`}>{status ? status : <span className='text-red-500'>Unavailable</span>}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </span>
        {/* Modal */}
        <UpdateUserModal role={role} updateRole={updateRole} isOpen={isOpen} setIsOpen={setIsOpen} />
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
  userData: PropTypes.object,
}

export default UserDataRow