import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import { Provider, connect } from "unistore/react";
import { actions } from "../store";

//import component
import SignUpForm from "../components/SignUpForm";
//import image

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client_key: "",
      client_secret: "",
      address: "",
      contact: "",
      name: "",
      age: 0,
      sex: "male"
    };
    this.handlesignUpSubmit = this.handlesignUpSubmit.bind(this);
    this.handlesignUpUsernameChange = this.handlesignUpUsernameChange.bind(
      this
    );
    this.handlesignUpPasswordChange = this.handlesignUpPasswordChange.bind(
      this
    );
    this.handlesignUpAddressChange = this.handlesignUpAddressChange.bind(this);
    this.handlesignUpContactChange = this.handlesignUpContactChange.bind(this);
    this.handlesignUpAgeChange = this.handlesignUpAgeChange.bind(this);
    this.handlesignUpNameChange = this.handlesignUpNameChange.bind(this);
    this.handlesignUpSexChange = this.handlesignUpSexChange.bind(this);
  }

  handlesignUpUsernameChange(event) {
    this.setState({ client_key: event.target.value });
  }

  handlesignUpPasswordChange(event) {
    this.setState({ client_secret: event.target.value });
  }
  handlesignUpAddressChange(event) {
    this.setState({ address: event.target.value });
  }
  handlesignUpContactChange(event) {
    this.setState({ contact: event.target.value });
  }
  handlesignUpNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handlesignUpAgeChange(event) {
    this.setState({ age: event.target.value });
  }
  handlesignUpSexChange(event) {
    this.setState({ sex: event.target.value });
  }

  handlesignUpSubmit(event) {
    event.preventDefault();
    console.log("handlesignupsubmit", this.state);
    this.props.SignUp(this.state);
    this.props.history.push("/login");
  }

  //   postLogin = async data => {
  //     const self = this;
  //     await axios.post(hostLogin, data).then(function(response) {
  //       console.log(response);
  //       self.props.setNama(response.data.user_data.username);
  //       self.props.setEmail(response.data.user_data.email);
  //       self.props.setAvatar(response.data.user_data.avatar);
  //       self.props.login();
  //       console.log("store.nama", self.props.nama);
  //       self.props.history.push("/profile");
  //     });
  //   };

  // renderRedirect = () => {
  //   if (this.props.isLogin === 1) {
  //     return <Redirect to="/" />;
  //   }
  // };

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
              <div className="col-7 border bg-light p-5 py-2">
                <div className="row justify-content-center">
                  <div className="col-12 text-center">
                    <h4>Sign Up</h4>
                  </div>
                  <SignUpForm
                    data={this.state}
                    onUsernameChange={this.handlesignUpUsernameChange}
                    onPasswordChange={this.handlesignUpPasswordChange}
                    onAddressChange={this.handlesignUpAddressChange}
                    onContactChange={this.handlesignUpContactChange}
                    onNameChange={this.handlesignUpNameChange}
                    onAgeChange={this.handlesignUpAgeChange}
                    onSexChange={this.handlesignUpSexChange}
                    onSubmit={this.handlesignUpSubmit}
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
)(SignUp);
