import { gql } from 'apollo-angular';
import { GetPost, GetPosts, GetPostsVariables, GetPostVariables } from './posts.types';
import { POST_TABLE_FIELDS_FRAGMENT } from './posts.fragments';

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
`;
