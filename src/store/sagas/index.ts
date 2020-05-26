import { takeEvery } from "redux-saga/effects";

import { authLoginSaga, authRegisterSaga } from "./auth";
import { addTrackSaga, deleteTrackSaga, fetchTrackSaga } from "./track";
import { AUTH_LOGIN, AUTH_REGISTER } from "../actions/types/auth";
import { ADD_TRACK, DELETE_TRACK, FETCH_TRACK } from "../actions/types/track";

export function* watchAuth() {
  yield takeEvery(AUTH_LOGIN, authLoginSaga);
  yield takeEvery(AUTH_REGISTER, authRegisterSaga);
}

export function* watchTrack() {
  yield takeEvery(ADD_TRACK, addTrackSaga);
  yield takeEvery(DELETE_TRACK, deleteTrackSaga);
  yield takeEvery(FETCH_TRACK, fetchTrackSaga);
}
