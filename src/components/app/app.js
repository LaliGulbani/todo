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
        ],
        term: '',
        filter: 'all' //active, all, done

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

    search(items, term) {
        if(term.length === 0) {
            return items;
        }
        return items.filter((item) => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1)
    }

    filter(items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.filter);
            case 'active':
                return items.filter((item) => item.filter);
            default:
                return items;
        }
    }

    important(items) {
        return items.filter((item) => item.done)
    }

    onSearchChange = (term) => {
        this.setState({term});
    }

    onFilterChange = (filter) => {
        this.setState({filter});
    }

    render() {
        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter}
                        onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos = {visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}/>
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
    )};
};
