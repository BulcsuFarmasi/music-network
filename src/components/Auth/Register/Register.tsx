import React, {
  useEffect,
  useState,
  ChangeEvent,
  FunctionComponent,
} from "react";

import { Dispatch } from "redux";
import { History } from "history";

import { Button, ButtonState } from "../../UI/Button/Button";
import { User } from "../../../models/user";
import { AppState } from "../../../models/state/app-state";
import { LoadingState } from "../../../models/state/loading-state";
import { AuthAction, authRegister } from "../../../store/actions/creators/auth";
import { connect } from "react-redux";

interface RegisterProps {
  authRegister: (user: User) => void;
  history: History;
  loading: LoadingState;
}

export const Register: FunctionComponent<RegisterProps> = (
  props: RegisterProps
) => {
  const { authRegister, history, loading } = props;

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    if (loading === LoadingState.completed) {
      history.push("/");
    }
  }, [history, loading]);

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
