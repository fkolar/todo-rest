import gql from 'graphql-tag';

export const todoFragment = gql`
  fragment todoFragment on Todo {
    id
    description
    completed
  }
`;

export const completedTodos = gql`
  query GetCompletedTodos {
    completed  @rest( type: [Todo], path: "/todos/" ) {
      ...todoFragment
    }
  }
  ${todoFragment}
`;

export const GetActiveTodos = gql`
  query getActiveTodos {
    todos(completed: false) @rest( type: Todo, path: "/todos/q?completed={args.completed}" ) {
        ...todoFragment
      }
  }
  ${todoFragment}
`;

export const addTodo = gql`
  mutation add($text: String!) {
    addTodo(description: $description) @client {
      ...todoFragment
    }
  }

  ${todoFragment}
`;

export const toggleTodo = gql`
  mutation toggle($id: ID!) {
    toggleTodo(id: $id) @client {
      ...todoFragment
    }
  }

  ${todoFragment}
`;
