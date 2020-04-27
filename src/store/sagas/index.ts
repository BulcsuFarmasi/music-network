import { takeEvery } from "redux-saga/effects";

import { addTrackSaga } from "./track";
import { ADD_TRACK } from "../actions/types/types";

export function* watchTrack() {
  yield takeEvery(ADD_TRACK, addTrackSaga);
}
