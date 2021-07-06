import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderComponent from "../../components/HeaderComponent";
import DashboardNewEventWidget from "./DashboardNewEventsWidget";
import Event from "../../Images/gunshow.png";
import DashboardNewMembersWidget from "./DashboardNewMembersWidget";
import DashboardNotes from "./DashboardNotesWidget";
import DashboardNewRequestsWidget from "./DashboardNewRequestsWidget";
import DashboardStatusWidget from "./DashboardStatusWidget";
import { loadUser } from "../../actions/authActions";
// import { Step } from "@material-ui/core";

function EventLogo() {
  // Import result is the URL of your image
  return <img src={Event} alt="Home" />;
}

export const UserDashboard = () => {
  // access to the currentUser property from the auth reducer state
  // Hello world
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <div
        style={{ width: "100%", overflowY: "scroll", scrollbarWidth: "1px" }}
      >
        <HeaderComponent title={"Dashboard"} icon={"table"} />
        <div style={{ display: "flex", padding: ".5rem", alignItems: "top" }}>
          <DashboardNewMembersWidget />
          <DashboardNotes />
        </div>
        {/* Row Two */}
        <div style={{ display: "flex", padding: ".5rem", alignItems: "top" }}>
          <DashboardNewRequestsWidget />
          <DashboardStatusWidget />
        </div>
        {/* Row Three */}
        <div style={{ display: "flex", padding: ".5rem", alignItems: "top" }}>
          {/* <DashboardNewEventWidget /> */}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
