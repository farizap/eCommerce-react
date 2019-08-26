import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";
import { Link } from "react-router-dom";

// import component
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";

class ProductByCategory extends React.Component {
  componentDidMount() {
    this.getData();
  }

  getData() {
    let category = this.props.match.params.category;
    this.props.getProduct({
      params: {
        category_id: category
      }
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.getData();
    }
  };

  render() {
    console.log(this.props.listProduct);
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-12">
              <Category />
            </div>
            <div className="col-md-9 col-12">
              <div className="row">
                {this.props.listProduct.map(value => {
                  return (
                    <div className="col-3">
                      <Link to={"/product/" + value.id} key={value.id}>
                        <ProductCard data={value} />
                      </Link>
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
  "listProduct",
  actions
)(ProductByCategory);
