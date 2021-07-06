import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Message, Segment, Label } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { clearErrors } from "../actions/authActions";
import { Link } from "react-router-dom";

const ForgotForm = (props) => {
  const error = useSelector((state) => state.errors);
  const [passError, setPassError] = useState("");
  const [errorMessge, setErrorMessage] = useState("");
  const [successHandle, setSuccesshandle] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (error.message) {
      setErrorMessage(error.message);
      dispatch(clearErrors());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleClick = ({ email, confirm_email }) => {
    setPassError("");

    if (email.value !== confirm_email.value) {
      setPassError("Emails do not match");
    } else if (!email.value || !confirm_email.value) {
      setPassError("Please fill out both fields");
    } else {
      const form = {
        email: email.value,
        confirm_email: confirm_email.value,
      };
      email.value = "";
      confirm_email.value = "";
      props.onSubmit(form);
      setSuccesshandle(
        "An E-Mail has been sent to the email address provided, Please check your email and follow the instructions to reset your password."
      );
    }
  };

  if (successHandle) {
    return (
      <>
        <Message success>
          <Message.Header>Success</Message.Header>
          <p>{successHandle}</p>
          <p>
            Return to login screen by {"   "}
            <Link to="/admin">Clicking Here</Link>
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
            <Field name="email" component={renderInput} label="E-Mail" />

            <Field
              name="confirm_email"
              component={renderInput}
              label="Confirm E-Mail"
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
        <input {...input} autoComplete="off" placeholder={label} type="email" />
        <i aria-hidden="true" className="user icon"></i>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "forgotform",
})(ForgotForm);
