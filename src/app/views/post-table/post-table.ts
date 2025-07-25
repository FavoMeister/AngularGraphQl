import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, Subscription } from 'rxjs';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { GET_POST, GET_POSTS } from '../../graphql/posts.queries';
import { GetPosts, GetPostsVariables } from '../../graphql/posts.types';
import { TableLazyLoadEvent } from 'primeng/table';


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
  postsQuery!: QueryRef<GetPosts, GetPostsVariables>;
  postsTotalCount: number = 0;
  private sub!: Subscription;

  constructor(private http: HttpClient, private apollo: Apollo) {

  }

  ngOnInit(): void {
    this.postsQuery = this.apollo.watchQuery({
      query: GET_POSTS,
      variables: {
        perPage: 2,
        page: 0
      }
      //pollInterval: 5000 // refesh data every 5 seconds.
    })
    
    this.sub = this.postsQuery.valueChanges.subscribe((data) => {

      //console.log(data);
      
      this.posts.set(Array.isArray(data.data?.allPosts) ? data.data.allPosts : []);

      if (data.data) {
        this.postsTotalCount = data.data._allPostsMeta.count;
      }

      this.loading = data.loading;
      
    });

  }

  loadPosts(event: TableLazyLoadEvent){
    const page: number = event.first! / event.rows!;
    const size = event.rows as number;

    this.postsQuery.fetchMore({
      variables: {
        perPage: size,
        page: page,
      }
    })
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
    //this.postsQuery.stopPolling();
  }
}
