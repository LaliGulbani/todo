import React, {Component} from 'react';

import { TodoList, AppHeader, SearchPanel, ItemStatusFilter } from '../';
import './app.css';

export default class App extends Component {

    state = {
        todoData: [
            { label: 'Drink Coffee', important: false, id: 1 },
            { label: 'Drink Vodka', important: true, id: 2 },
            { label: 'Cook Breakfast', important: false, id: 3 },
        ]
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const todoDataDelete = todoData.filter((el) => el.id !== id);
            return {
                todoData: todoDataDelete
            }
        })
    }

    render() {
        const {todoData} = this.state;
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>
                <TodoList todos = {todoData}
                    onDeleted={ this.deleteItem }/>
            </div>
    )};
};
