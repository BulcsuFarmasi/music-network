import React, { FunctionComponent } from "react";

import { Profile } from "../../../models/profile";

import styles from "./MiniProfile.module.scss";

interface MiniProfileProps {
  profile: Profile;
}

export const MiniProfile: FunctionComponent<MiniProfileProps> = (
  props: MiniProfileProps
) => {
  const { profile } = props;
  return (
    <div className={styles.MiniProfile}>
      <img
        src={profile.profilePicture?.downloadUrl}
        alt={profile.username}
        className={styles.miniProfileImage}
      />
      <p className={styles.miniProfileImage}>{profile.username}</p>
    </div>
  );
};
