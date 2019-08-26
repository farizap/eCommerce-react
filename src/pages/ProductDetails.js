import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";

// import component
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart_count: 0,
      product_id: 0
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let product_id = this.props.match.params.product_id;
    this.setState({ product_id: product_id });
    this.props.getProductById(product_id);
    this.props.getShop(product_id);
    console.log(this.props.shop);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.getData();
    }
  };
  onMinusClick = event => {
    if (this.state.cart_count > 0) {
      this.setState({ cart_count: this.state.cart_count - 1 });
    }
  };
  onAddClick = event => {
    if (this.state.cart_count < this.props.product.stock) {
      this.setState({ cart_count: this.state.cart_count + 1 });
    }
  };

  handleCartButton = event => {
    event.preventDefault();
    if (this.props.isLogin === null) {
      this.props.history.push("/login");
    }
    let url = "/product/" + this.state.product_id + "/cart";
    let token = sessionStorage.getItem("token");

    this.props.axiosNoToken
      .post(
        url,
        { qty: this.state.cart_count },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(response => {
        alert("sukses");
        this.props.getCart();
      })
      .catch(error => {
        console.log("Error add to cart", error);
        // alert(error);
      });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-12">
              <Category />
            </div>
            <div className="col-md-9 col-12 ">
              <div className="row border justify-content-center">
                <div className="col-12  h-100 pt-3">
                  <div className="row">
                    <div className="col-md-3 col-12">
                      <img width="80%" src={this.props.product.img_url} />
                    </div>
                    <div className="col-md-6 col-12">
                      <h4>{this.props.product.name}</h4>
                      <h6>Rp{this.props.product.price}</h6>
                      <h6>Stock : {this.props.product.stock}</h6>
                      <h6>Status :{this.props.product.status}</h6>
                      <p>Deskripsi :{this.props.product.description}</p>
                    </div>
                    <div className="col-3">
                      <form>
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={this.onMinusClick}
                          >
                            -
                          </button>
                          <div className="pt-2 pl-2" style={{ width: 30 }}>
                            {this.state.cart_count}
                          </div>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={this.onAddClick}
                          >
                            +
                          </button>
                        </div>
                        <br />
                        <br />
                        <button
                          className="btn btn-primary"
                          onClick={this.handleCartButton}
                        >
                          Cart
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row border justify-content-center">
                <div className="col-12">
                  <p>Nama Toko: {this.props.shop.name}</p>
                  <p>Lokasi: {this.props.shop.city}</p>
                  <p>Produk Terjual: {this.props.shop.product_cnt}</p>
                  <p>Kontak: {this.props.shop.contact}</p>
                  <p>Status: {this.props.shop.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "isLogin, product, token, axiosNoToken, shop",
  actions
)(ProductDetails);
