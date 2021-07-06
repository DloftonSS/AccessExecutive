import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Message, Segment, Label } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { clearErrors } from "../actions/authActions";
import { Link } from "react-router-dom";

const ExecutiveRegisterForm = (props) => {
  const { err } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [passError, setPassError] = useState("");
  const [successHandle, setSuccesshandle] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (err.message) {
      setErrorMessage(err.message);
      setSuccesshandle("");
      setPassError("");
      dispatch(clearErrors());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [err]);
  const handleClick = ({ email, id }) => {
    setPassError("");

    if (!email.value || !id.value) {
      setPassError("Please fill out both fields");
    } else {
      const form = {
        email: email.value,
        id: id.value,
      };
      email.value = "";
      id.value = "";
      props.onSubmit(form);
      setSuccesshandle(
        "An E-Mail has been sent to the email address provided, Please check your email and follow the instructions to reset your password."
      );
    }
  };

  if (err) {
    return (
      <>
        <Message error>
          {err}
          <p>
            or try again by clicking{" "}
            <Link to="/activate" onClick={() => window.location.reload()}>
              Here
            </Link>
          </p>
        </Message>
      </>
    );
  } else {
    return (
      <>
        <Form onSubmit={(event) => handleClick(event.target)} size="large">
          <Segment>
            {err ? (
              <Label className="alertMssg" basic color="red">
                {err}
              </Label>
            ) : (
              ""
            )}
            {passError ? (
              <Label className="alertMssg" basic color="red">
                {passError}
              </Label>
            ) : (
              ""
            )}
            {successHandle ? (
              <Label className="alertMssg" basic color="green">
                {successHandle}
                Return to login screen by {"   "}
                <Link to="/">Clicking Here</Link>
              </Label>
            ) : (
              ""
            )}
            <Message>
              Please fill out the form to activate your account.
            </Message>
            <Message>
              You Executive ID can be found on your exectuive card and use your
              email that you used when you signed up for the Executive Access
              Club
            </Message>
            <Field name="id" component={renderInput} label="Executive ID" />
            {errorMessage ? (
              <Label className="alertMssg" basic color="red">
                {errorMessage}
              </Label>
            ) : (
              ""
            )}
            <Field name="email" component={renderInput} label="Email Address" />
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
        <input {...input} autoComplete="off" placeholder={label} type="text" />
      </div>
    </div>
  );
};

export default reduxForm({
  form: "executiveregisterform",
})(ExecutiveRegisterForm);
