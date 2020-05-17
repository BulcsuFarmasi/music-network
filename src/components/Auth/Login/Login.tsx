import React, { FunctionComponent } from "react";

import { Link } from "react-router-dom";

const Login: FunctionComponent = () => {
  return (
    <p>
      I am Login!
      <br />
      <Link to="/register">Register</Link>
    </p>
  );
};
