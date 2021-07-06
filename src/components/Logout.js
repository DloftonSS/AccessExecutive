import React from "react";
import { LogoutUser } from "../actions/authActions";
import { useDispatch } from "react-redux";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  return (
    <Link
      to="/"
      style={{ fontSize: "1rem", position: "absolute", bottom: 10, left: 30 }}
      className="item"
      onClick={() => {
        dispatch(LogoutUser());
      }}
    >
      <Icon name="log out" /> Logout
    </Link>
  );
};

export default Logout;
