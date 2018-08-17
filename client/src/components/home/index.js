import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {

    state = {
        todoText: ""
    }

    constructor(props) {
        super(props);

        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
    }

    handleOnInputChange(event) {
        this.setState({
            todoText: event.target.value
        })
    }

    handleAddTodo() {
        alert(this.state.todoText)
    }

    render() {

        return (
            <div class={style.home}>
                <h1>Todo list</h1>

                <div>
                    <input type="text" value={this.state.todoText} onChange={this.handleOnInputChange}/>
                    <button onClick={this.handleAddTodo}>Add</button>
                </div>

                <ul class={style.todolist}>
                    <li>
                        <span>aaa</span>
                    </li>
                    <li>
                        <span>bb</span>
                    </li>
                    <li>
                        <span>ccc</span>
                    </li>
                </ul>
            </div>
        )
    }
}