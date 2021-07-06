import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ManagerRoute = ({ component: Component, ...rest }) => {
  // access isAuthenticated from state auth
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const { role } = useSelector((state) => state.auth);

  if (!role) {
    return (
      <Route
        {...rest}
        render={(props) => (
          // <Redirect
          //   to={{
          //     pathname: "/",
          //     state: { from: props.location },
          //   }}
          // />
          <Redirect to="/" />
        )}
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) =>
          //if isAuthenticated is true, show component

          isAuthenticated ? (
            role == "admin" || role == "manager" ? (
              <Component {...props} />
            ) : (
              // else redirect to the login page
              // <Redirect
              //   to={{
              //     pathname: "/",
              //     state: { from: props.location },
              //   }}
              // />
              <Redirect to="/" />
            )
          ) : (
            // <Redirect
            //   to={{
            //     pathname: "/",
            //     state: { from: props.location },
            //   }}
            // />
            <Redirect to="/" />
          )
        }
      />
    );
  }
};

export default ManagerRoute;
