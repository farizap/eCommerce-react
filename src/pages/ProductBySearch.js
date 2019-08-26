import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";
import { Link } from "react-router-dom";

// import component
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";

class ProductBySearch extends React.Component {
  componentDidMount() {
    this.getData();
  }

  getData() {
    this.props.getProduct({
      params: {
        search: this.props.search,
        sort: this.props.sortSearch,
        orderby: this.props.orderBySearch
      }
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.search !== this.props.search ||
      prevProps.orderBySearch !== this.props.orderBySearch ||
      prevProps.sortSearch !== this.props.sortSearch
    ) {
      this.getData();
    }
  };

  render() {
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
  "listProduct , search, orderBySearch, sortSearch",
  actions
)(ProductBySearch);
