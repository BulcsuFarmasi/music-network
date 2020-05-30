import React, {
  useEffect,
  useState,
  ChangeEvent,
  FunctionComponent,
} from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import { Button, ButtonState } from "../../UI/Button/Button";
import { User } from "../../../models/user";
import { AuthAction, authLogin } from "../../../store/actions/creators/auth";
import { AppState } from "../../../models/state/app-state";
import { LoadingState } from "../../../models/state/loading-state";
import { History } from "history";

interface Props {
  authLogin: (user: User) => void;
  history: History;
  loading: LoadingState;
}

export const Login: FunctionComponent<Props> = (props: Props) => {
  const { authLogin, history, loading } = props;

  const [user, setUser] = useState<User>({ email: "", password: "" });

  useEffect(() => {
    if (loading === LoadingState.completed) {
      history.push("/track-list");
    }
  }, [history, loading]);

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
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => {
  return {
    authLogin: (user: User) => dispatch(authLogin(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
