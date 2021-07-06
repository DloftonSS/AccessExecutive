import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { Form, Icon, Card, Message } from "semantic-ui-react";
import HeaderComponent from "../../components/HeaderComponent";
import { useSelector } from "react-redux";

const stores = [
  { key: "1", text: "Apopka", value: "Apopka" },
  { key: "2", text: "Clearwater", value: "Clearwater" },
  { key: "3", text: "Fort Lauderdale", value: "Fort Lauderdale" },
  { key: "4", text: "Lakeland", value: "Lakeland" },
  { key: "5", text: "Casselberry", value: "Casselberry" },
  { key: "6", text: "Sarasota", value: "Sarasota" },
  { key: "7", text: "West Palm Beach", value: "West Palm Beach" },
  { key: "8", text: "Fort Myers", value: "Fort Myers" },
];

const errorMessages = {
  empty:
    "No changes have been made. Please fill out the fields you wish to change",
  error: "Something went wrong. Please try again or contact the web team.",
};

function EditMember(props) {
  const { token } = useSelector((state) => state.auth);
  const { id } = props.match.params;
  const [memberDetails, setMemberDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [memberUpdate, setMemberUpdate] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState({
    header: "Failed",
    message: "Something went wrong. Please try again or contact the web team",
  });

  async function loadMember() {
    const { data } = await API.loadMember(id);

    setMemberDetails(data);
  }

  function handleUpdate(event, data) {
    const { name, value } = event.target;
    if (data) {
      setMemberUpdate({ ...memberUpdate, preferred_store: data });
    } else {
      setMemberUpdate({ ...memberUpdate, [name]: value });
    }
  }

  async function displayUser() {
    setSuccess(false);
    setError(false);
    setLoading(true);
    if (Object.keys(memberUpdate).length === 0) {
      setErrMessage({ ...errMessage, message: errorMessages.empty });
      setError(true);
      setLoading(false);
    } else {
      for (let field in memberUpdate) {
        if (memberUpdate.hasOwnProperty(field)) {
          if (field == "first_name") {
            setMemberDetails({
              ...memberDetails,
              first_name: memberUpdate[field],
            });
          }
          if (field == "last_name") {
            setMemberDetails({
              ...memberDetails,
              last_name: memberUpdate[field],
            });
          }
        }
      }
    }
    const memberid = memberDetails.id;
    const options = {
      headers: {
        token: token,
      },
    };
    const updated = await API.editMember(memberUpdate, memberid, options);
    loadMember();
    setLoading(false);
    setSuccess(true);
  }

  useEffect(() => {
    loadMember();
    setLoading(false);
  }, []);

  return (
    <div style={{ width: "100%", overflowY: "scroll" }}>
      <HeaderComponent title={"Edit Member"} icon={"user"} link={"/members"} />
      <Card fluid>
        <Card.Content>
          <Form error={error} success={success} loading={loading}>
            <Message success>
              <Icon name="close" onClick={() => setSuccess(false)} />
              Success: The users information has been updated.
            </Message>
            <Message error>
              <Icon name="close" onClick={() => setError(false)} />
              {errMessage.header}: {errMessage.message}
            </Message>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="First Name"
                name="first_name"
                placeholder={memberDetails.first_name}
                onChange={(event) => handleUpdate(event)}
              />
              <Form.Input
                fluid
                label="Last Name"
                name="last_name"
                placeholder={memberDetails.last_name}
                onChange={(event) => handleUpdate(event)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Phone Number"
                name="phone_number"
                placeholder={memberDetails.phone_number}
                onChange={(event) => handleUpdate(event)}
              />
              <Form.Input
                fluid
                label="E-Mail"
                name="email"
                placeholder={memberDetails.email}
                onChange={(event) => handleUpdate(event)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Address"
                name="address"
                placeholder={memberDetails.address}
                onChange={(event) => handleUpdate(event)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                label="Change Preferred Store"
                name="preferred_store"
                options={stores}
                onChange={(event, { value }) =>
                  handleUpdate(event, value.toString())
                }
              />
              <Form.Input
                fluid
                label="Preferred Store"
                readOnly
                placeholder={memberDetails.preferred_store}
              />
            </Form.Group>
            <Form.Button onClick={displayUser}>Submit</Form.Button>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}

export default EditMember;
