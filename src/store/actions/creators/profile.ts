import {
  FETCH_PROFILE,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
} from "../types/profile";

import { Profile } from "../../../models/profile";
import { ProfileError } from "../../../models/error/profile-error";

export interface FetchProfileAction {
  type: typeof FETCH_PROFILE;
  token: string;
  profileIds: string[];
}

export interface FetchProfileErrorAction {
  type: typeof FETCH_PROFILE_ERROR;
  error: ProfileError;
}

export interface FetchProfileStartAction {
  type: typeof FETCH_PROFILE_START;
}

export interface FetchProfileSuccessAction {
  type: typeof FETCH_PROFILE_SUCCESS;
  profiles: Map<string, Profile>;
}

export const fetchProfile = (
  profileIds: string[],
  token: string
): FetchProfileAction => ({
  type: FETCH_PROFILE,
  profileIds,
  token,
});

export const fetchProfileError = (
  error: ProfileError
): FetchProfileErrorAction => ({
  type: FETCH_PROFILE_ERROR,
  error,
});

export const fetchProfileStart = (): FetchProfileStartAction => ({
  type: FETCH_PROFILE_START,
});

export const fetchProfileSuccess = (
  profiles: Map<string, Profile>
): FetchProfileSuccessAction => ({
  type: FETCH_PROFILE_SUCCESS,
  profiles,
});

export type ProfileAction =
  | FetchProfileAction
  | FetchProfileErrorAction
  | FetchProfileStartAction
  | FetchProfileSuccessAction;
