import React from "react";
import { Header } from "semantic-ui-react";
import NewUserForm from "../../components/NewUserForm";
import { useDispatch } from "react-redux";
import { createUser } from "../../actions/authActions";
import HeaderComponent from "../../components/HeaderComponent";

const CreateNewUser = (props) => {
  const dispatch = useDispatch();

  const onFormSubmit = (formVal) => {
    dispatch(createUser(formVal));
  };

  return (
    <div style={{ width: "100%", overflowY: "scroll", scrollbarWidth: "1px" }}>
      <HeaderComponent title={"New User"} icon={"add user"} />
      <div className="form-container">
        <Header as="h2" secondary="true" textAlign="center">
          Create New User
        </Header>
        <NewUserForm buttonText="Create User" onSubmit={onFormSubmit} />
      </div>
    </div>
  );
};

export default CreateNewUser;
