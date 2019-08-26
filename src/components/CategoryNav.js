import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavItem,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

class CategoryNav extends React.Component {
  componentDidMount = () => {
    if (this.props.listCategory.length === 0) {
      this.props.getCategory2();
    }
  };

  render() {
    return (
      <div className="category-nav">
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {this.props.listCategory.map(value => {
                return (
                  <Nav.Link key={value.id}>
                    <Link to={"/category/ " + value.id}>
                      <h6>{value.name}</h6>
                    </Link>
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default connect(
  "listCategory",
  actions
)(CategoryNav);
