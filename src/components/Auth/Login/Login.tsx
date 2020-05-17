import React, { FunctionComponent } from "react";

import { Link } from "react-router-dom";

export const Login: FunctionComponent = () => {
  return (
    <p>
      I am Login!
      <br />
      <Link to="/register">Register</Link>
    </p>
  );
};

export default Login;
