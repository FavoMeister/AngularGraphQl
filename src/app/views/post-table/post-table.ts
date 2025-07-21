import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, Subscription } from 'rxjs';
import { Apollo, gql, QueryRef } from 'apollo-angular';


const query = gql`
  query MyQuery {
    allPosts {
      id
      title
      views
    }
  }
`

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
  postsQuery!: QueryRef<any>;
  private sub!: Subscription;

  constructor(private http: HttpClient, private apollo: Apollo) {

  }

  ngOnInit(): void {
    /* this.getPosts().subscribe({
      next: data => {
        console.log("NEXT", data);
        
      },
      error: error => {
        console.log("ERR", error);
      }
    }); */
    this.postsQuery = this.apollo.watchQuery({
      query: query,
      //pollInterval: 5000 // refesh data every 5 seconds.
    })
    
    this.sub = this.postsQuery.valueChanges.subscribe((data: any) => {

      console.log(data);
      
      this.posts.set([...data.data?.allPosts ?? []]);

      this.loading = data.loading;
      
    });

    /* this.apollo.query({
      query: query
    }).subscribe((data: any) => {
      this.posts = data.data?.allPosts;
    }) */
  }

  getPosts():Observable<any> {
    const body = {
      query: query
    }

    return this.http.post<any>(environment.apiUrl, body)
  }

  ngOnDestroy(): void{
    //throw new Error('Method not implemented');
    this.sub.unsubscribe();
  }
}
