import {
  ProfileAction,
  FetchProfileErrorAction,
  FetchProfileSuccessAction,
} from "../actions/creators/profile";
import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_SUCCESS,
} from "../actions/types/profile";
import { ProfileState } from "../../models/state/profile-state";
import { updateObject } from "../../utils/object-utils";
import { Profile } from "../../models/profile";
import { LoadingState } from "../../models/state/loading-state";

const initialState: ProfileState = {
  profiles: new Map(),
  loading: LoadingState.initial,
};

const startLoading = (state: ProfileState) => {
  return updateObject(state, { loading: LoadingState.onGoing });
};

const fetchProfileError = (
  state: ProfileState,
  action: FetchProfileErrorAction
) => {
  return updateObject(state, {
    error: action.error,
    loading: LoadingState.completed,
  });
};

const fetchProfileSucces = (
  state: ProfileState,
  action: FetchProfileSuccessAction
) => {
  console.log(action.profiles);

  const updateProfiles = new Map<string, Profile>(state.profiles);
  action.profiles.forEach((value: Profile, key: string) => {
    updateProfiles.set(key, value);
  });
  console.log(updateProfiles);

  return updateObject(state, {
    loading: LoadingState.completed,
    profiles: updateProfiles,
  });
};

export const profileReducer = (
  state: ProfileState = initialState,
  action: ProfileAction
) => {
  switch (action.type) {
    case FETCH_PROFILE_ERROR:
      return fetchProfileError(state, action);
    case FETCH_PROFILE_START:
      return startLoading(state);
    case FETCH_PROFILE_SUCCESS:
      return fetchProfileSucces(state, action);
    default:
      return state;
  }
};
