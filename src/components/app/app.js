import React, {Component} from 'react';

import { TodoList, AppHeader, SearchPanel, ItemStatusFilter, ItemAddForm } from '../';
import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createToDoItem('Drink Coffee'),
            this.createToDoItem('Drink Vodka'),
            this.createToDoItem('Drink Tea'),
        ]
    };

    createToDoItem(label) {
        return {
            label,
            important: false,
            id: this.maxId++,
            done: false
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const todoDataDelete = todoData.filter((el) => el.id !== id);
            return {
                todoData: todoDataDelete
            }
        });
    };

    addItem = (text) => {
        const newItem = this.createToDoItem(text);
        this.setState(({todoData}) => {
            return {
                todoData: [...todoData, newItem]
            }
        })
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]
    }
    
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    }
    
    render() {
        const {todoData} = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>
                <TodoList todos = {todoData}
                    onDeleted={ this.deleteItem }
                    onToggleDone={ this.onToggleDone }
                    onToggleImportant={ this.onToggleImportant }/>
                <ItemAddForm onItemAdded={ this.addItem }/>
            </div>
    )};
};
