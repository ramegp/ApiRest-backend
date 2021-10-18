import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Menu.css";
import axios from "axios";

function Menu(props) {
  const handleLogout = ()=>{
    props.seters.user(null)
    axios({
      method: 'get',
      url: 'http://localhost:8080/log/out'
    })
    props.seters.admin(false);
    props.seters.products(null);
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Ecommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">
                <Link to="/" className="menu-links">
                  {" "}
                  Home{" "}
                </Link>
              </Nav.Link>
              <Nav.Link href="#home">
                <Link to="/products" className="menu-links">
                  {" "}
                  Products{" "}
                </Link>
              </Nav.Link>
            </Nav>
            <Nav>
              {props.geters.user ? (
                <Nav.Link className="menu-links" onClick={()=>{handleLogout()}}>
                  {" "}
                    Logout{" "}
                  
                </Nav.Link>
              ) : (
                <Nav.Link href="#link">
                  <Link to="/login" className="menu-links">
                    {" "}
                    Login{" "}
                  </Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Menu;
