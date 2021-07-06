import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import API from "../../utils/API";
import {
  Card,
  Grid,
  Image,
  Icon,
  Table,
  state,
  Accordion,
  Button,
  handleClick,
} from "semantic-ui-react";
import { loadExec } from "../../actions/authActions";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style.css";
// import "./style.css";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "../../components/CheckoutForm";
// import StripeAPI from "../../utils/StripeAPI";
// const stripePromise = StripeAPI.getPublicKey().then((key) =>
//   loadStripe(key.data)
// );
function ExecutiveAccount(props) {
  const { token } = useSelector((state) => state.auth);

  const [memberDetails, setMemberDetails] = useState({});
  const [dates, setDates] = useState({
    date_joined: "",
    expiration_date: "",
  });
  const id = props.id;

  useEffect(() => {
    async function getDetails() {
      const options = {
        headers: {
          token: token,
        },
      };

      const { data } = await API.loadMember(id, options);

      setMemberDetails(data);

      let dateJoined = new Date(data.date_joined)
        .toUTCString()
        .split(" ")
        .slice(0, 4)
        .join(" ");

      let dateExpired = new Date(data.expiration_date)
        .toUTCString()
        .split(" ")
        .slice(0, 4)
        .join(" ");

      setDates({
        date_joined: dateJoined,
        expiration_date: dateExpired,
      });
    }
    getDetails();
  }, []);

  let history = useHistory();

  return (
    <div style={{ backgroundColor: "black" }}>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <h4 className="Hey" onClick={() => history.goBack()}>
            Account
          </h4>

          <Card
            fluid
            style={{
              width: "100%",
              marginRight: "10px",
              backgroundColor: "black",
              height: "100vh",
            }}
          >
            <Card.Content style={{ color: "white", top: "5%" }}>
              <Card.Header style={{ color: "white" }}>
                Derek Lofton
                <span>
                  <Link to={"/edit/member/" + memberDetails.id}>
                    <Icon
                      style={{ float: "right" }}
                      color="red"
                      name="edit outline"
                    />
                  </Link>
                </span>
              </Card.Header>
              <Card.Meta style={{ color: "white" }}>
                1349 S. OBT Lane Apopka, FL 90210
              </Card.Meta>
              <Card.Meta style={{ color: "white" }}>
                Coolemail123@email.com
              </Card.Meta>
              <Card.Meta style={{ color: "white" }}>407-305-2727</Card.Meta>
            </Card.Content>
            <Card.Content
              style={{ height: "100%", paddingTop: "30px", color: "white" }}
            >
              <Table
                style={{ backgroundColor: "black" }}
                celled
                striped
                color="red"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan="3" style={{ color: "white" }}>
                      Account Info
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell style={{ color: "white" }}>
                      <Icon
                        name="calendar check outline"
                        style={{ color: "white" }}
                      />
                      Join Date
                    </Table.Cell>
                    <Table.Cell style={{ color: "white" }}>
                      April 15, 2019
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ color: "white" }}>
                      <Icon
                        name="calendar times outline"
                        style={{ color: "white" }}
                      />
                      Expiration Date
                    </Table.Cell>
                    <Table.Cell style={{ color: "white" }}>
                      April 15, 2021
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ color: "white" }}>
                      <Icon
                        name="building outline"
                        style={{ color: "white" }}
                      />
                      Preferred Store
                    </Table.Cell>
                    <Table.Cell style={{ color: "white" }}>Apopka</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Content>
          </Card>

          {/* <div className="executive_container">
            <label for="first_name"></label>
            <input id="first_name"></input>
            <label for="middle_name"></label>
            <input id="middle_name"></input>
            <label for="last_name"></label>
            <input id="last_name"></input>
            <label for="email"></label>
            <input id="email"></input>
            <label for="phone_number"></label>
            <input id="phone_number"></input>
            <label for="address"></label>
            <input id="address"></input>
            <label for="prefered_store"></label>
            <input id="prefered_store"></input>
            <label for="id"></label>
            <input id="id"></input>
            <label for="expiration_date"></label>
            <input id="expiration_date"></input>
          </div> */}
        </Grid.Column>
      </Grid>
    </div>
  );
}
export default ExecutiveAccount;
