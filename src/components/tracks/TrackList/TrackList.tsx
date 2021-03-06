import React, { useEffect, FunctionComponent } from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import SingleTrack from "../SingleTrack/SingleTrack";
import { ErrorBanner } from "../../UI/ErrorBanner/ErrorBanner";
import { Profile } from "../../../models/profile";
import { Track } from "../../../models/track";
import { TrackError, TrackErrorType } from "../../../models/error/track-error";
import { Comment } from "../../../models/comment";
import { User } from "../../../models/user";
import { AppState } from "../../../models/state/app-state";
import { fetchProfile } from "../../../store/actions/creators/profile";
import {
  clearTrackError,
  deleteTrack,
  fetchTrack,
  updateTrackSuccess,
} from "../../../store/actions/creators/track";
import {
  fetchComment,
  updateComment,
} from "../../../store/actions/creators/comment";
import { LoadingState } from "../../../models/state/loading-state";

interface TrackListProps {
  clearTrackError: () => void;
  comments?: Comment[];
  commentLoading?: LoadingState;
  error?: TrackError;
  deleteTrack: (track: Track, token: string) => void;
  fetchComment: (trackIds: string[], token: string) => void;
  fetchProfile: (profileIds: string[], token: string) => void;
  fetchTrack: (token: string, userId?: string) => void;
  loggedInUser?: User;
  profiles: Map<string, Profile>;
  tracks: Track[];
  updateTrack: (track: Track) => void;
  updateComment: (comments: Comment[]) => void;
}

const TrackList: FunctionComponent<TrackListProps> = (
  props: TrackListProps
) => {
  const {
    clearTrackError,
    error,
    comments,
    commentLoading,
    deleteTrack,
    fetchComment,
    fetchProfile,
    fetchTrack,
    loggedInUser,
    profiles,
    tracks,
    updateTrack,
    updateComment
  } = props;

  // fetch tracks

  useEffect(() => {
    fetchTrack(loggedInUser?.token?.body ?? "", loggedInUser?.id);
  }, [fetchTrack, loggedInUser]);

  // fetch comments

  useEffect(() => {
    const commentTrackIds: string[] =
      comments
        ?.map((comment: Comment) => comment.trackId)
        .filter(
          (trackId: string, index: number, trackIds: string[]) =>
            trackIds.indexOf(trackId) === index
        ) ?? [];
    const trackIds: string[] =
      tracks?.map((track: Track) => track.id ?? "") ?? [];

    const notQueriedTrackIds: string[] = trackIds.filter(
      (trackId: string) => commentTrackIds.indexOf(trackId) === -1
    );
    if (notQueriedTrackIds.length > 0) {
      fetchComment(trackIds, loggedInUser?.token?.body ?? "");
    }
  }, [tracks, comments, fetchComment, loggedInUser]);

  // fetch and update profiles for comments

  useEffect(() => {


    let commentAuthorIds: string[] = [];
    let updateComments:Comment[] = [];
    
    comments?.forEach((comment:Comment) => {
      
      if (!comment.authorProfile && !profiles.has(comment.authorId)) {
        commentAuthorIds.push(comment.authorId ?? "");
      } else if (!comment.authorProfile && profiles.has(comment.authorId)) {
       updateComments.push({...comment, authorProfile: profiles.get(comment.authorId)});
      } 
    });
    commentAuthorIds = commentAuthorIds.filter((authorId:string, index:number) => commentAuthorIds.indexOf(authorId) === index);

    

    if (commentAuthorIds.length > 0) {
      fetchProfile(commentAuthorIds, loggedInUser?.token?.body ?? "");
    }
    if (updateComments.length > 0) {
      updateComment(updateComments);
    }

  }, [comments, profiles, fetchProfile, loggedInUser, updateComment]);

  useEffect(() => {
    const updateTracks = new Map<string, Track>();

    comments?.forEach((comment: Comment) => {
      if (!updateTracks.has(comment.trackId)) {
        updateTracks.set(comment.trackId, {
          id: comment.trackId,
          comments: [],
        });
      }
      const updateTrack = updateTracks.get(comment.trackId);
      if (updateTrack) {
        updateTrack.comments = updateTrack?.comments?.concat(comment) ?? [];
      }
      updateTracks.set(comment.trackId, updateTrack ?? {});
    });
    updateTracks.forEach((track: Track) => {
      updateTrack(track);
    });
  }, [comments, updateTrack]);

  // fetch profiles

  useEffect(() => {
    const profileIds: string[] = [];
    const trackIds: string[] = [];
    tracks.forEach((track: Track) => {
      profileIds.push(track.authorId ?? "");
      profileIds.push(...(track?.likers ?? []));
      if (track.id) {
        trackIds.push(track.id);
      }
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

  // update tracks with profiles

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
    comments: state.comment.comments,
    commentsLoading: state.comment.loading,
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
    fetchComment: (trackIds: string[], token: string) =>
      dispatch(fetchComment(trackIds, token)),
    fetchProfile: (profileIds: string[], token: string) =>
      dispatch(fetchProfile(profileIds, token)),
    fetchTrack: (token: string, userId?: string) =>
      dispatch(fetchTrack(token, userId)),
    updateTrack: (track: Track) => dispatch(updateTrackSuccess(track)),
    updateComment: (comments: Comment[]) => dispatch(updateComment(comments)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
