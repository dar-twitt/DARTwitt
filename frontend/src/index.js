import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import "./index.css";
import App from "./app/App";
import { BrowserRouter as Router } from 'react-router-dom';

const __DEV__ = process.env.NODE_ENV;
export const store = __DEV__==='development' ? createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
) : createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
