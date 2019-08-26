import React from "react";
import { connect } from "unistore/react";
import { actions } from "../store";

import { Redirect } from "react-router-dom";

// import component
import SideBarProfile from "../components/SideBarProfile";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: [],
      paymentId: 0
    };
    this.paymentMethod = React.createRef();
    this.handleDeleteCartOnClick = this.handleDeleteCartOnClick.bind(this);
  }

  componentDidMount() {
    this.props.getCart();
    this.props.getPaymentMethod();
  }
  handleCheckoutOnClick = async event => {
    event.preventDefault();
    const config = {
      method: "post",
      url: "/checkout",
      data: {
        payment_method_id: this.paymentMethod.current.value
      },
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    };
    const self = this;
    await this.props
      .axiosNoToken(config)
      .then(response => {
        self.props.getCart();
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleDeleteCartOnClick = async (event, cart_id) => {
    event.preventDefault();
    const config = {
      method: "delete",
      url: "/cart/" + cart_id,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    };
    const self = this;
    this.props.axiosNoToken(config).then(response => {
      console.log(response);
      self.props.getCart();
    });
  };

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
              <div className="row border">
                <div className="col-6">
                  <h3>Keranjang Saya</h3>
                  <h5>Jumlah Produk : {this.props.cart_cnt}</h5>
                  <h5>Total Harga : Rp{this.props.cart_price}</h5>
                </div>
                <div className="col-6 text-right">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#checkout"
                  >
                    Checkout
                  </button>
                  <div
                    className="modal fade"
                    id="checkout"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="checkoutLabel">
                            Checkout
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <form>
                          <div className="modal-body">
                            <h6>Metode Pembayaran</h6>
                            <label htmlFor="category">metode pembayaran</label>
                            <select
                              id="category"
                              name="category"
                              className="form-control"
                              ref={this.paymentMethod}
                            >
                              {this.props.listPayment.map((value, index) => {
                                return (
                                  <option key={index} value={value.id}>
                                    {value.name}
                                  </option>
                                );
                              })}
                            </select>
                            <br />

                            <h6>{this.state.paymentMethod.name}</h6>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={this.handleCheckoutOnClick}
                              data-dismiss="modal"
                            >
                              Checkout
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {this.props.cart.map((value, index) => {
                  return (
                    <div className="col-12 border">
                      <div className="row">
                        <div className="col-5">
                          <img
                            width="100%"
                            src={value.products.img_url}
                            alt="Produk"
                          />
                        </div>
                        <div className="col-7">
                          <p>Nama produk : {value.products.name}</p>
                          <p>Harga : {value.products.price}</p>
                          <p>Stock :{value.products.stock} </p>
                          <p>Jumlah Item :{value.qty} </p>
                          <p>Total Harga :{value.price} </p>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={e => {
                              this.handleDeleteCartOnClick(e, value.id);
                            }}
                          >
                            Hapus Produk Dari Keranjang
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "isLogin, cart_cnt, cart, axiosNoToken, listPayment, cart_price",
  actions
)(Cart);
