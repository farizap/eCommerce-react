import React from "react";

function SignUpShopForm(props) {
  return (
    <div className="row justify-content-center">
      <nav className="col-12 navbar navbar-light">
        <form onSubmit={props.onSubmit}>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputEmail4">Nama</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Your Username"
                  onChange={props.onNameChange}
                  value={props.name}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">Kota</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                  onChange={props.onCityChange}
                  value={props.city}
                />
              </div>
            </div>
            <div className="form-group">
              <label for="inputAddress">Alamat</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                onChange={props.onAddressChange}
                value={props.address}
              />
            </div>
            <div className="form-group">
              <label for="inputAddress2">Contact</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                onChange={props.onContactChange}
                value={props.contact}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </form>
      </nav>
    </div>
  );
}

export default SignUpShopForm;
