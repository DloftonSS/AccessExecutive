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
import ExecutiveRequestsWidget from "../ExecutiveRequests/ExecutiveRequestsWidget";

function ExecutiveRequests(props) {
  let history = useHistory();

  return (
    <div>
      <div className="executive_container">
        <div className="executive_btn_2" onClick={() => history.goBack()}>
          <h4 className="requests_btn_title">Requests</h4>
        </div>
      </div>
      <ExecutiveRequestsWidget />
    </div>
  );
}

export default ExecutiveRequests;
