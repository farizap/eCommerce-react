import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";
import { Link } from "react-router-dom";

class ProfileBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-bar border">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>Profil User</h4>

              <br />
              <h6>Nama : {this.props.name}</h6>
            </div>
            <div className="col-12">
              <h6>Tergabung Sejak : {this.props.created_at} </h6>
            </div>
            <div className="col-12">
              <h6>Total transaksi : {this.props.product_order_cnt}</h6>
            </div>
            <div className="col-12">
              <h6>Status : {this.props.status}</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "name, address, contact, product_order_cnt, created_at, status",
  actions
)(ProfileBar);
