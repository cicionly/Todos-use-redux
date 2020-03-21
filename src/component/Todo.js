import React from 'react';
import { createStore } from '../redux';
const ADD = "AddTodo";
const DEL = "deleteTodo";

let reducer = (state = { todos: [] }, action) => {
    if (action === undefined) {
        return state;
    }
    switch (action.type) {
        case ADD: return { todos: [...state.todos, action.text] };
        case DEL: state.todos.splice(action.index, 1); return { todos: [...state.todos] };
        default: return state;
    }
}

let store = createStore(reducer);

export default class Todo extends React.Component {
    constructor() {
        super();
        this.state = { todos: store.getState().todos }
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ todos: store.getState().todos })
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleKeyDown = (event) => {
        let text = event.target.value;
        if (event.keyCode === 13 && text.length > 0) {
            store.dispatch({ type: ADD, text });
            event.target.value = '';
        }
    }

    handleClick = (index)=>{
        store.dispatch({type:DEL,index});
    }

    render() {
        return <div className="container">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <input type="text" className="form-control" onKeyDown={this.handleKeyDown} /></div>
                <div className="panel-body">
                    <ul className="list-group">
                        {this.state.todos.map((todo, index) =>
                            <li key={index} className="list-group-item">{todo}
                            <button onClick={()=>{this.handleClick(index)}} className="btn btn-danger btn-xs pull-right">X</button></li>)}
                    </ul>
                </div>
            </div>
        </div>
    }
}