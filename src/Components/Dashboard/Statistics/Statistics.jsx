import { Helmet } from 'react-helmet-async'
import AdminStatistics from './AdminStatistics'
import useRole from '../../../Hooks/useRole'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../../Shared/LoadingSpinner'


const Statistics = () => {
    const[role, isLoading] = useRole()   
    if(isLoading) return <LoadingSpinner/>
    if(role === 'customer') return <Navigate to='/dashboard/my-orders' replace/>
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <AdminStatistics />
    </div>
  )
}

export default Statistics