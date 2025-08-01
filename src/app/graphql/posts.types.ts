
export type Post = {
  id: string
  title: string
  views: number
  comment: string
}

export type GetPost = {
  Post: Post
}

export type GetPostVariables = {
  id: string
}

export type GetPostsVariables = {
  perPage: number;
  page: number;
}

export type TablePost = Omit<Post, 'comment'>;

export type PostsMeta = {
  count: number;
}

export type GetPosts = {
  allPosts: TablePost[],
  _allPostsMeta: PostsMeta
}

export type DeletePost = {
  deletePost: TablePost;
}

export type DeletePostVariables = {
  id: string
}

export type UpdatePost = {
  updatePost: Post
}

export type CreatePost = {
  createPost: Post
}

export type UpdatePostVariables = {
  id: string
  title?: string
  views?: number
  comment?: string
}

export type CreatePostVariables = {
  title: string
  views: number
  comment: string
}
