import React, { useState, ChangeEvent, FunctionComponent } from "react";

import { Link } from "react-router-dom";

import { Button, ButtonState } from "../../UI/Button/Button";
import { User } from "../../../models/user";

export const Login: FunctionComponent = () => {
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const login = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault();
    console.log(user);
  };

  const updateUser = (
    event: ChangeEvent<HTMLInputElement>,
    propertyName: string
  ) => {
    const updatedUser = { ...user };
    updatedUser[propertyName] = event.target.value;
    setUser(updatedUser);
  };
  return (
    <form>
      <p>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateUser(event, "email")
          }
        />
      </p>
      <p>
        <label htmlFor="email">Password</label>
        <br />
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateUser(event, "password")
          }
        />
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
