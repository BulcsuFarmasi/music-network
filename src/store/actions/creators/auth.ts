import {
  AUTH_LOGIN,
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER,
  AUTH_REGISTER_START,
  AUTH_REGISTER_SUCCESS,
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

export const authRegister = (user: User): AuthRegisterAction => ({
  type: AUTH_REGISTER,
  user,
});

export const authRegsiterStart = (): AuthRegisterStartAction => ({
  type: AUTH_REGISTER_START,
});

export const authRegisterSuccess = (): AuthRegisterSuccessAction => ({
  type: AUTH_REGISTER_SUCCESS,
});

export type AuthAction =
  | AuthLoginAction
  | AuthLoginStartAction
  | AuthLoginSuccessAction
  | AuthRegisterAction
  | AuthRegisterStartAction
  | AuthRegisterSuccessAction;