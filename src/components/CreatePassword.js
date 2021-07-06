import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Message, Segment, Label } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { clearErrors } from "../actions/authActions";
import { Link } from "react-router-dom";

const CreatePassword = (props) => {
  const error = useSelector((state) => state.errors);
  const [errorMessage, setErrorMessage] = useState("");
  const [passError, setPassError] = useState("");
  const [successHandle, setSuccesshandle] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (error.message) {
      setErrorMessage(error.message);
      dispatch(clearErrors());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleClick = ({ password, confirm_password }) => {
    setPassError("");

    if (password.value !== confirm_password.value) {
      setPassError("Passwords do not match");
    } else if (!password.value || !confirm_password.value) {
      setPassError("Please fill out both fields");
    } else {
      const form = {
        password: password.value,
        confirm_password: confirm_password.value,
      };
      password.value = "";
      confirm_password.value = "";
      props.onSubmit(form);
      setSuccesshandle(
        "Password successfuly updated you may now return to the login in screen and login"
      );
    }
  };

  if (errorMessage) {
    return (
      <>
        <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          <p>{errorMessage}</p>
          <p>
            If you are trying to reset your password please{"   "}
            <Link to="/forgot">Click Here</Link>
          </p>
        </Message>
      </>
    );
  } else if (successHandle) {
    return (
      <>
        <Message success>
          <Message.Header>Success</Message.Header>
          <p>{successHandle}</p>
          <p>
            Please login by {"   "}
            <Link to="/">Clicking Here</Link>
          </p>
        </Message>
      </>
    );
  } else {
    return (
      <>
        <Form onSubmit={(event) => handleClick(event.target)} size="large">
          {passError ? (
            <Label className="alertMssg" basic color="red">
              {passError}
            </Label>
          ) : (
            ""
          )}

          <Segment>
            <Field name="password" component={renderInput} label="Password" />

            <Field
              name="confirm_password"
              component={renderInput}
              label="Confirm Password"
            />
            <Button secondary fluid size="large">
              {props.buttonText}
            </Button>
          </Segment>
        </Form>
      </>
    );
  }
};

const renderInput = ({ input, label }) => {
  return (
    <div className="field">
      <div className="ui fluid left icon input">
        <input
          {...input}
          autoComplete="off"
          placeholder={label}
          type={`${input.name === "email" ? "text" : "password"}`}
        />
        <i
          aria-hidden="true"
          className={`${input.name === "email" ? "user" : "lock"} icon`}
        ></i>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "createpassword",
})(CreatePassword);
