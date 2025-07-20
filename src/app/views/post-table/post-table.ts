import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';


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
export class PostTable implements OnInit {

  //posts: {id: string, title: string, views: number}[] = [];
  posts = signal<{id: string, title: string, views: number}[]>([]);
  loading = true;

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
    this.apollo.watchQuery({
      query: query
    }).valueChanges.subscribe((data: any) => {
      this.posts.set([...data.data?.allPosts]);

      this.loading = data.loading;
      console.log("D ",data.data);
      console.log("E ",data.error);
      console.log("L ",data.loading);
      
    });
  }

  getPosts():Observable<any> {
    const body = {
      query: query
    }

    return this.http.post<any>(environment.apiUrl, body)
  }
}
