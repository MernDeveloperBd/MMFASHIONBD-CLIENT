import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useRole from "../../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "admin") return children;

  return <Navigate to="/dashboard" replace />;
};

AdminRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AdminRoute;
