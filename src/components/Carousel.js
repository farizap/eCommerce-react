import { actions } from "../store";
import { connect } from "unistore/react";
import { Link } from "react-router-dom";
import React from "react";

// import bootstrap-react
import { Carousel } from "react-bootstrap";

// import img
import banner1 from "../assets/img/banner_pet1.jpg";
import banner2 from "../assets/img/banner_pet2.jpg";
import banner3 from "../assets/img/banner_pet3.jpg";
import banner4 from "../assets/img/banner_pet4.jpg";
function BannerHome(props) {
  return (
    <div className="banner-home">
      {/* <Carousel> */}
      {/* <Carousel.Item>
          <img className="d-block w-100" src={banner1} alt="First slide" />
          <Carousel.Caption>
            <h3>Animals share with us the privilege of having a soul</h3>
            sidebarprofile          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner2} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner3} alt="Third slide" />
        </Carousel.Item> */}
      {/* <Carousel.Item> */}
      <img className="d-block w-100" src={banner4} alt="Third slide" />
      <Link to="/product">
        <button className="btn" type="button">
          Shop Now
        </button>
      </Link>

      {/* </Carousel.Item> */}
      {/* </Carousel> */}
    </div>
  );
}

export default connect(
  "",
  actions
)(BannerHome);
