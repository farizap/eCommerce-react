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

class HeaderAtas extends React.Component {
  constructor(props) {
    super(props);
    this.onClickLogout = this.onClickLogout.bind(this);
    this.state = {
      refreshCnt: 0
    };
  }

  onClickLogout = event => {
    sessionStorage.clear();
    this.props.setLogin(null);
    this.setState({ refreshCnt: this.state.refreshCnt + 1 });
  };

  isLogoutRender() {
    if (sessionStorage.getItem("token") !== null || this.props.isLogin === 1) {
      return (
        <li className="nav-item d-inline mx-3">
          <Link className="d-inline" onClick={this.onClickLogout}>
            Logout
          </Link>
        </li>
      );
    }
  }

  render() {
    return (
      <div className="header-atas">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-4 col-12 text-right ">
              <nav className="navbar navbar-light">
                <ul className="navbar-nav d-inline">
                  <li className="nav-item d-inline mx-3">
                    <Link className="d-inline" to="/shop/input">
                      Bantuan
                    </Link>
                  </li>
                  <li className="nav-item d-inline mx-3">
                    <Link className="d-inline" to="/shop/input">
                      Jual
                    </Link>
                  </li>
                  <li className="nav-item d-inline mx-3">
                    <Link className="d-inline" to="/profile">
                      Profile
                    </Link>
                  </li>
                  {this.isLogoutRender()}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "isLogin",
  actions
)(HeaderAtas);
