import React, { useCallback, useEffect, useState, FunctionComponent } from "react";

import { connect } from "react-redux";

import styles from "./Like.module.scss";
import { AppState } from "../../../models/state/app-state";
import { Dispatch } from "redux";
import { Track } from "../../../models/track";
import { User } from "../../../models/user";
import { updateTrack } from "../../../store/actions/creators/track";


interface LikeProps {
  loggedInUser: User,
  track:Track,
  updateTrack: (token:string, track:Track) => void,
}

interface LikeState {
  liked: boolean,
  imageSrc: string,
  imageAlt: string
}

const Like: FunctionComponent<LikeProps> = (props:LikeProps) => {

  const { loggedInUser, track, updateTrack } = props;

  const getLikeStateFromLikers = useCallback((likers:string[], userId:string):LikeState => {
    const liked = likers.includes(userId);
    return {
      liked,
      imageSrc: (liked) ? 'images/heart-red.png' : 'images/heart-black',
      imageAlt: (liked) ? 'Like' : "Don't like";
    };

  },[]);

  const [likeState, setLikeState] = useState(getLikeStateFromLikers(track.likers ?? [], loggedInUser.id ?? ""));

  useEffect(() => {
    setLikeState(getLikeStateFromLikers(track.likers ?? [], loggedInUser.id ?? ""));
  }, [track.likers])


  const toggleLike = () => {
    const futureLike = !likeState.liked;


    const updateTrack:Partial<Track> = {
      id: track.id,
    }
    updateTrack(updateTrack as Track);
  };

  return (
    <div className={styles.like}>
      <img
        src={likeState.imageSrc}
        alt={likeState.imageAlt}
        onClick={toggleLike}
        className={styles.likeImage}
      />
      {track.likers?.length ?? 0}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    loggedInUser: state.auth.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateTrack: (token: string, track: Track) => {
      dispatch(updateTrack(token, track));
    },
  };
};

export default Like;
