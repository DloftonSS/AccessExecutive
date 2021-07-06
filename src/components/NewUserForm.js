import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Segment, Label, Modal } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { clearErrors } from "../actions/authActions";
import { useHistory } from "react-router-dom";

const NewUserForm = (props) => {
  const error = useSelector((state) => state.errors);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const newFunction = () => {
    setOpen(false);
    history.goBack();
  };
  useEffect(() => {
    if (error.message) {
      setErrorMessage(error.message);
      dispatch(clearErrors());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      <Form onSubmit={props.handleSubmit(props.onSubmit)} size="large">
        <Segment>
          <Field name="first_name" component={renderInput} label="First Name" />
          <Field name="last_name" component={renderInput} label="Last Name" />
          <Field name="email" component={renderInput} label="E-mail address" />
          {errorMessage ? (
            <Label className="alertMssg" basic color="red">
              {errorMessage}
            </Label>
          ) : (
            ""
          )}

          <Modal
            centered={false}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={
              <Button secondary fluid size="large">
                {props.buttonText}
              </Button>
            }
          >
            <Modal.Header>User Created</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                An email has been sent to the address provided.
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => newFunction()}>OK</Button>
            </Modal.Actions>
          </Modal>
        </Segment>
      </Form>
    </>
  );
};

const renderInput = ({ input, label }) => {
  return (
    <div className="field">
      <div className="ui fluid left icon input">
        <input
          {...input}
          autoComplete="off"
          placeholder={label}
          type={`${input.name === "password" ? "password" : "text"}`}
        />
        <i
          aria-hidden="true"
          className={`${input.name === "password" ? "lock" : "user"} icon`}
        ></i>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "newuserform",
})(NewUserForm);
