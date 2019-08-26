import React from "react";
import { connect } from "unistore/react";
import { actions } from "../store";

import { Redirect } from "react-router-dom";

// import component
import SideBarProfile from "../components/SideBarProfile";
import ProfileBar from "../components/ProfileBar";
import ShopBar from "../components/Shopbar";
class Profile extends React.Component {
  // islogin() {
  //   if (this.props.isLogin === null) {
  //     return <Redirect to="/login" />;
  //   }
  // }

  componentDidMount() {
    this.props.getProfile();
    this.props.getShopProfile();
  }
  islogin() {
    if (sessionStorage.getItem("token") === null) {
      return <Redirect to="/login" />;
    }
  }
  isShopBarRender() {
    if (sessionStorage.getItem("shop_id") !== "") {
      return (
        <div className="col-12">
          <ShopBar />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.islogin()}
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-12">
              <SideBarProfile />
            </div>
            <div className="col-md-9 col-12">
              <div className="row">
                <div className="col-12">
                  <ProfileBar />
                  <br />
                  <br />
                </div>
                {this.isShopBarRender()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "isLogin, address, product_order_cnt, created_at, status, name",
  actions
)(Profile);
