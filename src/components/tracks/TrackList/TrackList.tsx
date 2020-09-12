import React, { useEffect, FunctionComponent } from "react";

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
  updateTrackSuccess,
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
  updateTrack: (track: Track) => void;
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
    updateTrack,
  } = props;

  useEffect(() => {
    fetchTrack(loggedInUser?.token?.body ?? "", loggedInUser?.id);
  }, [fetchTrack, loggedInUser]);

  useEffect(() => {
    const profileIds: string[] = [];
    tracks.forEach((track: Track) => {
      profileIds.push(track.authorId ?? "");
      profileIds.push(...(track?.likers ?? []));
    });

    let queryProfileIds = profileIds.filter((authorId: string) => {
      return !profiles.has(authorId);
    });
    queryProfileIds = queryProfileIds.filter(
      (authorId: string, index: number, array) => {
        return array.indexOf(authorId) !== index;
      }
    );
    if (queryProfileIds.length > 0) {
      fetchProfile(queryProfileIds, loggedInUser?.token?.body ?? "");
    }
  }, [fetchProfile, loggedInUser, profiles, tracks]);

  useEffect(() => {
    tracks.forEach((track: Track) => {
      let canUpdate: boolean = false;
      let updatedTrack: Track = {
        id: track.id,
      };
      if (profiles.has(track.authorId ?? "") && !track.author) {
        updatedTrack.author = profiles.get(track?.authorId ?? "");
        canUpdate = true;
      }
      let allLikersAvailable = true;
      track.likers?.forEach((likerId: string) => {
        if (!profiles.has(likerId)) {
          allLikersAvailable = false;
        }
      });
      if (allLikersAvailable && !track.likerProfiles) {
        const likerProfiles: Profile[] = [];
        track.likers?.forEach((likerId: string) => {
          likerProfiles.push(profiles.get(likerId) ?? {});
        });
        updatedTrack.likerProfiles = likerProfiles;
        canUpdate = true;
      }
      if (canUpdate) {
        updateTrack(updatedTrack);
      }
    });
  }, [profiles, tracks, updateTrack]);

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
    updateTrack: (track: Track) => dispatch(updateTrackSuccess(track)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
