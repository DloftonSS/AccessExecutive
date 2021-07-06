import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { Card, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NewMembersWidget() {
  const [newUsers, setNewUsers] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const loadNewUsers = async () => {
    console.log(token);
    const options = {
      headers: {
        token: token,
      },
    };
    const newUsersData = await API.newestUsers(options);
    setNewUsers(newUsersData.data);
  };

  useEffect(() => {
    loadNewUsers();
  }, []);
  return (
    <Card fluid style={{ marginRight: "10px", height: "350px" }}>
      <Card.Content>
        <Card.Header>New Members</Card.Header>
      </Card.Content>

      <Card.Content style={{ overflowY: "scroll", height: "100%" }}>
        <Table celled striped color="red">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Date Joined</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {newUsers.length > 0 ? (
              newUsers.map((user) => {
                let date = new Date(user.date_joined)
                  .toUTCString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ");
                return (
                  <Table.Row key={user.id}>
                    <Table.Cell>
                      <Link
                        style={{ color: "black" }}
                        to={`/member/${user.id}`}
                      >
                        {user.first_name}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        style={{ color: "black" }}
                        to={`/member/${user.id}`}
                      >
                        {user.last_name}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        style={{ color: "black" }}
                        to={`/member/${user.id}`}
                      >
                        {user.email}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        style={{ color: "black" }}
                        to={`/member/${user.id}`}
                      >
                        {user.phone_number}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        style={{ color: "black" }}
                        to={`/member/${user.id}`}
                      >
                        {date}
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell>NO DATA</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
}

export default NewMembersWidget;
