import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";

// import bootstrap-react
import { Carousel } from "react-bootstrap";

// import img
import banner1 from "../assets/img/banner_pet1.jpg";
import banner2 from "../assets/img/banner_pet2.jpg";
import banner3 from "../assets/img/banner_pet3.jpg";

function ProductCard(props) {
  return (
    <div className="product-card border background-white mx-1 my-2">
      <div className="container px-0 h-100">
        <div className="row px-0 mx-0 h-100">
          <div className="col-12 px-0 mx-0">
            <div className="row img-card align-items-center mx-0 h-100">
              <div className="col-12 text-center px-0">
                <img width="100%" src={props.data.img_url} />
              </div>
              <div className="col-12 align-self-end">
                <h5>{props.data.name}</h5>
                <h6>Rp{props.data.price}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  "",
  actions
)(ProductCard);
