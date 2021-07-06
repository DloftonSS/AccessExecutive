import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import {
  Button,
  Checkbox,
  Form,
  Card,
  Icon,
  Image,
  Dimmer,
  Loader,
  Message,
} from "semantic-ui-react";
import { useHistory, useParams } from "react-router-dom";
import eventPicture from "./Orlando.jpg";

function ExecutiveEventSignUp(props) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [first_name, setFirst_name] = useState();
  const [last_name, setLast_name] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [eventInfo, setEventInfo] = useState({
    description: "null",
    date: "null",
    startTime: "null",
    endTime: "null",
    location: "null",
    price: "null",
    quantity: "null",
  });
  async function loadSingleEvent() {
    try {
      setInfoLoading(true);
      const eventInfoData = await API.loadSingleEvent(id);
      // console.log(eventInfoData.data);
      setEventInfo(eventInfoData.data);
      setInfoLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      const { message } = error.response.data;
      setErrorMessage(message);
      setInfoLoading(false);
    }
  }

  useEffect(() => {
    loadSingleEvent();
  }, []);

  //   Sending to email onSubmit
  const attendee = async () => {
    setLoading(true);
    await API.attendee({ first_name, last_name, email, phone });
    setLoading(false);
    console.log("clicked");
    console.log(first_name + last_name);
  };

  return (
    <div style={{ padding: "5%" }}>
      <Card
        fluid
        style={{
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "10px",
        }}
      >
        <Card
          centered
          style={{
            display: "flex",
            width: "50%",
            bottom: "1rem",
          }}
        >
          {infoLoading ? (
            <>
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>

              {/* <Image src="/images/wireframe/short-paragraph.png" /> */}
              <Image src={eventPicture} />
            </>
          ) : (
            <>
              <Image src={eventPicture} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{eventInfo.description}</Card.Header>
                {/* <Card.Meta><span className="date">{date}</span></Card.Meta> */}
                <Card.Meta>
                  <span className="date">Start: {eventInfo.startTime}</span>
                  <br />
                  <span className="date">End: {eventInfo.endTime}</span>
                  <br />
                  <span className="date">Price: ${eventInfo.price}</span>
                  <br />
                </Card.Meta>
                <Card.Description> {eventInfo.location}</Card.Description>
              </Card.Content>
            </>
          )}
        </Card>

        <Form>
          {errorMessage ? (
            <Message negative>
              <Message.Header>Something Went Wrong</Message.Header>
              <p>
                This link is either invalid or has expired. Please Contact your
                concierge representative for assistance
              </p>
            </Message>
          ) : (
            <>
              <Form.Field>
                <label>First Name</label>
                <input
                  placeholder="First Name"
                  name="first"
                  onChange={(e) => setFirst_name(e.target.value)}
                  value={first_name}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input
                  placeholder="Last Name"
                  name="last_name"
                  onChange={(e) => setLast_name(e.target.value)}
                  value={last_name}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  name="last_name"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>E-Mail Address</label>
                <input
                  placeholder="E-Mail"
                  name="last_name"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Form.Field>
            </>
          )}

          {loading ? (
            <Button basic loading>
              Loading
            </Button>
          ) : errorMessage ? (
            <></>
          ) : (
            <Button
              primary
              onClick={attendee}
              type="submit"
              //   href="https://shoot-straight.com/product/executive-access-club-renewal/"
            >
              Sign up and Purchase ticket
            </Button>
          )}
        </Form>
      </Card>
    </div>
  );
}

export default ExecutiveEventSignUp;
