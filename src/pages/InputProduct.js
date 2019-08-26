import React from "react";
import { Redirect } from "react-router-dom";

import { connect } from "unistore/react";
import { actions } from "../store";
import { axios } from "axios";

//import component
// import InputProductForm from "../components/InputProductForm";
import { async } from "q";
//import image
// import logo from "../assets/img/logo.svg";

class InputProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: "",
      name: "",
      img_url: "",
      stock: 0,
      price: 0,
      description: ""
    };
    this.category_id = React.createRef();
    this.name = React.createRef();
    this.img_url = React.createRef();
    this.stock = React.createRef();
    this.price = React.createRef();
    this.description = React.createRef();
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  async handleInputSubmit(event) {
    event.preventDefault();
    const data = {
      category_id: this.category_id.current.value,
      name: this.name.current.value,
      img_url: this.img_url.current.value,
      stock: this.stock.current.value,
      price: this.price.current.value,
      description: this.description.current.value
    };

    const self = this;
    await this.props.axiosNoToken.post("/product", data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    });
    this.props.history.replace("/shop/items");
  }

  islogin() {
    if (sessionStorage.getItem("token") === "") {
      return <Redirect to="/login" />;
    }
  }

  isseller() {
    if (sessionStorage.getItem("shop_id") === "") {
      return <Redirect to="/shop/signup" />;
    }
  }
  render() {
    return (
      <div>
        {this.islogin()}
        {this.isseller()}
        <div className="container ">
          <br />
          <br />
          <div className="row justify-content-center">
            <div className="col-5 border input-barang">
              <div className="row justify-content-center">
                <div className="col-12 text-center pt-2">Input Produk</div>
                <div className="row justify-content-center">
                  <nav className="col-12 navbar navbar-light px-4">
                    <form onSubmit={this.handleInputSubmit} method="POST">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="name">Nama Barang</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Nama Barang"
                            ref={this.name}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="img_url">img_url</label>
                          <input
                            type="text"
                            className="form-control"
                            id="img_url"
                            name="img_url"
                            placeholder="Img_url"
                            ref={this.img_url}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="stock">Stock</label>
                        <input
                          type="number"
                          className="form-control"
                          name="stock"
                          id="stock"
                          placeholder="Stock"
                          ref={this.stock}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="price">Harga</label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          placeholder="Harga"
                          ref={this.price}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="deskripsi">Deskripsi</label>
                          <input
                            type="text"
                            name="deskripsi"
                            className="form-control"
                            id="deskripsi"
                            ref={this.description}
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="category">Kategori</label>
                          <select
                            id="category"
                            name="category"
                            className="form-control"
                            ref={this.category_id}
                          >
                            {this.props.listCategory.map((value, index) => {
                              return (
                                <option key={index} value={value.id}>
                                  {value.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <button className="btn btn-primary">Input Barang</button>
                    </form>
                  </nav>
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
  " axiosNoToken, listCategory",
  actions
)(InputProduct);
