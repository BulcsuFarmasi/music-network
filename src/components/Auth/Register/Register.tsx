import React, { useState, ChangeEvent, FunctionComponent } from "react";

import { User } from "../../../models/user";
import { Button, ButtonState } from "../../UI/Button/Button";

export const Register: FunctionComponent = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
  });

  const register = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
        <label htmlFor="username">User Name</label>
        <br />
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateUser(event, "username")
          }
        />
      </p>
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
        <label htmlFor="password">Password</label>
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
        <Button clicked={register} state={ButtonState.confirm}>
          Register
        </Button>
      </p>
    </form>
  );
};

export default Register;
