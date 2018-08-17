import { h, Component } from 'preact';
import style from './style';
import List from '../list';
import ListHeader from '../listHeader';
import { Mutation } from "react-apollo";

const Home = () => (
            <div class={style.home}>
                <h1>Todo list</h1>

                <ListHeader/>
                <List/>
            </div>
        )

export default Home