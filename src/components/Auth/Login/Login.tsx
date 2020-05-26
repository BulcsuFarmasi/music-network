import React, { FunctionComponent } from "react";

import { Link } from "react-router-dom";
import { Button, ButtonState } from "../../UI/Button/Button";

export const Login: FunctionComponent = () => {
  const login = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault();
  };
  return (
    <form>
      <p>
        <label htmlFor="email">Email</label>
        <br />
        <input type="email" id="email" />
      </p>
      <p>
        <label htmlFor="email">Password</label>
        <br />
        <input type="password" id="password" />
      </p>
      <p>
        <Button clicked={login} state={ButtonState.confirm}>
          Login
        </Button>
      </p>
      <p>
        <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default Login;
