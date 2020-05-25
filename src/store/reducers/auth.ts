import { AuthAction } from "../actions/creators/auth";
import {
  AUTH_REGISTER_START,
  AUTH_REGISTER_SUCCESS,
} from "../actions/types/auth";
import { AuthState } from "../../models/state/auth-state";
import { LoadingState } from "../../models/state/loading-state";
import { updateObject } from "../../utils/object-utils";

const initialState: AuthState = {
  authed: false,
  loading: LoadingState.initial,
};

const authRegisterSuccess = (state: AuthState): AuthState => {
  return updateObject(state, { loading: LoadingState.completed });
};

const startLoading = (state: AuthState): AuthState => {
  return updateObject(state, { loading: LoadingState.onGoing });
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
) => {
  switch (action.type) {
    case AUTH_REGISTER_START:
      return startLoading(state);
    case AUTH_REGISTER_SUCCESS:
      return authRegisterSuccess(state);
  }
  return state;
};
