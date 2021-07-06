import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Segment, Label } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { clearErrors } from "../actions/authActions";

const CatalogNewItemForm = (props) => {
  const error = useSelector((state) => state.errors);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

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
          <h4>Create Item Details</h4>
          <Field name="item" component={renderItem} label="Item Name" />
          <Field
            name="description"
            component={renderArea}
            label="Item Description"
            type="textarea"
          />
          <Field name="quantity" component={renderItem} label="Item Quantity" />
          <Field name="price" component={renderItem} label="Item Price" />
          {errorMessage ? (
            <Label className="alertMssg" basic color="red">
              {errorMessage}
            </Label>
          ) : (
            ""
          )}

          <Button secondary fluid size="large">
            {props.buttonText}
          </Button>
        </Segment>
      </Form>
    </>
  );
};

const renderItem = ({ input, label }) => {
  return (
    <div className="field">
      <div className="ui fluid left icon input">
        <input {...input} autoComplete="off" placeholder={label} type="text" />
        <i aria-hidden="true"></i>
      </div>
    </div>
  );
};

const renderArea = ({ input, label }) => {
  return (
    <div className="field">
      <div className="ui fluid left icon input">
        <textarea {...input} placeholder={label}></textarea>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "catalognewitemform",
})(CatalogNewItemForm);
