import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import { Profile } from "../../../models/profile";

import styles from "./MiniProfile.module.scss";

interface MiniProfileProps {
  profile: Profile;
}

export const MiniProfile: FunctionComponent<MiniProfileProps> = (
  props: MiniProfileProps
) => {
  const { profile } = props;
  const profilePictureSource =
    profile.profilePicture?.downloadUrl ?? "images/default-profile.png";
  return (
    <div className={styles.miniProfile}>
      <Link to={`/${profile.id}`}>
      <img
        src={profilePictureSource}
        alt={profile.username}
        className={styles.miniProfileImage}
      />
      <p className={styles.miniProfileName}>{profile.username}</p>
      </Link>
    </div>
  );
};
