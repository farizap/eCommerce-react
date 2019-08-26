import React from "react";
import { Redirect } from "react-router-dom";

import { connect } from "unistore/react";
import { actions } from "../store";

//import image
import gambar404 from "../assets/img/404.png";

class Page404 extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <br />
          <br />
          <div className="row justify-content-center">
            <div className="col-12 border bg-light pt-2 pb-4">
              <div className="row justify-content-center">
                <div className="col-12 text-center pt-2">
                  <img src={gambar404} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default Login;
export default connect(
  "",
  actions
)(Page404);
