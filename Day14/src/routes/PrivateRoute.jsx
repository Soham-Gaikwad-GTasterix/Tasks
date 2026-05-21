import {
  Navigate
} from "react-router-dom";


function PrivateRoute({
  isAuthenticated,
  children
}) {

  if (!isAuthenticated) {

    return (
      <Navigate to="/" />
    );
  }

  return children;
}

export default PrivateRoute;