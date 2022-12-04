export type CommentData = {
  rating: number;
  comment: string;
};

export type CommentDataWithId = {
  id: number;
  commentData: CommentData;
}
