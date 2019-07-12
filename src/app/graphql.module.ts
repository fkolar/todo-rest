import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApolloClientOptions} from 'apollo-client';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {LOONA_CACHE, LoonaLink, LoonaModule} from '@loona/angular';
import {TodosState} from './todos/todos.state';
import {ApolloLink} from 'apollo-link';
import {RestLink} from 'apollo-link-rest';


export function apolloFactory(loonaLink: LoonaLink, cache: InMemoryCache): ApolloClientOptions<any> {
  const restLink = new RestLink({
    uri: 'http://localhost:5000/api',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return {
    link: ApolloLink.from([loonaLink, restLink]),
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
      deps: [LoonaLink, LOONA_CACHE],
    },
  ],
})
export class GraphQLModule {
}
