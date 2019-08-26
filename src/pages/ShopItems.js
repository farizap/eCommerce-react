import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";
import { Link } from "react-router-dom";

// import component
import ProductCard from "../components/ProductCard";
import SideBarProfile from "../components/SideBarProfile";

class ShopItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    console.log(this.props);
    const config = {
      method: "get",
      url: "/product/shop",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    };
    const self = this;
    await this.props.axiosNoToken(config).then(response => {
      console.log(response);
      self.setState({ listProduct: response.data });
    });
  }

  handleDelete = (event, id) => {
    event.preventDefault();
    const config = {
      method: "delete",
      url: "/product/" + id,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    };
    const self = this;

    this.props.axiosNoToken(config).then(response => {
      console.log(response);
      self.getData();
    });
  };

  render() {
    if (this.state.listProduct.length < 1) {
      return <div />;
    } else {
      return (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-12">
                <SideBarProfile />
              </div>
              <div className="col-md-9 col-12">
                <div className="row">
                  {this.state.listProduct.products.map(value => {
                    return (
                      <div className="col-3 text-center">
                        <Link to={"/shop/items/" + value.id} key={value.id}>
                          <ProductCard data={value} />
                        </Link>
                        <button
                          className="btn-danger"
                          onClick={e => this.handleDelete(e, value.id)}
                        >
                          Hapus{" "}
                        </button>
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
}

export default connect(
  "token, axiosNoToken",
  actions
)(ShopItems);
