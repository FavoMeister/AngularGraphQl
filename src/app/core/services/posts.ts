import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { CREATE_POST, GET_POST, GET_POSTS, UPDATE_POST } from '../../graphql/posts.queries';

@Injectable({
  providedIn: 'root'
})
export class Posts {

  postId$ = new BehaviorSubject<null | string>(null);

  constructor(private apollo: Apollo) { }

  getPost(id: string) {
    return this.apollo.query({
      query: GET_POST,
      variables: { id: id },
      //errorPolicy: 'all' // none, ignore and all
    })
  }

  updatePost(id: string, title: string, views: number, comment: string) {
    return this.apollo.mutate({
      mutation: UPDATE_POST,
      variables: {
        id,
        title,
        views,
        comment
      }
    })
  }

  createPost(title: string, views: number, comment: string) {
    return this.apollo.mutate({
      mutation: CREATE_POST,
      variables: {
        title,
        views,
        comment
      },
      refetchQueries: [
        {
          query: GET_POSTS,
          variables: {
            perPage: 2,
            page: 0
          }
        }
      ]
    })
  }
}
