import React from "react";
import { Form, Card, Icon, Divider, Header, Message } from "semantic-ui-react";
import { useSelector } from "react-redux";
import MyAccount from "../../components/MyAccount";
import { useHistory } from "react-router-dom";
import { lastDayOfWeekWithOptions } from "date-fns/fp";

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

const Register = () => {
  let history = useHistory();
  const { role } = useSelector((state) => state.auth);

  const doThis = async (e) => {
    console.log(e);
  };
  return (
    <div style={{ width: "100%", overflowY: "scroll" }}>
      <Message className="message-container" secondary="true">
        {role == "admin" ? <MyAccount /> : ""}
        <Header size="huge">
          <Icon name="user plus" /> New Executive
        </Header>
        {role == "admin" ? (
          <Icon
            size="big"
            name="arrow alternate circle left outline"
            color="red"
            onClick={() => history.goBack()}
          />
        ) : (
          ""
        )}
      </Message>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "1rem",
        }}
        className="form-container"
      >
        <Card
          fluid
          style={{ display: "flex", padding: "1rem", overflowY: "scroll" }}
        >
          <Form
            //   error={error} success={success} loading={loading}
            onSubmit={(e) => doThis(e)}
          >
            <Divider horizontal>
              <Header as="h4">
                <Icon name="user" />
                Customer Info
              </Header>
            </Divider>
            <Form.Group
              style={{ display: "flex", padding: "1rem" }}
              widths="equal"
            >
              <Form.Input
                fluid
                label="First Name"
                name="first_name"
                placeholder="John"
                required={true}
              />
              <Form.Input
                fluid
                label="Last Name"
                name="last_name"
                placeholder="Doe"
                required={true}
              />
              <Form.Input fluid label="DOB" required={true} />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Phone Number"
                name="phone_number"
                placeholder="Phone Number"
                required={true}
              />
              <Form.Input
                fluid
                label="E-Mail"
                name="email"
                placeholder="email"
                required={true}
              />
              <Form.Input fluid label="Drivers License" required={true} />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Address"
                name="address"
                placeholder="Address"
                required={true}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="City"
                name="city"
                placeholder="City"
                required={true}
              />
              <Form.Input
                fluid
                label="State"
                name="State"
                placeholder="State"
                required={true}
              />
              <Form.Input
                fluid
                label="Zip"
                name="Zip"
                placeholder="Zip"
                required={true}
              />
              <Form.Input fluid label="Residency Status" required={true} />
            </Form.Group>

            <Divider horizontal style={{ display: "flex", padding: "1rem" }}>
              <Header as="h4">
                <Icon name="crosshairs" />
                ATF
              </Header>
            </Divider>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="City and State of birth"
                name="City and State of birth"
                placeholder="City and State of birth"
                required={true}
              />
              <Form.Input
                fluid
                label="Gender"
                name="Gender"
                placeholder="Gender"
                required={true}
              />
              <Form.Input
                fluid
                label="Enthnicity"
                name="Enthnicity"
                placeholder="Enthnicity"
                required={true}
              />
              <Form.Input
                fluid
                label="Race"
                name="Race"
                placeholder="Race"
                required={true}
              />
            </Form.Group>
            <Divider horizontal style={{ display: "flex", padding: "1rem" }}>
              <Header as="h4">
                <Icon name="building" />
                Store Info
              </Header>
            </Divider>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                label="Preferred Store"
                name="preferred_store"
                options={stores}
                required={true}
              />

              <Form.Input fluid label="Referred From" required={true} />
              <Form.Input fluid label="Proccessed By" required={true} />
              <Form.Input fluid label="SS Email" required={true} />
              <Form.Input fluid label="Commission pay to" required={true} />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
