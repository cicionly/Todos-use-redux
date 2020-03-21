import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Counter from './component/Counter';
import Todo from './component/Todo';

ReactDOM.render(
    <div>
        <Todo />
        <Counter/>
    </div>, document.getElementById('root'));


