import {Context, Mutation, State, Update} from '@loona/angular';

import {AddTodo, ToggleTodo} from './todos.actions';
import {GetActiveTodos, GetCompletedTodos, todoFragment} from './todos.graphql';

export type ID = string;

export interface Todo {
  id?: ID;
  description?: string;
  completed?: boolean;
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
    todos: []
  },
})
export class TodosState {
  @Mutation(AddTodo)
  addTodo(args) {
    console.log('Mutation:', args);
    const todo = {
      id: args.id,
      description: args.description,
      completed: args.completed,
      __typename: 'Todo',
    };

    return todo;
  }


  @Update(AddTodo)
  updateActiveOnAdd(mutation, ctx: Context) {
    const todo = mutation.result;

    ctx.patchQuery(GetActiveTodos, data => {
      data.todos = data.todos.concat([todo]);
    });
  }


  @Mutation(ToggleTodo)
  toggle(args, ctx: Context) {
    return ctx.patchFragment(todoFragment, {id: args.id}, data => {
      data.completed = !data.completed;
    });
  }


  @Update(ToggleTodo)
  updateActiveTodos(mutation, ctx: Context) {
    const todo = mutation.result;
    ctx.patchQuery(GetActiveTodos, data => {
      if (todo.completed) {
        data.todos = data.todos.filter(o => o.id !== todo.id);
      } else {
        data.todos = data.todos.concat([todo]);
      }
    });
  }


  @Update(ToggleTodo)
  updateCompletedTodos(mutation, ctx: Context) {
    const todo = mutation.result;

    ctx.patchQuery(GetCompletedTodos, data => {
      if (todo.completed) {
        data.todos = data.todos.concat([todo]);
      } else {
        data.todos = data.todos.filter(o => o.id !== todo.id);
      }
    });
  }
}

