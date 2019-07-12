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
  mutation toggle($input: TodoToggleInput!) {
    toggleTodo(input: $input) @rest( type: "Todo", method: "PUT", path: "/todos/{args.input.id}/" ) {
       ...todoFragment
    }
  }
   ${todoFragment}
`;

// https://www.contentful.com/blog/2019/03/13/implementing-graphql-rest-api/
// https://novemberfive.co/blog/putting-apollo-client-to-rest-api-tutorial
