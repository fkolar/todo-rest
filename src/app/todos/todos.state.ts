import {Context, Mutation, State, Update} from '@loona/angular';

import {AddTodo, ToggleTodo} from './todos.actions';
import {GetActiveTodos, completedTodos, todoFragment} from './todos.graphql';

export type ID = string;

export interface Todo {
  id: ID;
  description: string;
  completed: boolean;
  active: boolean;
}


@State({
  typeDefs: `
    type Todo {
      id: ID
      description: String
      completed: Boolean
    }
  `,
  defaults: {
    completed: [],
    active: [],
  },
})
export class TodosState {
  @Mutation(AddTodo)
  add(args) {
    const todo = {
      id: Math.random().toString(16).substr(2),
      description: args.description,
      completed: false,
      __typename: 'Todo',
    };

    return todo;
  }

  @Mutation(ToggleTodo)
  toggle(args, ctx: Context) {
    return ctx.patchFragment(todoFragment, {id: args.id}, data => {
      data.completed = !data.completed;
    });
  }

  @Update(AddTodo)
  updateActiveOnAdd(mutation, ctx: Context) {
    const todo = mutation.result;

    ctx.patchQuery(GetActiveTodos, data => {
      data.active = data.active.concat([todo]);
    });
  }

  @Update(ToggleTodo)
  updateActive(mutation, ctx: Context) {
    const todo = mutation.result;

    ctx.patchQuery(GetActiveTodos, data => {
      if (todo.completed) {
        data.active = data.active.filter(o => o.id !== todo.id);
      } else {
        data.active = data.active.concat([todo]);
      }
    });
  }

  @Update(ToggleTodo)
  updateCompleted(mutation, ctx: Context) {
    const todo = mutation.result;

    ctx.patchQuery(completedTodos, data => {
      if (todo.completed) {
        data.completed = data.completed.concat([todo]);
      } else {
        data.completed = data.completed.filter(o => o.id !== todo.id);
      }
    });
  }
}
