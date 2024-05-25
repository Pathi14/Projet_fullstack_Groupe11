// src/components/Comment.tsx
import React from 'react';
import { Comment as CommentType } from '../generated/graphql';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => (
  <div className="comment">
    <p>{comment.content}</p>
    <p>By: {comment.user?.username}</p>
  </div>
);

export default Comment;
