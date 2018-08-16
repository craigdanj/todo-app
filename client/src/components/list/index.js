import { h, Component } from 'preact';
import style from './style';

const Home = () => (
	<div class={style.home}>
		<h1>Todo list</h1>

        <div>
            <input type="text"/>
            <button>Add</button>
        </div>
	</div>
);

export default Home;
