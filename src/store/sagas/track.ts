import { put } from "redux-saga/effects";

import {
  addTrackStart,
  addTrackSuccess,
  deleteTrackStart,
  deleteTrackSuccess,
  fetchTrackStart,
  fetchTrackSuccess,
  AddTrackAction,
  DeleteTrackAction,
  FetchTrackAction,
} from "../actions/creators/track";
import { Track } from "../../models/track";
import { Http } from "../../utils/http";

export function* addTrackSaga(action: AddTrackAction) {
  yield put(addTrackStart());
  const response: Response = yield Http.post(
    "tracks.json",
    JSON.stringify(action.track)
  );
  const responseData: any = yield response.json();
  const track: Track = {
    ...action.track,
    id: responseData.name,
  };
  yield put(addTrackSuccess(track));
}

export function* deleteTrackSaga(action: DeleteTrackAction) {
  yield put(deleteTrackStart());
  yield Http.delete(`tracks/${action.id}.json`);
  yield put(deleteTrackSuccess(action.id));
}

export function* fetchTrackSaga(action: FetchTrackAction) {
  yield put(fetchTrackStart());
  const response: Response = yield Http.get("tracks.json");
  const responseData: any = yield response.json();
  const tracks: Track[] = [];
  for (let key in responseData) {
    const track: Track = {
      ...responseData[key],
      id: key,
    };
    tracks.push(track);
  }

  yield put(fetchTrackSuccess(tracks));
}
