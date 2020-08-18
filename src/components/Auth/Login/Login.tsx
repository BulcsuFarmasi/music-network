import React, {
  useEffect,
  useState,
  ChangeEvent,
  FunctionComponent,
} from "react";

import { History } from "history";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import { Button, ButtonState } from "../../UI/Button/Button";
import { User } from "../../../models/user";
import { AppState } from "../../../models/state/app-state";
import { LoadingState } from "../../../models/state/loading-state";
import { AuthAction, authLogin } from "../../../store/actions/creators/auth";

interface LoginProps {
  authed: boolean;
  authLogin: (user: User) => void;
  history: History;
  loading: LoadingState;
}

export const Login: FunctionComponent<LoginProps> = (props: LoginProps) => {
  const { authed, authLogin, history, loading } = props;

  const [user, setUser] = useState<User>({ email: "", password: "" });

  useEffect(() => {
    if (loading === LoadingState.completed && authed) {
      history.push("/profile");
    }
  }, [authed, history, loading]);

  const login = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault();
    authLogin(user);
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

const mapStateToProps = (state: AppState) => {
  return {
    authed: state.auth.authed,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => {
  return {
    authLogin: (user: User) => dispatch(authLogin(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
