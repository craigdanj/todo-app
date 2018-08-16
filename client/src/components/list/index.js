import { h } from 'preact';
import style from './style';

const Home = () => (
	<div class={style.home}>
		<h1>Todo list</h1>
        <input type="text"/>
        <button>Add</button>
	</div>
);

export default Home;
