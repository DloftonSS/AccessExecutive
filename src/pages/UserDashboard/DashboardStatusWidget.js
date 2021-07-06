import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { Card, Table } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

function DashboardStatusWidget() {
  const [newRequests, setNewRequests] = useState("");
  const { token } = useSelector((state) => state.auth);

  async function loadRequests() {
    const options = {
      headers: {
        token: token,
      },
    };
    const requests = await API.loadNewConcierge(options);

    setNewRequests(requests.data[0]);
    console.log(requests.data[0]);
  }

  useEffect(() => {
    loadRequests();
  }, []);
  return (
    <Card fluid style={{ marginRight: "10px", height: "350px" }}>
      <Card.Content>
        <Card.Header>Status Changes</Card.Header>
      </Card.Content>

      <Card.Content style={{ overflowY: "scroll", height: "100%" }}>
        <Table celled striped color="red">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Member Name</Table.HeaderCell>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>Concierge</Table.HeaderCell>
              <Table.HeaderCell>Updated On</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {newRequests ? (
              newRequests.map((request) => {
                let date = new Date(request.updatedAt)
                  .toUTCString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ");

                return (
                  <Table.Row key={request.id}>
                    <Table.Cell>
                      <Link
                        style={{ color: "black", cursor: "pointer" }}
                        to={`/member/${request.memberID}`}
                      >
                        {request.member_first + " " + request.member_last}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{request.item}</Table.Cell>
                    {/* Rewrite the query */}
                    <Table.Cell>
                      {request.first_name + " " + request.last_name}
                    </Table.Cell>
                    <Table.Cell>{date}</Table.Cell>
                    <Table.Cell>{request.status}</Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell>No New Requests</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
}

export default DashboardStatusWidget;
