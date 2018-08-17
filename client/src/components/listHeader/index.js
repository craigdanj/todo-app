import { h, Component } from 'preact';
import style from './style';
import List from '../list';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text:$text) {
    id
    text
    completed
    }
  }
`;

const GET_TODOS = gql`
  query {
    allTodos{
      id
      text
      completed
    }
  }
`;

export default class ListHeader extends Component {

    state = {
        todoText: ""
    }

    constructor(props) {
        super(props);

        this.handleOnInputChange = this.handleOnInputChange.bind(this);
    }

    handleOnInputChange(event) {
        this.setState({
            todoText: event.target.value
        })
    }


    render() {

        return (
            <Mutation 
                mutation={ADD_TODO}
                update={(cache, {data: {addTodo}}) => {
                    const results = cache.readQuery({ query: GET_TODOS });
                    console.log(results);
                    console.log(addTodo);
                    cache.writeQuery({
                      query: GET_TODOS,
                      data: { allTodos: addTodo }
                    });
                }}
            >

            {(addTodo, { data }) => (
                <div>
                    <input type="text" value={this.state.todoText} onChange={this.handleOnInputChange}/>
                    
                    <button 
                        onClick={e => {
                          addTodo({ variables: { text: this.state.todoText} });
                          this.setState({todoText: ""});
                        }}
                    >
                        Add
                    </button>
                </div>
            )}
               
            </Mutation>
        )
    }


}
