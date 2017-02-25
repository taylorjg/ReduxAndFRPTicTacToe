import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './components/App';

const store = createStore(rootReducer);
const rootElement = document.getElementById('content');

const render = () => {
    ReactDOM.render(<App />, rootElement);
};

render();
store.subscribe(render);
