import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expenseReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';
import thunk from 'redux-thunk';                  //thunk allow to do asynchronous action i.e for eg. making firebase call first and then dispatching it to redux-store

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
    //store creation
    const store = createStore(
        combineReducers({ 
            expenses: expenseReducer,                            //combineReducers takes the key value pair where key is the root property and value is the reducer manages the property
            filters: filterReducer                                //copying this from Redux developer docs from github link
        }),
        composeEnhancer(applyMiddleware(thunk))
    );
    return store;
};