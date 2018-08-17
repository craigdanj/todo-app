import { h, Component } from 'preact';
import style from './style';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_TODOS = gql`
  query {
    allTodos{
      id
      text
      completed
    }
  }
`;

const List = () => (

    <Query query={GET_TODOS}>

        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            console.log(data.allTodos)

            return (
                <ul class={style.todolist}>
                    {
                        data.allTodos.map((todo) => (<li>{todo.text}</li>))    
                    }
                </ul>
            );
        }}

    </Query>
)

export default List;