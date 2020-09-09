import React, { useEffect, FunctionComponent, useCallback } from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import SingleTrack from "../SingleTrack/SingleTrack";
import { ErrorBanner } from "../../UI/ErrorBanner/ErrorBanner";
import { Profile } from "../../../models/profile";
import { Track } from "../../../models/track";
import { TrackError, TrackErrorType } from "../../../models/error/track-error";
import { User } from "../../../models/user";
import { AppState } from "../../../models/state/app-state";
import { fetchProfile } from "../../../store/actions/creators/profile";
import {
  clearTrackError,
  deleteTrack,
  fetchTrack,
} from "../../../store/actions/creators/track";

interface TrackListProps {
  clearTrackError: () => void;
  error?: TrackError;
  deleteTrack: (track: Track, token: string) => void;
  fetchProfile: (profileIds: string[], token: string) => void;
  fetchTrack: (token: string, userId?: string) => void;
  loggedInUser?: User;
  profiles: Map<string, Profile>;
  tracks: Track[];
}

const TrackList: FunctionComponent<TrackListProps> = (
  props: TrackListProps
) => {
  const {
    clearTrackError,
    error,
    deleteTrack,
    fetchProfile,
    fetchTrack,
    loggedInUser,
    profiles,
    tracks,
  } = props;

  const isProfileNotFetched = useCallback(
    (profileId) => {
      return !profiles.has(profileId);
    },
    [profiles]
  );

  useEffect(() => {
    fetchTrack(loggedInUser?.token?.body ?? "", loggedInUser?.id);
  }, [fetchTrack, loggedInUser]);

  useEffect(() => {
    const authorIds: string[] = [];
    tracks.forEach((track: Track) => {
      authorIds.push(track.authorId ?? "");
    });

    let queryAuthorIds = authorIds.filter(isProfileNotFetched);
    queryAuthorIds = queryAuthorIds.filter(
      (authorId: string, index: number, array) => {
        return array.indexOf(authorId) !== index;
      }
    );
    fetchProfile(queryAuthorIds, loggedInUser?.token?.body ?? "");
  }, [fetchProfile, loggedInUser, isProfileNotFetched, tracks]);

  // useEffect(() => {
  //   console.log("profiles changed", profiles);
  // }, [profiles]);

  const clearError = () => {
    clearTrackError();
  };

  const removeTrack = (track: Track) => {
    deleteTrack(track, loggedInUser?.token?.body ?? "");
  };

  const trackList = tracks.map((track: Track) => {
    let trackError: TrackError | undefined =
      error &&
      error.type === TrackErrorType.delete &&
      error.trackId === track.id
        ? error
        : undefined;
    return (
      <SingleTrack
        track={track}
        key={track.id}
        removeTrack={removeTrack}
        error={trackError}
        clearError={clearError}
      />
    );
  });

  let errorBanner;

  if (error && TrackErrorType.fetch === error.type) {
    errorBanner = (
      <ErrorBanner closed={clearError}>{error?.message}</ErrorBanner>
    );
  }

  return (
    <div>
      <h2>My Tracks</h2>
      {errorBanner}
      {trackList}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    error: state.track.error,
    loggedInUser: state.auth.loggedInUser,
    profiles: state.profile.profiles,
    tracks: state.track.tracks,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    clearTrackError: () => dispatch(clearTrackError()),
    deleteTrack: (track: Track, token: string) =>
      dispatch(deleteTrack(track, token)),
    fetchProfile: (profileIds: string[], token: string) =>
      dispatch(fetchProfile(profileIds, token)),
    fetchTrack: (token: string, userId?: string) =>
      dispatch(fetchTrack(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
