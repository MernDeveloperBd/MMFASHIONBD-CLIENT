import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"
import LoadingSpinner from "../Shared/LoadingSpinner"
import { useContext } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"


const SellerRoute = ({children}) => {
     const { user, loading } = useContext(AuthContext)
    
      if (loading) return <LoadingSpinner />
      if (user) return children;
      return <Navigate to='/dashboard' replace='true' />
    }
  
export default SellerRoute;
  
    SellerRoute.propTypes = {
      children: PropTypes.element,
    }
