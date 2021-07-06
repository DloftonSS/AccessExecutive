import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Popup } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import { LogoutUser } from "../actions/authActions";

const MyAccount = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Popup
      on="click"
      trigger={
        <p
          style={{
            float: "right",
            color: "black",
            marginRight: "0",
            marginTop: "-40px",
            cursor: "pointer",
          }}
        >
          <Icon name="user circle outline" />
          {currentUser.email}
          <Icon name="dropdown" />
        </p>
      }
      flowing
      hoverable
    >
      {/* <Button>Edit Account</Button> */}

      <Link to="/settings">
        <Button color="default">Settings</Button>
      </Link>
      <Link to="/" onClick={() => dispatch(LogoutUser())}>
        <Button color="secondary">Log Out</Button>
      </Link>
    </Popup>
  );
};

export default MyAccount;
