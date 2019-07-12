import gql from 'graphql-tag';

export const todoFragment = gql`
  fragment todoFragment on Todo {
    id
    description
    completed
  }
`;

export const GetCompletedTodos = gql`
   query getCompletedTodos {
    todos(completed: true) @rest( type: Todo, path: "/todos/q?completed={args.completed}" ) {
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
    mutation addTodo($input: Todo!){
      addTodo(input: $input) @rest( type: "Todo", method: "POST", path: "/todos" ) {
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

// https://www.contentful.com/blog/2019/03/13/implementing-graphql-rest-api/
