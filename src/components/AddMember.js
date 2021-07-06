import React from "react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddMember = () => {
  return (
    <Link
      to="/register"
      style={{
        color: "black",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
        float: "right",
        marginRight: "5px",
      }}
      className="item"
    >
      <Icon name="add user" /> Add Executive !
    </Link>
  );
};

export default AddMember;
