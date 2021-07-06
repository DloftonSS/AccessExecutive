import React, { useState } from "react";
import { Card, Form, Button } from "semantic-ui-react";
import NewEventWidget from "../../components/NewEvent";
import HeaderComponent from "../../components/HeaderComponent";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import API from "../../utils/API";
import { useSelector } from "react-redux";

export const EventsPage = (props) => {
  const { token } = useSelector((state) => state.auth);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-01-14T21:11:54")
  );
  const [selectedStartTime, handleStartTimeChange] = useState(new Date());
  const [selectedEndTime, handleEndTimeChange] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reload, setReload] = useState(false);

  const handleEvents = async (e) => {
    if (e.target.name === "location") {
      setLocation(e.target.value);
    } else if (e.target.name === "price") {
      setPrice(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "date") {
      setSelectedDate(e.target.value);
    } else {
      setQuantity(e.target.value);
    }
  };

  // Submit Action
  const handleSubmit = async (e) => {
    setErrorMessage("");
    if (price == "" || location == "" || quantity == "" || description == "") {
      setErrorMessage("Please Fill out entire form.");
    } else {
      const splittime = selectedStartTime
        .toString()
        .split(" ")[4]
        .split(":", 2)
        .join(":");
      const splittime2 = selectedEndTime
        .toString()
        .split(" ")[4]
        .split(":", 2)
        .join(":");

      const newEvents = {
        date: selectedDate,
        startTime: splittime,
        endTime: splittime2,
        quantity,
        location,
        price,
        description,
      };
      const options = {
        headers: {
          token: token,
        },
      };
      const submit = await API.createNewEvent(newEvents, options);

      setDescription("");
      setLocation("");
      setQuantity("");
      setPrice("");
      setSelectedDate("");
      handleStartTimeChange("");
      handleEndTimeChange("");
      setReload(!reload);
    }
  };

  return (
    <div style={{ width: "100%", overflowY: "scroll" }}>
      <HeaderComponent title={"Events"} icon={"flag"} link={"/dashboard"} />
      <div style={{ display: "flex", padding: ".5rem", alignItems: "top" }}>
        <NewEventWidget monkey={reload} />
      </div>
      <div> this is a change</div>
      <div style={{ display: "flex", padding: ".5rem", alignItems: "top" }}>
        <Card style={{ height: "100%", marginRight: "10px", width: "100%" }}>
          <Card.Content>
            <Card.Header>New Event</Card.Header>
          </Card.Content>
          <Card.Content>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Field>
                <Card.Header style={{ padding: "5px" }}>Date</Card.Header>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    name="date"
                  />
                  <Card.Header style={{ padding: "5px" }}>
                    Start time
                  </Card.Header>
                  <TimePicker
                    value={selectedStartTime}
                    onChange={(e) => handleStartTimeChange(e)}
                    name="startTime"
                  />
                  <Card.Header style={{ padding: "5px" }}>End Time</Card.Header>
                  <TimePicker
                    value={selectedEndTime}
                    onChange={(e) => handleEndTimeChange(e)}
                    name="endTime"
                  />
                </MuiPickersUtilsProvider>

                <Form.Input
                  label="Location"
                  placeholder="Central Florida Fairgrounds, Orlando"
                  name="location"
                  value={location}
                  onChange={(e) => {
                    handleEvents(e);
                  }}
                />
                <Form.Input
                  label="Price"
                  placeholder="12.00"
                  name="price"
                  value={price}
                  onChange={(e) => {
                    handleEvents(e);
                  }}
                />
                <Form.Input
                  label="Quantity"
                  placeholder="1 - Unlimited"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => {
                    handleEvents(e);
                  }}
                />
                <Form.Input
                  label="Description"
                  placeholder="Florida Gun Show"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    handleEvents(e);
                  }}
                />
              </Form.Field>
              <Button color="red">Add Event</Button>
            </Form>
          </Card.Content>
        </Card>
        <Card style={{ height: "100%", marginRight: "10px", width: "100%" }}>
          <Card.Content>
            <Card.Header>Attendees</Card.Header>
          </Card.Content>
          <Card.Content
            style={{ width: "100%", overflowY: "scroll" }}
          ></Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default EventsPage;
