import React, { useEffect } from "react";
import { Header } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import UserForm from "../../components/UserForm";
import { loginUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

const Login = (props) => {
  // access to the isAuthenticated property from the auth reducer state
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && role == "admin") {
      props.history.push("/dashboard");
    }
    if (isAuthenticated && role == "user") {
      props.history.push("/executive");
    }
    if (isAuthenticated && role == "manager") {
      props.history.push("/manager");
    }
  });

  const renderFormMessage = () => {
    return (
      <>
        Forgot your password? <Link to="/forgot">Reset</Link>
      </>
    );
  };

  const onFormSubmit = (formVal) => {
    dispatch(loginUser(formVal));
  };

  return (
    <div className="form-container">
      <Header as="h2" secondary="true" textAlign="center">
        Admin Login
      </Header>
      <UserForm
        renderMessage={renderFormMessage}
        buttonText="Login"
        onSubmit={onFormSubmit}
      />
    </div>
  );
};

export default Login;
