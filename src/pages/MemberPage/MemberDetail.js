import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { Icon, Card, Table, Checkbox } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function MemberDetail(props) {
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

  return (
    <Card fluid style={{ width: "50%", marginRight: "10px" }}>
      <Card.Content>
        <Card.Header>
          {memberDetails.first_name} {memberDetails.last_name}{" "}
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
        <Card.Meta>
          {memberDetails.address ? (
            <span className="date">{memberDetails.address}</span>
          ) : (
            <span className="date">No address given</span>
          )}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Icon name="phone" style={{ margin: "0 5px" }} />
        {memberDetails.phone_number
          ? memberDetails.phone_number
          : "No phone number provided"}
        <Icon name="mail" style={{ margin: "0 5px" }} />
        {memberDetails.email ? memberDetails.email : "No email provided"}
      </Card.Content>
      <Card.Content>
        <Table celled striped color="red">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3">Account Info</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Icon name="calendar check outline" /> Join Date
              </Table.Cell>
              <Table.Cell>{dates.date_joined}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name="calendar times outline" /> Expiration Date
              </Table.Cell>
              <Table.Cell>{dates.expiration_date}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name="building outline" /> Preferred Store
              </Table.Cell>
              <Table.Cell>
                {memberDetails.preferred_store
                  ? memberDetails.preferred_store
                  : "No Store Set"}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name="id card outline" /> Card Status
              </Table.Cell>
              <Table.Cell>
                {memberDetails.card_status === "YES" ? (
                  <Icon
                    name="id card outline"
                    color="green"
                    size="large"
                    style={{ margin: "0 auto" }}
                  />
                ) : (
                  <Icon
                    name="id card outline"
                    color="red"
                    size="large"
                    style={{ margin: "0 auto" }}
                  />
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name="handshake outline" /> Initial Contact
              </Table.Cell>
              <Table.Cell>
                <Checkbox toggle defaultChecked />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
}

export default MemberDetail;
