import {addTodo, toggleTodo} from './todos.graphql';
import {Todo} from './todos.state';

export class AddTodo {
  static mutation = addTodo;

  variables: {
    input: Todo
  };

  constructor(input: Todo) {
    this.variables = {
      input
    };
  }
}

export class ToggleTodo {
  static mutation = toggleTodo;

  variables: { id: string };

  constructor(id: string) {
    this.variables = {
      id,
    };
  }
}
