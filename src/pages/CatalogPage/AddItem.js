import React from "react";
import { Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddItem = () => {
  return (
    <Link
      to="/catalog/newitem"
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
      <Button icon labelPosition="left" color="red">
        <Icon name="plus" /> Add New Item
      </Button>
    </Link>
  );
};

export default AddItem;
