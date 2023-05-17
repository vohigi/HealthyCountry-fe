import React from "react";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({
  component: Component,
  userId,
  userRole,
  role,
  setAuthRedirectPath,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (!userId) {
        // not logged in so redirect to login page with the return url
        setAuthRedirectPath(props.location.pathname + props.location.search);
        return <Redirect to={{ pathname: "/login" }} />;
      }
      console.log(userRole);
      console.log(role);
      console.log(userId);
      //check if route is restricted by role
      if (userRole !== role && role !== "ANY" && userRole !== "ADMIN") {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }

      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
