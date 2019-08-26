import React from "react";

function LoginForm(props) {
  return (
    <div className="row justify-content-center">
      <nav className="col-12 navbar navbar-light">
        <form onSubmit={props.onSubmit}>
          <div className="form-group">
            {/* <label htmlFor="exampleInputEmail1">username</label> */}
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Username"
              onChange={props.onUsernameChange}
              value={props.username}
            />
            <small id="emailHelp" className="form-text text-muted">
              Your username
            </small>
          </div>
          <div className="form-group">
            {/* <label htmlFor="exampleInputPassword1">Password</label> */}
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={props.onPasswordChange}
              value={props.password}
            />
            <small id="emailHelp" className="form-text text-muted">
              Your password
            </small>
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
        </form>
      </nav>
    </div>
  );
}

export default LoginForm;
