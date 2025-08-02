import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { inject, NgModule, Query } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { environment } from '../environments/environment.development';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition, offsetLimitPagination } from '@apollo/client/utilities';
import { Toast } from './core/services/toast';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { Kind, OperationTypeNode } from 'graphql';

export function createApollo(): ApolloClientOptions<any> {
  const uri = environment.apiUrl; // <-- add the URL of the GraphQL server here
  const httpLink = inject(HttpLink);
  const toastService = inject(Toast); // This allow us to use dependency injection to access the service outside of a traditional class-based context.

  const auth = setContext((operation, context) => {
    return {
      headers: {
        Auth: 'testFromGraphQL'
      }
    }
  });

  const errorLink = onError(({operation, response, graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      /* graphQLErrors.map(({message, extensions}) => {
        console.log('[GraphQL error]', message);
        if (extensions) {
          
        }
      }) */
     const message = graphQLErrors[0].message;
     toastService.showError(`GraphQL Server Error ${message}`);
    }

    if (networkError) {
      console.log('[Network error]', networkError.message);
      toastService.showError(`Network Error, please try later ${networkError.message}`);
    }
  });

  const http = httpLink.create({ uri });

  const ws = new GraphQLWsLink(
    createClient({
      url: environment.wsUrl
    })
  )

  const link = split(
    ({query}) => {
      const definition = getMainDefinition(query);

      return (
        definition.kind == Kind.OPERATION_DEFINITION &&
          definition.operation == OperationTypeNode.SUBSCRIPTION
      )
    },
    ws,
    http
  );

  return {
    //link: ApolloLink.from([auth, httpLink.create({ uri, withCredentials: true })]),  //httpLink.create({ uri }),
    link: ApolloLink.from([errorLink, auth, httpLink.create({ uri })]),
    cache: new InMemoryCache({
      addTypename: true,
      resultCaching: true,
      typePolicies: {
        Query: {
          fields: {
            allPosts: offsetLimitPagination()
          }
        }
      }
    }),
  };
}

@NgModule({
  providers: [provideApollo(createApollo, {
    useInitialLoading: true,
    // useMutationLoading: true
  })],
})
export class GraphQLModule {}
