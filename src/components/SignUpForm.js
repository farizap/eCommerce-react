import React from "react";

function LoginForm(props) {
  return (
    <div className="row justify-content-center">
      <nav className="col-12 navbar navbar-light">
        <form onSubmit={props.onSubmit}>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputEmail4">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Your Username"
                  onChange={props.onUsernameChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                  onChange={props.onPasswordChange}
                  value={props.password}
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
              <label for="inputAddress2">nama</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                onChange={props.onNameChange}
                value={props.name}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputCity">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  onChange={props.onContactChange}
                  value={props.contact}
                />
              </div>
              <div className="form-group col-md-4">
                <label for="inputState">Gender</label>
                <select
                  id="inputState"
                  className="form-control"
                  onChange={props.onGenderChange}
                  value={props.gender}
                >
                  <option selected>male</option>
                  <option>female</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label for="inputZip">Umur</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputZip"
                  onChange={props.onAgeChange}
                  value={props.age}
                />
              </div>
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

export default LoginForm;
