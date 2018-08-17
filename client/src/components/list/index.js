import { h, Component } from 'preact';
import style from './style';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_TODOS = gql`
  query {
    allTodos{
      id
      text
      completed
    }
  }
`;

const REMOVE_TODO = gql`
mutation RemoveTodo($id: Int!) {
    removeTodo(id:$id){
    text
    completed
    id
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
                        data.allTodos.map((todo) => (
                            <li>
                                {todo.text}

                                <Mutation 
                                    mutation={REMOVE_TODO}
                                    update={(cache, {data: {removeTodo}}) => {
                                        const results = cache.readQuery({ query: GET_TODOS });
                                        
                                        console.log(removeTodo);
                                        console.log(results);
                                        
                                        cache.writeQuery({
                                          query: GET_TODOS,
                                          data: { allTodos: removeTodo }
                                        });
                                    }}
                                >
                                
                                    {(removeTodo, { data }) => (
                                        <button onClick={e => {
                                          removeTodo({ variables: { id: todo.id} });
                                        }}>Remove</button>
                                    )}

                                </Mutation>
                            </li>
                            )
                        )    
                    }
                </ul>
            );
        }}

    </Query>
)

export default List;