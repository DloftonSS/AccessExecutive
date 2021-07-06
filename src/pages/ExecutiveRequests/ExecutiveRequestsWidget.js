import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import API from "../../utils/API";
import { Feed, Icon, Table, Grid, List, Card } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Button, Carousel, Accordion } from "react-bootstrap";
// import { Link } from "react-router-dom";
import first from "../../Images/IMG_1367-1.png";
import second from "../../Images/IMG_1369-1-600x450.png";
import thrid from "../../Images/IMG_1370-1-600x450.png";

function CatalogExecutiveDashWidget(props) {
  let history = useHistory();

  return (
    <div>
      <List divided relaxed style={{ padding: "10px" }}>
        <List.Item>
          <List.Icon name="check square" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header as="a">Sig Sauer RM400 Tread Snakebite</List.Header>
            <Card.Meta style={{ color: "black" }}>
              The Sig Sauer RM400 Tread Snakebite RM400-16B-TRD-SB is an optics
              ready, aluminum frame rifle.
            </Card.Meta>
            <List.Description as="a">Updated 12/08/2021</List.Description>
            <button type="button" class="btn btn-warning">
              {" "}
              Cancel Request{" "}
            </button>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="check square" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header as="a">Sig Sauer RM400 Tread Snakebite</List.Header>
            <Card.Meta style={{ color: "black" }}>
              The Sig Sauer RM400 Tread Snakebite RM400-16B-TRD-SB is an optics
              ready, aluminum frame rifle.
            </Card.Meta>
            <List.Description as="a">Updated 12/08/2021</List.Description>
            <List.Description>Status: Ordered</List.Description>
          </List.Content>
        </List.Item>{" "}
        <List.Item>
          <List.Icon name="check square" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header as="a">Sig Sauer RM400 Tread Snakebite</List.Header>
            <Card.Meta style={{ color: "black" }}>
              The Sig Sauer RM400 Tread Snakebite RM400-16B-TRD-SB is an optics
              ready, aluminum frame rifle.
            </Card.Meta>
            <List.Description as="a">Updated 12/08/2021</List.Description>
            <List.Description>Status: Completed</List.Description>
          </List.Content>
        </List.Item>
      </List>
    </div>
  );
}
export default CatalogExecutiveDashWidget;
