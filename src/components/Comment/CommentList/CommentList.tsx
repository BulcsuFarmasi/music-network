import React, { FunctionComponent } from "react";

import { AddComment } from "../AddComment/AddComment";

export const CommentList: FunctionComponent = () => {
  return (
    <div>
      <p>Comments</p>
      <AddComment></AddComment>
    </div>
  );
};
