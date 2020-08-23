import { put } from "redux-saga/effects";

import {
  addTrackError,
  addTrackStart,
  addTrackSuccess,
  deleteTrackError,
  deleteTrackStart,
  deleteTrackSuccess,
  fetchTrackError,
  fetchTrackStart,
  fetchTrackSuccess,
  AddTrackAction,
  DeleteTrackAction,
  FetchTrackAction,
} from "../actions/creators/track";
import { Track } from "../../models/track";
import { TrackErrorType } from "../../models/track-error";
import { Firebase } from "../../utils/firebase";
import { Http } from "../../utils/http";

export function* addTrackSaga(action: AddTrackAction) {
  yield put(addTrackStart());
  try {
    if (!Firebase.started) {
      Firebase.init();
    }
    yield Firebase.upload(action.fileName, action.file);
    const storagePath: string = action.fileName;
    const downloadUrl: string = yield Firebase.download(action.fileName);
    action.track.file = {
      storagePath,
      downloadUrl,
    };
    Http.setDatabaseUrl();
    const response: Response = yield Http.post(
      `tracks.json?auth=${action.token}`,
      JSON.stringify(action.track)
    );
    const responseData: any = yield response.json();
    const track: Track = {
      ...action.track,
      id: responseData.name,
    };
    yield put(addTrackSuccess(track));
  } catch {
    yield put(
      addTrackError({
        type: TrackErrorType.add,
        message: "Error during adding the track",
      })
    );
  }
}

export function* deleteTrackSaga(action: DeleteTrackAction) {
  yield put(deleteTrackStart());
  try {
    Http.setDatabaseUrl();
    yield Http.delete(`tracks/${action.track.id}.json?auth=${action.token}`);
    if (!Firebase.started) {
      Firebase.init();
    }
    Firebase.delete(action.track?.file?.storagePath);
    yield put(deleteTrackSuccess(action.track.id));
  } catch {
    yield put(
      deleteTrackError({
        type: TrackErrorType.delete,
        message: "Error during deleting the track",
        trackId: action.track.id,
      })
    );
  }
}

export function* fetchTrackSaga(action: FetchTrackAction) {
  yield put(fetchTrackStart());
  try {
    if (!Firebase.started) {
      Firebase.init();
    }
    Http.setDatabaseUrl();
    const response: Response = yield Http.get(
      `tracks.json?orderBy="authorId"&equalTo="${action.userId}"&auth=${action.token}`
    );
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
  } catch {
    yield put(
      fetchTrackError({
        type: TrackErrorType.fetch,
        message: "Error during fetching the tracks",
      })
    );
  }
}
