import React, { KeyboardEvent, FunctionComponent, useRef } from "react";

import { Comment } from "../../../models/comment";

export const AddComment: FunctionComponent = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const saveComment = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 13) {
      if (textAreaRef.current) {
        const commentText = textAreaRef.current.value;
        console.log(commentText);
        textAreaRef.current.value = "";
        
      }      
    }
  };

  return (
    <div>
      <textarea
        placeholder="Write something"
        onKeyUp={saveComment}
        ref={textAreaRef}
      />
    </div>
  );
};
