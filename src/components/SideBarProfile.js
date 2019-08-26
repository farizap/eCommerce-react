import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";
import { Link } from "react-router-dom";

class SideBarProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  isShopBar() {
    if (sessionStorage.getItem("shop_id") !== "") {
      return (
        <div className="row">
          <div className="col-12">
            <h3>Toko saya</h3>
            <Link to="/shop/order">Penjualan</Link>
            <br />
            <Link to="/shop/input">Tambah produk</Link>
            <br />
            <Link to="/shop/items">Daftar Produk</Link>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="sidebarprofile pt-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>Profile</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h5>Pembelian</h5>
              <Link to="/cart">Keranjang</Link>
              <br />
              <Link to="/profile/order">Daftar Pembelian</Link>
            </div>
          </div>
          {this.isShopBar()}
        </div>
      </div>
    );
  }
}

export default connect(
  "isLogin, client_type",
  actions
)(SideBarProfile);
