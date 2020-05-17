import { AuthAction } from "../actions/creators/auth";
import { AuthState } from "../../models/state/auth-state";

const initialState: AuthState = {
  authed: false,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
) => {
  return state;
};
