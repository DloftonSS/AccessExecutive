import React from "react";
import { Card, Table } from "semantic-ui-react";
import HeaderComponent from "../../components/HeaderComponent";
import MemberDetail from "./MemberDetail";
import MemberNotes from "./MemberNotes";
import MemberRequests from "./MemberRequests";

function MemberPage(props) {
  const id = props.match.params.id;

  return (
    <div style={{ width: "100%", overflowY: "scroll" }}>
      <HeaderComponent
        title={"Member Detail"}
        icon={"user"}
        link={"/members"}
      />
      <div style={{ display: "flex", padding: "1rem", alignItems: "top" }}>
        <MemberDetail id={id} />
        <MemberNotes id={id} />
      </div>
      {/* Row Two Requests */}
      <MemberRequests id={id} />
      {/* Row Three History */}
      {/* <div style={{ display: "flex", padding: "1rem ", alignItems: "top" }}>
        <Card fluid style={{ height: "300px" }}>
          <Card.Content>
            <Card.Header>History</Card.Header>
          </Card.Content>
          <Card.Content style={{ overflowY: "scroll" }}>
            <Table celled striped color="red">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Item</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Gun</Table.Cell>
                  <Table.Cell>AK-47</Table.Cell>
                  <Table.Cell>1</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Suppressor</Table.Cell>
                  <Table.Cell>DeadAim</Table.Cell>
                  <Table.Cell>1</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Ammunition</Table.Cell>
                  <Table.Cell>9mm</Table.Cell>
                  <Table.Cell>25</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Guns</Table.Cell>
                  <Table.Cell>Beretta</Table.Cell>
                  <Table.Cell>2</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Scope</Table.Cell>
                  <Table.Cell>Red Dot</Table.Cell>
                  <Table.Cell>5</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>
      </div> */}
    </div>
  );
}

export default MemberPage;
