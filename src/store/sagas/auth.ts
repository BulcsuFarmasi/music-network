import { put } from "redux-saga/effects";

import {
  authLoginStart,
  authRegisterStart,
  authRegisterSuccess,
  AuthLoginAction,
  AuthRegisterAction,
  authLoginSuccess,
} from "../actions/creators/auth";
import { User } from "../../models/user";
import { firebaseConfig } from "../../utils/firebase-config";
import { Http } from "../../utils/http";

export function* authLoginSaga(action: AuthLoginAction) {
  console.log("login");

  yield put(authLoginStart());
  Http.setAuthUrl();
  let response: Response = yield Http.post(
    `signInWithPassword?key=${firebaseConfig.apiKey}`,
    JSON.stringify({ ...action.user, returnSecureToken: true })
  );
  let responseData: any = yield response.json();

  const authId = responseData.localId;
  Http.setDatabaseUrl();
  response = yield Http.get(`users.json?orderBy="authId"&equalTo="${authId}"`);
  responseData = yield response.json();
  const user: User = responseData[Object.keys(responseData)[0]];
  yield put(authLoginSuccess(user));
}

export function* authRegisterSaga(action: AuthRegisterAction) {
  console.log("register");

  yield put(authRegisterStart());

  Http.setAuthUrl();
  const signupUser = { ...action.user };
  delete signupUser.username;
  const response: Response = yield Http.post(
    `signUp?key=${firebaseConfig.apiKey}`,
    JSON.stringify({ ...signupUser, returnSecureToken: true })
  );
  const responseData: any = yield response.json();
  delete signupUser.password;
  signupUser.username = action.user.username;
  signupUser.authId = responseData.localId;

  Http.setDatabaseUrl();
  console.log(signupUser);

  yield Http.post("users.json", JSON.stringify(signupUser));
  yield put(authRegisterSuccess());
}
