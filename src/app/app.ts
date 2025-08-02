import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected title = 'graphql-prj';

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
      /*this.apollo.subscribe({
        query: gql `
          subscription postAdded {
            postAdded {
             id,
             title,
             views,
             comment
            }
          }
        `
      }).subscribe((data) => {
        console.log(data);
        
      })**/
  }
}
