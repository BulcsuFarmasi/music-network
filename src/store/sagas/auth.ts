import { call, put } from "redux-saga/effects";

import {
  authLoginStart,
  authLoginSuccess,
  authRegisterStart,
  authRegisterSuccess,
  authRefresh,
  authLogoutSuccess,
  updateUser,
  updateUserSuccess,
  AuthLoginAction,
  AuthLogoutAction,
  AuthRegisterAction,
  AuthRefreshAction,
  CheckAuthAction,
  UpdateProfilePictureAction,
  UpdateUserAction,
} from "../actions/creators/auth";
import { User } from "../../models/user";
import { Firebase } from "../../utils/firebase";
import { firebaseConfig } from "../../utils/firebase-config";
import { Http } from "../../utils/http";
import { File } from "../../models/file";
import { LocalStorageKeys } from "../../utils/localstorage-keys";

export function* authLoginSaga(action: AuthLoginAction) {
  yield put(authLoginStart());
  Http.setAuthUrl();
  let response: Response = yield Http.post(
    `signInWithPassword?key=${firebaseConfig.apiKey}`,
    JSON.stringify({ ...action.user, returnSecureToken: true })
  );
  let responseData: any = yield response.json();

  const authId = responseData.localId;

  const expirationDate: Date = new Date(
    Date.now() + responseData.expiresIn * 1000
  );

  const loggedInUser: User = {
    authId,
    token: {
      expirationDate,
      body: responseData.idToken,
      refreshToken: responseData.refreshToken,
    },
  };

  localStorage.setItem(
    LocalStorageKeys.loggedInUser,
    JSON.stringify(loggedInUser)
  );

  yield put(authRefresh(60000, loggedInUser.token?.refreshToken ?? ""));

  let user: User = yield getUserByAuthId(
    authId,
    loggedInUser.token?.body ?? ""
  );

  user = {
    ...loggedInUser,
    ...user,
  };

  yield put(authLoginSuccess(user));
}

export function* authLogoutSaga(action: AuthLogoutAction) {
  yield localStorage.removeItem(LocalStorageKeys.loggedInUser);
  yield put(authLogoutSuccess());
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
  const token = responseData.idToken;

  Http.setDatabaseUrl();

  yield Http.post(`users.json?auth=${token}`, JSON.stringify(signupUser));
  yield put(authRegisterSuccess());
}

export function* authRefreshSaga(action: AuthRefreshAction) {
  yield setTimeout(async () => {
    Http.setRefreshTokenUrl();
    const response: Response = await Http.post(
      "",
      JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: action.refreshToken,
      })
    );
    const responseData: any = await response.json();
    const loggedInUser: User | null = getLoggedInUserFromStorage();
    if (loggedInUser && loggedInUser?.token) {
      const expirationDate: Date = new Date(
        Date.now() + responseData.expiresIn * 1000
      );
      loggedInUser.token = {
        body: responseData.id_token,
        expirationDate,
        refreshToken: responseData.refresh_token,
      };
      localStorage.setItem(
        LocalStorageKeys.loggedInUser,
        JSON.stringify(loggedInUser)
      );
    }
  }, action.expiresIn);
}

export function* checkAuthSaga(action: CheckAuthAction) {
  const loggedInUser: User | null = getLoggedInUserFromStorage();

  if (loggedInUser && loggedInUser?.token) {
    const expirationDate = new Date(loggedInUser.token.expirationDate);
    const now = new Date();
    if (now < expirationDate) {
      let user: User = yield getUserByAuthId(
        loggedInUser.authId ?? "",
        loggedInUser.token.body
      );
      user = {
        ...user,
        ...loggedInUser,
      };
      yield put(authLoginSuccess(user));
    }
  }
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
    id: action.user?.id,
    profilePicture,
  };
  const updateUserAction: UpdateUserAction = updateUser(
    user,
    action.user?.token?.body ?? ""
  );
  yield call(updateUserSaga, updateUserAction);
  yield put(updateUserSuccess(user));
}

export function* updateUserSaga(action: UpdateUserAction) {
  const userId = action.user.id;
  delete action.user.id;
  Http.setDatabaseUrl();
  yield Http.patch(
    `users/${userId}.json?auth=${action.token}`,
    JSON.stringify(action.user)
  );
}

const getLoggedInUserFromStorage = (): User | null => {
  const item: string | null = localStorage.getItem(
    LocalStorageKeys.loggedInUser
  );
  return item ? (JSON.parse(item) as User) : null;
};

const getUserByAuthId = async (
  authId: string,
  token: string
): Promise<User> => {
  Http.setDatabaseUrl();
  const response = await Http.get(
    `users.json?orderBy="authId"&equalTo="${authId}"&auth=${token}`
  );
  const responseData = await response.json();
  const user: User = {
    ...responseData[Object.keys(responseData)[0]],
    id: Object.keys(responseData)[0],
  };
  return user;
};
