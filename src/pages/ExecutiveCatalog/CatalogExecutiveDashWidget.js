import React from "react";
import { Feed, Icon } from "semantic-ui-react";
import { Card, Button, Carousel, Accordion } from "react-bootstrap";
import first from "../../Images/IMG_1367-1.png";
import second from "../../Images/IMG_1369-1-600x450.png";
import thrid from "../../Images/IMG_1370-1-600x450.png";

import { Image, Dimmer, Loader } from "semantic-ui-react";
import API from "../../utils/API";
import { useSelector } from "react-redux";

function CatalogExecutiveDashWidget(props) {
  return (
    <div>
      <Card>
        <Card.Body style={{ borderBottom: "1px solid black" }}>
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={first} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={second} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={thrid} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
          <Card.Title>Sig Sauer RM400 Tread Snakebite</Card.Title>
          <Card.Text>
            The Sig Sauer RM400 Tread Snakebite RM400-16B-TRD-SB is an optics
            ready, aluminum frame rifle.
          </Card.Text>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey="0"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Icon name="caret down" color="black" />
                  More Info
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  TREAD branded accessories that are available: – M-LOK
                  handguard with lightening cuts to reduce weight; – 3 chamber
                  compensator; – Ambidextrous charging handle made of aircraft
                  grade aluminum and a dual roll pin design; – Multiple
                  configurations of M-LOK grip kits made of high strength
                  polymer; – Factory upgraded flat blade, single stage trigger.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Card.Text>$399.95 Qty: 5</Card.Text>
          <Button variant="warning">Buy Now</Button>
          <Button variant="danger">Request</Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body style={{ borderBottom: "1px solid black" }}>
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={first} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={second} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={thrid} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
          <Card.Title>Sig Sauer RM400 Tread Snakebite</Card.Title>
          <Card.Text>
            The Sig Sauer RM400 Tread Snakebite RM400-16B-TRD-SB is an optics
            ready, aluminum frame rifle.
          </Card.Text>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey="0"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Icon name="caret down" color="black" />
                  More Info
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  TREAD branded accessories that are available: – M-LOK
                  handguard with lightening cuts to reduce weight; – 3 chamber
                  compensator; – Ambidextrous charging handle made of aircraft
                  grade aluminum and a dual roll pin design; – Multiple
                  configurations of M-LOK grip kits made of high strength
                  polymer; – Factory upgraded flat blade, single stage trigger.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Card.Text>$399.95 Qty: 5</Card.Text>
          <Button variant="warning">Buy Now</Button>
          <Button variant="danger">Request</Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body style={{ borderBottom: "1px solid black" }}>
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={first} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={second} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={thrid} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
          <Card.Title>Sig Sauer RM400 Tread Snakebite</Card.Title>
          <Card.Text>
            The Sig Sauer RM400 Tread Snakebite RM400-16B-TRD-SB is an optics
            ready, aluminum frame rifle.
          </Card.Text>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey="0"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Icon name="caret down" color="black" />
                  More Info
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  TREAD branded accessories that are available: – M-LOK
                  handguard with lightening cuts to reduce weight; – 3 chamber
                  compensator; – Ambidextrous charging handle made of aircraft
                  grade aluminum and a dual roll pin design; – Multiple
                  configurations of M-LOK grip kits made of high strength
                  polymer; – Factory upgraded flat blade, single stage trigger.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Card.Text>$399.95 Qty: 5</Card.Text>
          <Button variant="warning">Buy Now</Button>
          <Button variant="danger">Request</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CatalogExecutiveDashWidget;
