import { gql } from 'apollo-angular';
import { CreatePost, CreatePostVariables, DeletePost, DeletePostVariables, GetPost, GetPosts, GetPostsVariables, GetPostVariables, UpdatePost, UpdatePostVariables } from './posts.types';
import { POST_TABLE_FIELDS_FRAGMENT, POST_TABLE_FIELDS_FRAGMENTS } from './posts.fragments';

export const GET_POSTS = gql<GetPosts, GetPostsVariables>`
  query MyQuery($perPage: Int, $page: Int) {
    allPosts(perPage: $perPage, page: $page) {
      ...PostTableFields
    }

    _allPostsMeta {
      count
    }
  }
  ${POST_TABLE_FIELDS_FRAGMENT}
`;

export const GET_POST = gql <GetPost, GetPostVariables>`
  query MyQuery($id: ID!) {
    Post(id: $id) {
      ...PostTableFields
      comment
    }
  }
  ${POST_TABLE_FIELDS_FRAGMENT}
`;

export const UPDATE_POST = gql <UpdatePost, UpdatePostVariables>`
  mutation MyMutation (
    $id: ID!,
    $title: String,
    $views: Int,
    $comment: String
  ) {
    updatePost(id: $id, title: $title, views: $views, comment: $comment) {
      id
      title
      views
      comment
    }
  }
  
`

export const CREATE_POST = gql <CreatePost, CreatePostVariables>`
  mutation MyMutation (
    $title: String!,
    $views: Int!,
    $comment: String!
  ) {
    createPost(comment:$comment, title: $title, views: $views) {
      id
      title
      views
      comment
    }
  }

`

export const DELETE_POST = gql <DeletePost, DeletePostVariables> `
  mutation MyMutation($id: ID!) {
    deletePost(id: $id) {
      ...PostTableFields
    }
  }
  ${POST_TABLE_FIELDS_FRAGMENT}
`