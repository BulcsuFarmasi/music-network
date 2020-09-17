import React, { FunctionComponent, useState } from "react";

import { AddComment } from "../AddComment/AddComment";

export const CommentList: FunctionComponent = () => {
  const [displayComments, setDisplayComments] = useState<boolean>(false);

  const toggleDisplayComments = () => {
    setDisplayComments(!displayComments);
  };

  const commentList = displayComments ? (
    <div>
      <AddComment></AddComment>
    </div>
  ) : null;

  return (
    <div>
      <p onClick={toggleDisplayComments}>Comments</p>
      {commentList}
    </div>
  );
};
