import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";
import { Link } from "react-router-dom";
// import component
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import NewProduct from "../components/NewProduct";
import CategoryNav from "../components/CategoryNav";

class Home extends React.Component {
  componentDidMount() {
    this.getData();
  }

  getData() {
    this.props.getProduct({
      params: {
        orderby: "created_at",
        sort: "desc"
      }
    });
    this.props.getProduct2({
      params: {
        orderby: "buy_count",
        sort: "desc"
      }
    });
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 px-0">
              <Carousel />
              <CategoryNav />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="row">
                <div className="col-12">
                  {/* Carousel Lama */}
                  <br />
                  <br />
                </div>

                <div className="col-12">
                  <h3>Hewan Terbaru</h3>
                  <div className="row">
                    {this.props.listProduct.slice(0, 6).map(value => {
                      return (
                        <div className="col-lg-2 col-md-4 col-6">
                          <Link to={"/product/" + value.id} key={value.id}>
                            <ProductCard data={value} />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="col-12">
                  <h3>Hewan Terpopuler</h3>
                  <div className="row">
                    {this.props.listProduct2.slice(0, 6).map(value => {
                      return (
                        <div className="col-lg-2 col-md-4 col-6">
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
        </div>
      </div>
    );
  }
}
export default connect(
  "listProduct, listProduct2",
  actions
)(Home);
