import { AuthAction } from "../actions/creators/auth";
import { AuthState } from "../../models/state/auth-state";
import { LoadingState } from "../../models/state/loading-state";

const initialState: AuthState = {
  authed: false,
  loading: LoadingState.initial,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
) => {
  return state;
};
