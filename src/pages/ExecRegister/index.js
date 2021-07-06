import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import API from "../../utils/API";
import ExecutiveRegisterForm from "../../components/ExecRegisterForm";

function ExecRegister() {
  const [err, setErr] = useState("");
  useEffect(() => {}, []);

  const onFormSubmit = async (formData) => {
    console.log(formData);
    try {
      const data = await API.registerExec(formData);
    } catch (err) {
      console.log(err.message);
      setErr(
        "ID and Email do not match, Please contact support at Exectuve@shoot-straight.com"
      );
    }
  };
  return (
    <div className="form-container">
      <Card>
        <ExecutiveRegisterForm
          onSubmit={onFormSubmit}
          buttonText="Submit"
          err={err}
        />
      </Card>
    </div>
  );
}

export default ExecRegister;
