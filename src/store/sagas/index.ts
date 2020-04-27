import { takeEvery } from "redux-saga/effects";

import { addTrackSaga, deleteTrackSaga, fetchTrackSaga } from "./track";
import { ADD_TRACK, FETCH_TRACK, DELETE_TRACK } from "../actions/types/types";

export function* watchTrack() {
  yield takeEvery(ADD_TRACK, addTrackSaga);
  yield takeEvery(DELETE_TRACK, deleteTrackSaga);
  yield takeEvery(FETCH_TRACK, fetchTrackSaga);
}
