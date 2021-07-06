import React from "react";
import { Tab } from "semantic-ui-react";
import RequestsAll from "./RequestsAll";
import RequestsFirearms from "./RequestsFirearms";
import RequestsAmmunition from "./RequestsAmmunition";
import RequestsScopes from "./RequestsScopes";
import RequestsAccessories from "./RequestsAccessories";
import RequestsSuppressors from "./RequestsSuppressors";
import HeaderComponent from "../../components/HeaderComponent";
import RequestsCompleted from "./RequetsCompleted";

const panes = [
  {
    menuItem: "All Requests",
    render: () => (
      <Tab.Pane>
        <RequestsAll />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Firearms",
    render: () => (
      <Tab.Pane>
        <RequestsFirearms />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Ammunition",
    render: () => (
      <Tab.Pane>
        <RequestsAmmunition />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Scopes",
    render: () => (
      <Tab.Pane>
        <RequestsScopes />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Accessories",
    render: () => (
      <Tab.Pane>
        <RequestsAccessories />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Suppressors",
    render: () => (
      <Tab.Pane>
        <RequestsSuppressors />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Completed",
    render: () => (
      <Tab.Pane>
        <RequestsCompleted />
      </Tab.Pane>
    ),
  },
];

function index() {
  return (
    <div style={{ width: "100%", overflowY: "scroll" }}>
      <HeaderComponent title={"Requests"} icon={"heart"} link={"yes"} />
      <div style={{ height: "100%" }}>
        <Tab
          menu={{ color: "red", secondary: true, pointing: true }}
          panes={panes}
          style={{ backgroundColor: "white" }}
          renderActiveOnly
        />
      </div>
    </div>
  );
}

export default index;
