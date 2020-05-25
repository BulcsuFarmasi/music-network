import React, {
  useState,
  ChangeEvent,
  FunctionComponent,
  Dispatch,
} from "react";

import { Button, ButtonState } from "../../UI/Button/Button";
import { User } from "../../../models/user";
import { AppState } from "../../../models/state/app-state";
import { LoadingState } from "../../../models/state/loading-state";
import { AuthAction, authRegister } from "../../../store/actions/creators/auth";
import { connect } from "react-redux";

interface Props {
  authRegister: (user: User) => void;
  loading: LoadingState;
}

export const Register: FunctionComponent<Props> = (props: Props) => {
  const { authRegister, loading } = props;

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
  });

  const register = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.preventDefault();
    authRegister(user);
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

const mapStateToProps = (state: AppState) => {
  return {
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => {
  return {
    authRegister: (user: User) => dispatch(authRegister(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
