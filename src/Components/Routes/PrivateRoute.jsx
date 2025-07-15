import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from '../AuthProvider/AuthProvider'
import LoadingSpinner from '../Shared/LoadingSpinner'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) return <LoadingSpinner />
  if (user) return children
  return <Navigate to='/login' state={{ from: location }} replace='true' />
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
}

export default PrivateRoute