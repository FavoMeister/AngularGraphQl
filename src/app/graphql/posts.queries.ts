import { gql } from 'apollo-angular';
import { GetPost, GetPosts, GetPostVariables } from './posts.types';

export const GET_POSTS = gql<GetPosts, unknown>`
  query MyQuery {
    allPosts {
      id
      title
      views
    }
  }
`;

export const GET_POST = gql <GetPost, GetPostVariables>`
  query MyQuery($id: ID!) {
    Post(id: $id) {
      id
      title
      views
      comment
    }
  }
`;
