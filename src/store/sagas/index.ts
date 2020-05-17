import { takeEvery } from "redux-saga/effects";

import { addTrackSaga, deleteTrackSaga, fetchTrackSaga } from "./track";
import { ADD_TRACK, DELETE_TRACK, FETCH_TRACK } from "../actions/types/track";

export function* watchTrack() {
  yield takeEvery(ADD_TRACK, addTrackSaga);
  yield takeEvery(DELETE_TRACK, deleteTrackSaga);
  yield takeEvery(FETCH_TRACK, fetchTrackSaga);
}
