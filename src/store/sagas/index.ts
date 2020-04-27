import { takeEvery } from "redux-saga/effects";

import { addTrackSaga, fetchTrackSaga } from "./track";
import { ADD_TRACK, FETCH_TRACK } from "../actions/types/types";

export function* watchTrack() {
  yield takeEvery(ADD_TRACK, addTrackSaga);
  yield takeEvery(FETCH_TRACK, fetchTrackSaga);
}
