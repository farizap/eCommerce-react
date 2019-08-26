import React from "react";
import { connect } from "unistore/react";
import { actions } from "../store";

import { Redirect } from "react-router-dom";

// import component
import SideBarProfile from "../components/SideBarProfile";

class Penjualan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listPenjualan: []
    };
  }

  componentDidMount() {
    this.getPenjualanData();
  }

  async getPenjualanData() {
    console.log(this.props);
    const self = this;
    const config = {
      method: "get",
      url: "/orderdetails/shop/me",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    };
    await this.props
      .axiosNoToken(config)
      .then(response => {
        self.setState({ listPenjualan: response.data });
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
              {this.state.listPenjualan.map((value, index) => {
                return (
                  <div
                    className="accordion"
                    id="accordionPenjualan"
                    key={index}
                  >
                    <div className="card">
                      <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                          <button
                            className="btn btn-link"
                            type="button"
                            data-toggle="collapse"
                            data-target={"#penjualan" + index}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            <table class="table table-hover">
                              <thead>
                                <tr>
                                  <th scope="col">No.</th>
                                  <th scope="col">Nama Produk</th>
                                  <th scope="col">Gambar</th>
                                  <th scope="col">Harga Satuan</th>
                                  <th scope="col">Stock</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>{value.product.name}</td>
                                  <td>
                                    <img
                                      height="50px"
                                      src={value.product.img_url}
                                    />
                                  </td>
                                  <td>{value.product.price}</td>
                                  <td>{value.product.stock}</td>
                                </tr>
                              </tbody>
                            </table>
                          </button>
                        </h2>
                      </div>
                      <div
                        id={"penjualan" + index}
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordionPenjualan"
                      >
                        <div className="card-body">
                          <table className="w-100">
                            <thead>
                              <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Order Id </th>
                                <th scope="col">Qty</th>
                                <th scope="col">Total Harga</th>
                                <th scope="col">Nama Pembeli</th>
                                <th scope="col">Alamat</th>
                                <th scope="col">Kontak</th>
                              </tr>
                            </thead>
                            <tbody>
                              {value.orderDetails.map((element, idx) => {
                                return (
                                  <tr key={idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td>{element.id}</td>
                                    <td>{element.qty}</td>
                                    <td>{element.price}</td>
                                    <td>{element.buyer_detail.name}</td>
                                    <td>{element.buyer.address}</td>
                                    <td>{element.buyer.contact}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
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
)(Penjualan);
