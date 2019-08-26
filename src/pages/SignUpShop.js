import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import { Provider, connect } from "unistore/react";
import { actions } from "../store";

//import component
import SignUpShopForm from "../components/SignUpShopForm";
//import image

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      contact: "",
      name: "",
      city: ""
    };
    this.handlesignUpSubmit = this.handlesignUpSubmit.bind(this);

    this.handlesignUpAddressChange = this.handlesignUpAddressChange.bind(this);
    this.handlesignUpContactChange = this.handlesignUpContactChange.bind(this);
    this.handlesignUpcityChange = this.handlesignUpcityChange.bind(this);
    this.handlesignUpNameChange = this.handlesignUpNameChange.bind(this);
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
  handlesignUpcityChange(event) {
    this.setState({ city: event.target.value });
  }

  handlesignUpSubmit(event) {
    console.log("handlesignupsubmit", this.state);
    this.props.SignUpShop(this.state);
    event.preventDefault();
  }

  renderRedirect = () => {
    if (this.props.user_status === "seller") {
      return <Redirect to="/profile" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div className="container">
          <br />
          <br />
          <div className="row justify-content-center">
            <div className="col-7 border">
              <div className="row justify-content-center">
                <div className="col-12 text-center">Register Toko</div>
                <SignUpShopForm
                  data={this.state}
                  onAddressChange={this.handlesignUpAddressChange}
                  onContactChange={this.handlesignUpContactChange}
                  onNameChange={this.handlesignUpNameChange}
                  onCityChange={this.handlesignUpcityChange}
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

// export default Login;
export default connect(
  "isLogin, user_status",
  actions
)(SignUp);
