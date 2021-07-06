import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { newUserPassword, updateExecPassword } from "../../actions/authActions";
import CreatePassword from "../../components/CreatePassword";
import API from "../../utils/API";

function ExecActivate(props) {
  const dispatch = useDispatch();
  const { newPW } = useSelector((state) => state.auth);

  const [userID, setUserID] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { password_token } = props.match.params;
      console.log(password_token);
      //   dispatch(newUserPassword(password_token));
      const user = await API.activateExec(password_token);
      console.log(user);
      setUserID(user.data.id);
    };
    getUser();
  }, [newPW]);

  const onFormSubmit = async (formVal) => {
    const formData = { ...formVal, id: userID };
    dispatch(updateExecPassword(formData));
  };
  return (
    <div className="form-container">
      <div>
        <Card>
          <CreatePassword onSubmit={onFormSubmit} buttonText="Submit" />
        </Card>
      </div>
    </div>
  );
}

export default ExecActivate;
