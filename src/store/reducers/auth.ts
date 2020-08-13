import {
  AuthAction,
  AuthLoginSuccessAction,
  UpdateUserSuccessAction,
} from "../actions/creators/auth";
import {
  AUTH_REGISTER_START,
  AUTH_REGISTER_SUCCESS,
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  UPDATE_USER_SUCCESS,
} from "../actions/types/auth";
import { AuthState } from "../../models/state/auth-state";
import { LoadingState } from "../../models/state/loading-state";
import { updateObject } from "../../utils/object-utils";

const initialState: AuthState = {
  authed: false,
  loading: LoadingState.initial,
};

const authLoginSuccess = (
  state: AuthState,
  action: AuthLoginSuccessAction
): AuthState => {
  return updateObject(state, {
    authed: true,
    loggedInUser: action.user,
    loading: LoadingState.completed,
  });
};

const authRegisterSuccess = (state: AuthState): AuthState => {
  return updateObject(state, { loading: LoadingState.completed });
};

const startLoading = (state: AuthState): AuthState => {
  return updateObject(state, { loading: LoadingState.onGoing });
};

const updateUserSucces = (
  state: AuthState,
  action: UpdateUserSuccessAction
): AuthState => {
  let user = { ...state.loggedInUser };
  user = updateObject(user, action.user);
  return updateObject(state, { loggedInUser: user });
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
) => {
  switch (action.type) {
    case AUTH_LOGIN_START:
      return startLoading(state);
    case AUTH_LOGIN_SUCCESS:
      return authLoginSuccess(state, action);
    case AUTH_REGISTER_START:
      return startLoading(state);
    case AUTH_REGISTER_SUCCESS:
      return authRegisterSuccess(state);
    case UPDATE_USER_SUCCESS:
      return updateUserSucces(state, action);
  }
  return state;
};
