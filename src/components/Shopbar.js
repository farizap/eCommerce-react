import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";
import { Link } from "react-router-dom";

class ShopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-bar border">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>Profil Toko</h4>
              <br />
              <h6>Nama : {this.props.shop_name}</h6>
              <h6>Kota : {this.props.shop_city}</h6>
            </div>
            <div className="col-12">
              <h6>Tergabung Sejak : {this.props.shop_created_at} </h6>
            </div>
            <div className="col-12">
              <h6>Total product : {this.props.shop_product_cnt}</h6>
            </div>
            <div className="col-12">
              <h6>Status : {this.props.shop_status}</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "shop_name, shop_city, shop_address, shop_contact, shop_product_cnt, shop_created_at, shop_status, shop_reputasi",
  actions
)(ShopBar);
