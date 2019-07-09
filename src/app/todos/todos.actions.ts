import {addTodo, toggleTodo} from './todos.graphql';

export class AddTodo {
  static mutation = addTodo;

  variables: { description: string };

  constructor(description: string) {
    this.variables = {
      description
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
