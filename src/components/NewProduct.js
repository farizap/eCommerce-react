import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";

import ProductCard from "./ProductCard";

class NewProduct extends React.Component {
  componentDidMount = () => {
    this.props.getProduct();
    console.log(this.props.listCategory);
  };

  render() {
    return (
      <div className="new-product">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "listProduct",
  actions
)(NewProduct);
