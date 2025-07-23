import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, Subscription } from 'rxjs';
import { Apollo, gql, QueryRef } from 'apollo-angular';

type Post = {
  id: string,
  title: string,
  views: number
  comment: string
}

type GetPost = {
  Post: Post
}

type GetPostVariables = {
  id: string
}

type TablePost = Omit<Post, 'comment'>;

type GetPosts = {
  allPosts: TablePost[]
}

const GET_POSTS = gql<GetPosts, unknown>`
  query MyQuery {
    allPosts {
      id
      title
      views
    }
  }
`;

const GET_POST = gql <GetPost, GetPostVariables>`
  query MyQuery($id: ID!) {
    Post(id: $id) {
      id
      title
      views
      comment
    }
  }
`;

@Component({
  selector: 'app-post-table',
  standalone: false,
  templateUrl: './post-table.html',
  styleUrl: './post-table.scss'
})
export class PostTable implements OnInit, OnDestroy {

  //posts: {id: string, title: string, views: number}[] = [];
  posts = signal<{id: string, title: string, views: number}[]>([]);
  loading = false;
  postsQuery!: QueryRef<GetPosts>;
  private sub!: Subscription;

  constructor(private http: HttpClient, private apollo: Apollo) {

  }

  ngOnInit(): void {
    this.postsQuery = this.apollo.watchQuery({
      query: GET_POSTS,
      /* variables: {...Apollo.} */
      //pollInterval: 5000 // refesh data every 5 seconds.
    })

    this.postsQuery.startPolling(5000);
    
    this.sub = this.postsQuery.valueChanges.subscribe((data) => {
      
      this.posts.set([...data.data?.allPosts ?? []]);

      this.loading = data.loading;
      
    });

  }

  refresh(): void {
    this.postsQuery.refetch();
  }

  getPost(id: string): void {
    this.apollo.query({
      query: GET_POST,
      variables: { id: id }
    }).subscribe((data) => {
      console.log(data.data.Post);
      
    })
  }

  getPosts():Observable<any> {
    const body = {
      query: GET_POSTS
    }

    return this.http.post<any>(environment.apiUrl, body)
  }

  ngOnDestroy(): void{
    //throw new Error('Method not implemented');
    this.sub.unsubscribe();
    this.postsQuery.stopPolling();
  }
}
