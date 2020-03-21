import {createStore} from '../redux';
import React from 'react';
const INCREASE = "increase";
const DECREASE = "decrease";

let reducer = (state = { number: 0 }, action) => {
    if (action === undefined) {
        return state;
    }
    switch (action.type) {
        case INCREASE: return { number: state.number + action.amount };
        case DECREASE: return { number: state.number - action.amount };
        default: return state;
    }
}

let store = createStore(reducer);

export default class Counter extends React.Component {
    constructor(){
        super();
        this.state = {
            number:store.getState().number
        }
    }
    componentWillMount(){
        this.unsubscribe = store.subscribe(()=>{this.setState({number:store.getState().number})});
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        return <div className="container">
            <p>{this.state.number}</p>
            <button onClick={()=>{store.dispatch({type:INCREASE,amount:2})}} className="btn btn-primary">+</button>
            <button onClick={()=>{store.dispatch({type:DECREASE,amount:2})}} className="btn btn-primary">-</button>
        </div>
    }
}
