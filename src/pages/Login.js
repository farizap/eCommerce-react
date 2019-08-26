import React from "react";
import { Redirect } from "react-router-dom";

import { connect } from "unistore/react";
import { actions } from "../store";

//import component
import LoginForm from "../components/LoginForm";
//import image

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this);
    this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
  }

  handleLoginUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handleLoginPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLoginSubmit(event) {
    let data = {
      client_key: this.state.username,
      client_secret: this.state.password
    };
    this.props.Login(data).then(() => {
      this.props.history.push("/");
    });
    event.preventDefault();
  }

  render() {
    if (sessionStorage.getItem("token") !== null) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <div className="container">
            <br />
            <br />
            <div className="row justify-content-center">
              <div className="col-5 border bg-light pt-2 pb-4">
                <div className="row justify-content-center">
                  <div className="col-12 text-center pt-2">
                    <h4>Log in</h4>
                  </div>

                  <LoginForm
                    onPasswordChange={this.handleLoginPasswordChange}
                    onUsernameChange={this.handleLoginUsernameChange}
                    onSubmit={this.handleLoginSubmit}
                    data={this.state.login}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

// export default Login;
export default connect(
  "isLogin",
  actions
)(Login);
