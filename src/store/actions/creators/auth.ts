import {
  AUTH_LOGIN,
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_REGISTER,
  AUTH_REGISTER_START,
  AUTH_REGISTER_SUCCESS,
  AUTH_REFRESH,
  CHECK_AUTH,
  UPDATE_PROFILE_PICTURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
} from "../types/auth";
import { User } from "../../../models/user";

export interface AuthLoginAction {
  type: typeof AUTH_LOGIN;
  user: User;
}

export interface AuthLoginStartAction {
  type: typeof AUTH_LOGIN_START;
}

export interface AuthLoginSuccessAction {
  type: typeof AUTH_LOGIN_SUCCESS;
  user: User;
}

export interface AuthLogoutAction {
  type: typeof AUTH_LOGOUT;
}

export interface AuthLogoutSuccessAction {
  type: typeof AUTH_LOGOUT_SUCCESS;
}

export interface AuthRegisterAction {
  type: typeof AUTH_REGISTER;
  user: User;
}

export interface AuthRegisterStartAction {
  type: typeof AUTH_REGISTER_START;
}

export interface AuthRegisterSuccessAction {
  type: typeof AUTH_REGISTER_SUCCESS;
}

export interface AuthRefreshAction {
  type: typeof AUTH_REFRESH;
  refreshToken: string;
  expiresIn: number;
}

export interface CheckAuthAction {
  type: typeof CHECK_AUTH;
}

export interface UpdateProfilePictureAction {
  type: typeof UPDATE_PROFILE_PICTURE;
  user: User | undefined;
  file: File;
  fileName: string;
}

export interface UpdateUserAction {
  type: typeof UPDATE_USER;
  user: User;
  token: string;
}

export interface UpdateUserSuccessAction {
  type: typeof UPDATE_USER_SUCCESS;
  user: User;
}

export const authLogin = (user: User): AuthLoginAction => ({
  type: AUTH_LOGIN,
  user,
});

export const authLoginStart = (): AuthLoginStartAction => ({
  type: AUTH_LOGIN_START,
});

export const authLoginSuccess = (user: User): AuthLoginSuccessAction => ({
  type: AUTH_LOGIN_SUCCESS,
  user,
});

export const authLogout = (): AuthLogoutAction => ({
  type: AUTH_LOGOUT,
});

export const authLogoutSuccess = (): AuthLogoutSuccessAction => ({
  type: AUTH_LOGOUT_SUCCESS,
});

export const authRegister = (user: User): AuthRegisterAction => ({
  type: AUTH_REGISTER,
  user,
});

export const authRegisterStart = (): AuthRegisterStartAction => ({
  type: AUTH_REGISTER_START,
});

export const authRegisterSuccess = (): AuthRegisterSuccessAction => ({
  type: AUTH_REGISTER_SUCCESS,
});

export const authRefresh = (
  expiresIn: number,
  refreshToken: string
): AuthRefreshAction => ({
  type: AUTH_REFRESH,
  expiresIn,
  refreshToken,
});

export const checkAuth = (): CheckAuthAction => ({
  type: CHECK_AUTH,
});

export const updateProfilePicture = (
  user: User | undefined,
  file: File,
  fileName: string
) => ({
  type: UPDATE_PROFILE_PICTURE,
  user,
  file,
  fileName,
});

export const updateUser = (user: User, token: string): UpdateUserAction => ({
  type: UPDATE_USER,
  user,
  token,
});

export const updateUserSuccess = (user: User): UpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  user,
});

export type AuthAction =
  | AuthLoginAction
  | AuthLoginStartAction
  | AuthLoginSuccessAction
  | AuthLogoutAction
  | AuthLogoutSuccessAction
  | AuthRegisterAction
  | AuthRegisterStartAction
  | AuthRegisterSuccessAction
  | UpdateUserSuccessAction;
