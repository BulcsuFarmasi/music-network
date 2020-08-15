import { call, put } from "redux-saga/effects";

import {
  authLoginStart,
  authLoginSuccess,
  authRegisterStart,
  authRegisterSuccess,
  updateUser,
  updateUserSuccess,
  AuthLoginAction,
  AuthRegisterAction,
  UpdateProfilePictureAction,
  UpdateUserAction,
} from "../actions/creators/auth";
import { User } from "../../models/user";
import { Firebase } from "../../utils/firebase";
import { firebaseConfig } from "../../utils/firebase-config";
import { Http } from "../../utils/http";
import { File } from "../../models/file";

export function* authLoginSaga(action: AuthLoginAction) {
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
  const user: User = {
    ...responseData[Object.keys(responseData)[0]],
    id: Object.keys(responseData)[0],
  };
  yield put(authLoginSuccess(user));
}

export function* authRegisterSaga(action: AuthRegisterAction) {
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

export function* updateProfilePictureSaga(action: UpdateProfilePictureAction) {
  if (!Firebase.started) {
    Firebase.init();
  }
  yield Firebase.upload(action.fileName, action.file);
  const profilePicture: File = {
    storagePath: action.fileName,
    downloadUrl: yield Firebase.download(action.fileName),
  };
  const user: User = {
    id: action.userId,
    profilePicture,
  };
  const updateUserAction: UpdateUserAction = updateUser(user);
  yield call(updateUserSaga, updateUserAction);
  yield put(updateUserSuccess(user));
}

export function* updateUserSaga(action: UpdateUserAction) {
  const userId = action.user.id;
  delete action.user.id;
  Http.setDatabaseUrl();
  yield Http.patch(`users/${userId}.json`, JSON.stringify(action.user));
}
