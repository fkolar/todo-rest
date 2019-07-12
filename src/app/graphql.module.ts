import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApolloClientOptions} from 'apollo-client';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {LOONA_CACHE, LoonaLink, LoonaModule} from '@loona/angular';
import {TodosState} from './todos/todos.state';
import {ApolloLink} from 'apollo-link';
import {RestLink} from 'apollo-link-rest';
import { onError } from 'apollo-link-error';

export function apolloFactory(loonaLink: LoonaLink, cache: InMemoryCache, errorHandler: ErrorHandler): ApolloClientOptions<any> {
  const restLink = new RestLink({
    uri: 'http://localhost:5000/api',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(error => {
        errorHandler.handleError(error.message);
      });
    } else if (networkError) {
      const n: any = networkError;
      errorHandler.handleError('Problem connecting to the server!');


      if (n.error && n.error.errors && n.error.errors.length > 0) {
        const message = n.error.errors[0].message;
        errorHandler.handleError(message);
      } else {
        errorHandler.handleError(n.message);
      }
    }
  });

  return {
    link: ApolloLink.from([loonaLink, errorLink,  restLink]),
    cache
  };
}

@NgModule({
  imports: [CommonModule, LoonaModule.forRoot([TodosState])],
  exports: [ApolloModule, LoonaModule],
  providers: [
    {
      provide: LOONA_CACHE,
      useFactory() {
        return new InMemoryCache();
      },
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: apolloFactory,
      deps: [LoonaLink, LOONA_CACHE, ErrorHandler],
    },
  ],
})
export class GraphQLModule {
}
