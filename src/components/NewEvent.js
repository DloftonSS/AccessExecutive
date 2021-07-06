import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Card, Table, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";

function NewEventWidget(props) {
  const { token } = useSelector((state) => state.auth);
  const [newEvent, setNewEvents] = useState([]);

  async function loadNewEvents() {
    const options = {
      headers: {
        token: token,
      },
    };
    const newEventsData = await API.loadAllEvents(options);

    setNewEvents(newEventsData.data);
  }

  //Delete Events
  const deleteEvent = async (event) => {
    const query = {
      id: props.id,
    };
    const options = {
      headers: {
        token: token,
      },
    };
    const { id } = event.target;
    const deletedEvent = await API.deleteEvent(id, options);

    const events = await API.loadAllEvents(query, options);
    loadNewEvents();

    console.log(deleteEvent);
  };

  useEffect(() => {
    loadNewEvents();
  }, [props.monkey]);

  return (
    <Card fluid style={{ marginRight: "10px", height: "400px" }}>
      <Card.Content>
        <Card.Header>Events</Card.Header>
      </Card.Content>

      <Card.Content style={{ overflowY: "scroll", height: "100%" }}>
        <Table celled striped color="red">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Start Time</Table.HeaderCell>
              <Table.HeaderCell>EndTime</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              {/* <Table.HeaderCell>Buy Ticket</Table.HeaderCell> */}
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Manage</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {newEvent.length > 0 ? (
              newEvent.map((event) => {
                let date = new Date(event.date)
                  .toUTCString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ");
                return (
                  <Table.Row key={event.id}>
                    <Table.Cell
                      style={{
                        color: "black",
                        borderBottom: "2px solid red",
                        borderTop: "2px solid red",
                        textAlign: "center",
                        fontSize: "25px",
                        fontFamily: "Pirata One",
                      }}
                    >
                      {date}
                    </Table.Cell>
                    <Table.Cell
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontFamily: "Gruppo",
                      }}
                    >
                      {event.startTime}
                    </Table.Cell>
                    <Table.Cell
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontFamily: "Gruppo",
                      }}
                    >
                      {event.endTime}
                    </Table.Cell>
                    <Table.Cell
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontFamily: "Gruppo",
                      }}
                    >
                      {event.location}
                    </Table.Cell>
                    <Table.Cell
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontFamily: "Gruppo",
                      }}
                    >
                      {event.price}
                    </Table.Cell>
                    <Table.Cell
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontFamily: "Gruppo",
                      }}
                    >
                      {event.description}
                    </Table.Cell>
                    <Table.Cell
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        id={event.id}
                        onClick={(event) => deleteEvent(event)}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell>No Data</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
}

export default NewEventWidget;
