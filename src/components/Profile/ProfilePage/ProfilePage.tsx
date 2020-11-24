import React, { Fragment, FunctionComponent, useEffect, useRef } from "react";

import { connect } from "react-redux";

import ProfilePicture from "../ProfilePicture/ProfilePicture";
import TrackList from "../../Tracks/TrackList/TrackList";
import { User } from "../../../models/user";
import { AppState } from "../../../models/state/app-state";

import styles from "./ProfilePage.module.scss";
import { Dispatch } from "redux";
import { fetchProfile } from "../../../store/actions/creators/profile";
import { useParams } from "react-router-dom";
import { Profile } from "../../../models/profile";

interface ProfileProps {
  fetchProfile: (profileId:string[], token:string) => void
  loggedInUser?: User;
  profiles: Map<string, Profile>
}

const ProfilePage: FunctionComponent<ProfileProps> = (props: ProfileProps) => {
  const { fetchProfile, loggedInUser, profiles } = props;
  const { accountId } = useParams();

  const profileRef = useRef<Profile>({});

  useEffect(() => {
    let profileId = accountId || "";
    
    
    

    if (!profiles.has(profileId)) {
      fetchProfile([profileId], loggedInUser?.token?.body ?? "");
    } else if (Object.entries(profileRef.current).length === 0) {
      profileRef.current = profiles.get(profileId) ?? {};
    }
  }, [accountId, profiles, fetchProfile, loggedInUser])

  return (
    <Fragment>
      <div className={styles.profileHeader}>
        <ProfilePicture profile={profileRef.current}></ProfilePicture>
        <h2>{profileRef.current.username}</h2>
      </div>
      <TrackList></TrackList>
    </Fragment>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    loggedInUser: state.auth.loggedInUser,
    profiles: state.profile.profiles
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  fetchProfile: (profileIds:string[], token:string) => dispatch(fetchProfile(profileIds, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
