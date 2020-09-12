import React, { FunctionComponent } from "react";

import { Profile } from "../../../models/profile";
import { MiniProfile } from "../../Profile/MiniProfile/MiniProfile";

interface LikersProps {
  likers: Profile[];
}

const Likers: FunctionComponent<LikersProps> = (props: LikersProps) => {
  const { likers } = props;

  const likerList = likers.map((liker: Profile) => (
    <MiniProfile profile={liker}></MiniProfile>
  ));

  return (
    <div className="likers">
      <p>Likers</p>
      {likerList}
    </div>
  );
};

export default Likers;
