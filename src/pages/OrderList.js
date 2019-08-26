import React from "react";
import { connect } from "unistore/react";
import { actions } from "../store";

import { Redirect } from "react-router-dom";

// import component
import SideBarProfile from "../components/SideBarProfile";

class OrderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOrder: [],
      listPayment: []
    };
  }

  // islogin() {
  //   if (sessionStorage.getItem("token") === null) {
  //     return <Redirect to="/login" />;
  //   }
  // }

  componentDidMount() {
    this.getOrderData();
  }

  async getOrderData() {
    console.log(this.props);
    const self = this;
    const config = {
      method: "get",
      url: "/order",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    };
    await this.props
      .axiosNoToken(config)
      .then(response => {
        self.setState({ listOrder: response.data });
      })
      .catch(error => console.log(error));
  }
  islogin() {
    if (sessionStorage.getItem("token") === null) {
      return <Redirect to="/login" />;
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
              {this.state.listOrder.map((value, index) => {
                return (
                  <table class="table table-hover" key={index}>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Order Id : {value.id}</th>
                        <th scope="col">
                          Total Product : {value.total_product}
                        </th>
                        <th scope="col">Total Qty : {value.total_qty}</th>
                        <th scope="col">Total Price : {value.total_price}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="2">
                          Metode Pembayaran : {value.payment.name}
                        </td>
                        <td colspan="2">
                          No rekening : {value.payment.no_rek}
                        </td>
                        <td colspan="2">A/n : {value.payment.name_rek}</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Nama Produk</th>
                        <th scope="col">Gambar</th>
                        <th scope="col">Harga Satuan</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Total Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {value.orderDetails.map((orderDetail, idx) => {
                        return (
                          <tr key={idx}>
                            <th scope="row">{idx + 1}</th>
                            <td>{orderDetail.produk.name}</td>
                            <td>
                              <img
                                height="50px"
                                src={orderDetail.produk.img_url}
                              />
                            </td>
                            <td>{orderDetail.produk.price}</td>
                            <td>{orderDetail.qty}</td>
                            <td>{orderDetail.price}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "axiosNoToken, token",
  actions
)(OrderList);
