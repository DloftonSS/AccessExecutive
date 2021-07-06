import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import { useDispatch } from "react-redux";
import { loadUser, loadExec } from "../actions/authActions";
import NavBar from "./NavBar";
import UserDashboard from "../pages/UserDashboard";
import MembersPage from "../pages/MembersPage";
import MemberPage from "../pages/MemberPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import ManagerRoute from "./ManagerRoute";
import NoMatch from "../pages/NoMatch";
import RequestsPage from "../pages/RequestsPage";
import EditMember from "../pages/EditMember";
import CreateNewUser from "../pages/CreateNewUser";
import NewUser from "../pages/NewUser";
import Forgot from "../pages/Forgot";
import Reset from "../pages/Reset";
import EventsPage from "../pages/EventsPage";
import CatalogPage from "../pages/CatalogPage";
import CatalogNewItemPage from "../pages/CatalogNewItemPage";
import SettingsPage from "../pages/SettingsPage";
import { useSelector } from "react-redux";
import ExecutiveDash from "../pages/ExecutiveDash";
import ExecLogin from "../pages/ExecLogin";
import ExecRegister from "../pages/ExecRegister";
import ExecutiveCatalog from "../pages/ExecutiveCatalog";
import ExecutiveAccount from "../pages/ExecutiveAccount";
import ExecutiveRequests from "../pages/ExecutiveRequests";
import ExecActivate from "../pages/ExecActivate";
import ExecutiveEventSignUp from "../pages/ExecutiveEventSignUp";
// const db = require("./config/db");

export const App = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (role == "admin" || role == "manager") {
      dispatch(loadUser());
    }
    if (role == "user") {
      dispatch(loadExec());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userStyle = {};

  const adminStyle = {
    display: "flex",
    height: "100vh",
  };

  function changeMenu() {
    if (role == "admin" || role == "manager") {
      return adminStyle;
    } else {
      return userStyle;
    }
  }

  return (
    <>
      <Router history={history}>
        <div style={changeMenu()}>
          <NavBar />
          <Switch>
            <Route path="/" exact component={ExecLogin} />
            <Route path="/executive" exact component={ExecutiveDash} />
            <Route path="/activate" exact component={ExecRegister} />
            <Route
              path="/activate/:password_token"
              exact
              component={ExecActivate}
            />
            <Route path="/forgotpassword" exact component={ExecRegister} />
            <Route
              path="/forgotpassword/:password_token"
              exact
              component={ExecRegister}
            />
            <ManagerRoute path="/register" exact component={Register} />
            <Route path="/admin" exact component={Login} />
            <Route path="/forgot" exact component={Forgot} />
            <Route path="/newuser/:password_token" exact component={NewUser} />
            <Route path="/reset/:password_token" exact component={Reset} />
            <Route
              path="/ExecutiveEventSignUp/:id"
              exact
              component={ExecutiveEventSignUp}
            />
            <Route
              path="/ExecutiveCatalog"
              exact
              component={ExecutiveCatalog}
            />
            <Route
              path="/ExecutiveAccount"
              exact
              component={ExecutiveAccount}
            />
            <Route
              path="/ExecutiveRequests"
              exact
              component={ExecutiveRequests}
              path="/resetpassword/:password_token"
              exact
              component={Reset}
            />
            <PrivateRoute path="/dashboard" exact component={UserDashboard} />
            <PrivateRoute path="/member/:id" exact component={MemberPage} />
            <PrivateRoute path="/members" exact component={MembersPage} />
            <PrivateRoute path="/requests" exact component={RequestsPage} />
            <PrivateRoute path="/events" exact component={EventsPage} />
            <PrivateRoute
              path="/catalog/newitem"
              exact
              component={CatalogNewItemPage}
            />

            <PrivateRoute
              path="/catalog/edit/:id"
              exact
              component={CatalogPage}
            />
            <PrivateRoute
              path="/edit/member/:id"
              exact
              component={EditMember}
            />
            <PrivateRoute path="/catalog/" exact component={CatalogPage} />
            <PrivateRoute path="/createuser" exact component={CreateNewUser} />
            <PrivateRoute path="/settings" exact component={SettingsPage} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
