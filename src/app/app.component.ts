import {Component} from '@angular/core';
import {Loona} from '@loona/angular';
import {Observable} from 'rxjs';
import {pluck, tap} from 'rxjs/operators';

import {AddTodo, ToggleTodo} from './todos/todos.actions';
import {GetActiveTodos} from './todos/todos.graphql';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-add-todo (todo)="add($event)"></app-add-todo>
      <div class="split">
        <div class="into">
          <app-todos-list name="Active" [todos]="active | async" position="before" (toggle)="toggle($event)"></app-todos-list>
        </div>
        <div class="into">
          <app-todos-list name="Completed" [todos]="completed | async" position="after" (toggle)="toggle($event)"></app-todos-list>
        </div>
      </div>
    </div>
  `,
  styles: [
      `
      .container {
        display: block;
        max-width: 600px;
        margin: 0 auto;
      }

      .split {
        display: flex;
        justify-content: space-between;

      .into {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      }
    `,
  ],
})
export class AppComponent {
  active: Observable<any[]>;
  completed: Observable<any[]>;

  constructor(private loona: Loona) {
    // this.apollo.query(
    //   {
    //     query: GetActiveTodos
    //   }
    // ).pipe(
    //   tap(resust => {
    //     console.log(resust);
    //   })
    // ).subscribe();

    this.active = this.loona.query({
      query: GetActiveTodos,
      fetchPolicy: 'cache-and-network'
    }).valueChanges.pipe(
      tap((data) => {
        console.log(data);
      }),
      pluck('data', 'todos')
    );

  }

  add(text: string): void {
    this.loona.dispatch(new AddTodo(text));
  }

  toggle(id: string): void {
    this.loona.dispatch(new ToggleTodo(id));
  }
}
