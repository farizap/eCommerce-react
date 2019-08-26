import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";
import { Link, withRouter } from "react-router-dom";

// import img
import Cart from "../assets/img/cart.png";

class HeaderBawah extends React.Component {
  constructor(props) {
    super(props);
    this.search = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    this.props.setSearch(this.search.current.value);
    if (this.props.history.location.pathname !== "/product") {
      this.props.history.push("/product");
    }
  }

  componentDidMount() {
    this.props.getCart();
  }

  isLoginCart() {
    // console.log("islogin", this.props.isLogin);
    if (sessionStorage.getItem("token") !== null) {
      return (
        <div className="col-12 px-0 text-center">
          <div className="row align-items-center justify-content-center">
            <div className="col-4 text-right">
              <span>{this.props.cart_cnt}</span>
              <Link to="/cart">
                <img src={Cart} height="50px" />
              </Link>
            </div>
            <div className="col-4 text-left">
              Total : Rp{this.props.cart_price}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-12 px-0">
          <div className="row align-items-center justify-content-center">
            <div className="col-6 px-0 text-right">
              <Link to="/login">
                <button type="button" className="btn btn-login w-75">
                  Login
                </button>
              </Link>
            </div>
            <div className="col-6 px-0">
              <Link to="/signup">
                <button
                  type="button"
                  className="btn btn-signup text-black w-75"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="header-bawah">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-lg-3 col-12 text-left  ">
              <div className="row align-items-center h-100">
                <div className="col-12">
                  <Link id="tokopetia" to="/">
                    <h1>TOKOPETIA</h1>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12 text-left">
              <div className="row align-items-center h-100">
                <div className="col-12">
                  <form onSubmit={this.onSubmit}>
                    <div className="searchbar">
                      <div className="input-group md-form form-sm form-2 pl-0">
                        <input
                          className="form-control my-0 py-1 lime-border"
                          type="text"
                          placeholder="Search"
                          aria-label="Search"
                          ref={this.search}
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text lime lighten-2"
                            id="basic-text1"
                          >
                            <i
                              className="fas fa-search text-grey"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12 text-center px-0 mr-0">
              <div className="row align-items-center justify-content-center h-100 ">
                {this.isLoginCart()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    "isLogin, cart_cnt, search, cart_price",
    actions
  )(HeaderBawah)
);
