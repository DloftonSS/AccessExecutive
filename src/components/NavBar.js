import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../Images/ExecutiveAccess.png";
import Logout from "./Logout";
import { Icon } from "semantic-ui-react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../actions/authActions";

function IconLogo() {
  // Import result is the URL of your image
  return <img src={Logo} alt="Home" />;
}

export const NavBar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const showLinks = () => {
    if (isAuthenticated && role == "admin") {
      return (
        <>
          <Link to="/dashboard" className="item" style={{ fontSize: "1rem" }}>
            Dashboard
            <Icon name="dashboard" />
          </Link>
          <Link to="/members" className="item" style={{ fontSize: "1rem" }}>
            Members
            <Icon name="users" />
          </Link>
          <Link to="/requests" className="item" style={{ fontSize: "1rem" }}>
            Requests
            <Icon name="heart" />
          </Link>
          <Link to="/createuser" className="item" style={{ fontSize: "1rem" }}>
            Create Admin
            <Icon name="user secret" />
          </Link>
          <Link to="/catalog" className="item" style={{ fontSize: "1rem" }}>
            Catalog
            <Icon name="list" />
          </Link>
          {/* <Link to="/events" className="item" style={{ fontSize: "1rem" }}>
            Events
            <Icon name="calendar alternate" />
          </Link> */}
          <Link to="/register" className="item" style={{ fontSize: "1rem" }}>
            New Executive
            <Icon name="user plus" />
          </Link>
          <Logout />
        </>
      );
    } else if (isAuthenticated && role == "user") {
      return (
        <>
          {/* <Link to="/executive" className="item" style={{ fontSize: "2rem" }}>
            Dashboard
          </Link>
          <Link
            to="/executive/events"
            className="item"
            style={{ fontSize: "2rem" }}
          >
            Events
          </Link>
          <Link
            to="/executive/catalog"
            className="item"
            style={{ fontSize: "2rem" }}
          >
            Catalog
          </Link>
          <Link
            to="/executive/events"
            className="item"
            style={{ fontSize: "2rem" }}
          >
            Events
          </Link> */}
          <Nav.Link>
            <Link
              to="/executive"
              className="item"
              style={{ fontSize: "1rem", color: "white" }}
            >
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              to="/executive/events"
              className="item"
              style={{ fontSize: "1rem", color: "white" }}
            >
              Events
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              to="/executive/catalog"
              className="item"
              style={{ fontSize: "1rem", color: "white" }}
            >
              Catalog
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              to="/"
              onClick={() => {
                dispatch(LogoutUser());
              }}
              style={{ fontSize: "1rem", color: "red" }}
            >
              Logout
            </Link>
          </Nav.Link>
        </>
      );
    } else if (isAuthenticated && role == "manager") {
      return (
        <>
          <Link to="/register" className="item" style={{ fontSize: "1rem" }}>
            New Executive
            <Icon name="user plus" />
          </Link>
          <Logout />
        </>
      );
    } else {
      return (
        <>
          <Link to="/" className="item">
            Login
          </Link>
        </>
      );
    }
  };

  function changeMenu() {
    if (role == "user") {
      return "ui inverted menu";
    } else {
      return "ui inverted vertical menu";
    }
  }
  if (isAuthenticated && role == "user") {
    return (
      <Navbar bg="dark" variant="dark" expand="sm">
        <Navbar.Brand>
          <Link to="/executive">
            <img src={Logo} width="200" className="d-inline-block align-top" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav style={{ right: "10px" }}>{showLinks()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else if (isAuthenticated && role == "manager") {
    return (
      <div className={changeMenu()}>
        <Link to="/" className="item">
          <IconLogo />
        </Link>

        <div className=" menu" style={{ marginTop: "50px" }}>
          {showLinks()}
        </div>
      </div>
    );
  } else if (isAuthenticated && role == "admin") {
    return (
      <>
        <div className={changeMenu()}>
          <Link to="/" className="item">
            <IconLogo />
          </Link>

          <div className=" menu" style={{ marginTop: "50px" }}>
            {showLinks()}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <Navbar
        bg="dark"
        variant="dark"
        expand="sm"
        style={{ position: "sticky", top: "0px", zIndex: "10" }}
      >
        <Navbar.Brand>
          <Link to="/">
            <img src={Logo} width="200" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Login
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/activate"
                style={{ textDecoration: "none", color: "white" }}
              >
                Register
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

export default NavBar;
