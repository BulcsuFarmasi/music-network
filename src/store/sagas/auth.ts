import { put } from "redux-saga/effects";

import {
  AuthRegisterAction,
  authRegsiterStart,
  authRegisterSuccess,
} from "../actions/creators/auth";
import { firebaseConfig } from "../../utils/firebase-config";
import { Http } from "../../utils/http";

export function* authRegisterSaga(action: AuthRegisterAction) {
  yield put(authRegsiterStart());

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
