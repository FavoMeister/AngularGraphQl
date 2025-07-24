
export type Post = {
  id: string,
  title: string,
  views: number
  comment: string
}

export type GetPost = {
  Post: Post
}

export type GetPostVariables = {
  id: string
}

export type TablePost = Omit<Post, 'comment'>;

export type PostsMeta = {
  count: number;
}

export type GetPosts = {
  allPosts: TablePost[],
  _allPostsMeta: PostsMeta
}
