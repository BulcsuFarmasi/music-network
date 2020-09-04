import { put } from "redux-saga/effects";

import {
  fetchProfileStart,
  FetchProfileAction,
  fetchProfileSuccess,
  fetchProfileError,
} from "../actions/creators/profile";
import { Profile } from "../../models/profile";
import { Http } from "../../utils/http";
import { ProfileErrorType } from "../../models/error/profile-error";

export function* fetchProfileSaga(action: FetchProfileAction) {
  yield put(fetchProfileStart());
  Http.setDatabaseUrl();

  try {
    const requests: Promise<Response>[] = action.profileIds.map((profileId) =>
      Http.get(`users/${profileId}.json=${action.token}`)
    );
    let responseDataPromises: Promise<any>[] = [];
    Promise.all(requests).then((responses: Response[]) => {
      responseDataPromises = responses.map((response: Response) =>
        response.json()
      );
    });
    const profiles: Map<string, Profile> = new Map<string, Profile>();

    Promise.all(responseDataPromises).then((responseData: any[]) => {
      responseData.forEach((value: any) => {
        profiles.set(Object.keys(value)[0], {
          ...value[Object.keys(value)[0]],
          id: Object.keys(value)[0],
        });
      });
    });
    yield put(fetchProfileSuccess(profiles));
  } catch {
    yield put(
      fetchProfileError({
        type: ProfileErrorType.fetch,
        message: "Error during fetching the profiles",
      })
    );
  }
}
