import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { inject, NgModule } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment.development';
import { setContext } from '@apollo/client/link/context';

export function createApollo(): ApolloClientOptions<any> {
  const uri = environment.apiUrl; // <-- add the URL of the GraphQL server here
  const httpLink = inject(HttpLink);

  const auth = setContext((operation, context) => {
    return {
      headers: {
        Auth: 'testFromGraphQL'
      }
    }
  });

  return {
    link: ApolloLink.from([auth, httpLink.create({ uri })]),  //httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [provideApollo(createApollo, {useInitialLoading: true})],
})
export class GraphQLModule {}
