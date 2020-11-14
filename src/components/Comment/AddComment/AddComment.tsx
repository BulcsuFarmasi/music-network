
import React, { KeyboardEvent, FunctionComponent, useRef } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Comment } from "../../../models/comment";
import { User } from "../../../models/user";
import { AppState } from "../../../models/state/app-state";
import { addComment } from "../../../store/actions/creators/comment";

interface AddCommentProps {
  addComment: (comment:Comment, token:string) => void;
  loggedInUser?: User
  trackId: string
}

const AddComment: FunctionComponent<AddCommentProps> = (props:AddCommentProps) => {
  const { addComment, loggedInUser, trackId } = props;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const saveComment = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 13) {
      if (textAreaRef.current) {
        const comment:Comment = {
          authorId: loggedInUser?.id ?? "",
          trackId,
          creationTime: Date.now(),
          text: textAreaRef.current.value.trim()
        }
        addComment(comment, loggedInUser?.token?.body ?? "")
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

const mapStateToProps = (state:AppState) => {
  return {
    loggedInUser: state.auth.loggedInUser
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    addComment: (comment:Comment, token:string) => dispatch(addComment(comment, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
