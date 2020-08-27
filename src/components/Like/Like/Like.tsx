import React, { useState, FunctionComponent } from "react";

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
  updateTrack: (token:string, track:Track),
}

const Like: FunctionComponent<LikeProps> = (props:LikeProps) => {

  const { loggedInUser, track, updateTrack } = props;



  const [like, setLike] = useState<boolean>(false);
  const [heartImage, setHeartImage] = useState<string>(
    "images/heart-black.png"
  );
  const [heartImageAlt, setHeartImageAlt] = useState<string>("Don't like");
  const [likeNumber, setLikeNumber] = useState<number>(0);

  const toggleLike = () => {
    setLike(!like);
    setHeartImage(
      !like === true ? "images/heart-red.png" : "images/heart-black.png"
    );
    setHeartImageAlt(!like === true ? "Like" : "Don't like");
    setLikeNumber(!like === true ? likeNumber + 1 : likeNumber - 1);
  };

  return (
    <div className={styles.like}>
      <img
        src={heartImage}
        alt={heartImageAlt}
        onClick={toggleLike}
        className={styles.likeImage}
      />
      {likeNumber}
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
