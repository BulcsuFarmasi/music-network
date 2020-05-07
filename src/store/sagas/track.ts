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
import { Firebase } from "../../utils/firebase";

export function* addTrackSaga(action: AddTrackAction) {
  yield put(addTrackStart());
  if (!Firebase.started) {
    Firebase.init();
  }
  yield Firebase.upload(action.fileName, action.file);
  action.track.storagePath = action.fileName;
  action.track.downloadUrl = yield Firebase.download(action.fileName);
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
  yield Http.delete(`tracks/${action.track.id}.json`);
  if (!Firebase.started) {
    Firebase.init();
  }
  Firebase.delete(action.track.storagePath);
  yield put(deleteTrackSuccess(action.track.id));
}

export function* fetchTrackSaga(action: FetchTrackAction) {
  yield put(fetchTrackStart());
  if (!Firebase.started) {
    Firebase.init();
  }
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
