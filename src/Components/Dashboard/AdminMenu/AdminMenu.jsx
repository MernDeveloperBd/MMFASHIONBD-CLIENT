import { FaUserCog } from 'react-icons/fa'
import MenuItem from '../MenuItem/MenuItem'
import { BsGraphUp, BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsGraphUp}
        label='Statistics'
        address='/dashboard'
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Product'
        address='add-product'
      />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      />
    </>
  )
}

export default AdminMenu