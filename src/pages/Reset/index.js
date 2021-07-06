import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { newUserPassword, resetPassword } from "../../actions/authActions";
import ResetPasswordForm from "../../components/ResetPasswordForm";
import API from "../../utils/API";

function Reset(props) {
  const dispatch = useDispatch();
  const { newPW } = useSelector((state) => state.auth);
  const [userID, setUserID] = useState("");
  const { password_token } = props.match.params;

  useEffect(() => {
    getUser();
  }, [newPW]);

  const getUser = async () => {
    dispatch(newUserPassword(password_token));
    const user = await API.newUser(password_token);

    setUserID(user.data.id);
  };
  const onFormSubmit = async (formVal) => {
    const formData = { ...formVal, password_token };
    dispatch(resetPassword(formData));
  };
  return (
    <div className="form-container">
      <div>
        <Card>
          <ResetPasswordForm onSubmit={onFormSubmit} buttonText="Submit" />
        </Card>
      </div>
    </div>
  );
}

export default Reset;
