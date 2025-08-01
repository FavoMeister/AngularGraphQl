import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { GET_POST, UPDATE_POST } from '../../graphql/posts.queries';

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
}
