import {addTodo, toggleTodo} from './todos.graphql';
import {Todo} from './todos.state';

export interface TodoToggleInput {
  id: string;
}


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

  variables: { input: TodoToggleInput };

  constructor(input: TodoToggleInput) {
    this.variables = {
      input
    };
  }
}
