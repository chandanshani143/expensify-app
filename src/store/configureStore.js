import { createStore, combineReducers } from 'redux';
import expenseReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';

export default () => {
    //store creation
    const store = createStore(
        combineReducers({
            expenses: expenseReducer,                            //combineReducers takes the key value pair where key is the root property and value is the reducer manages the property
            filters: filterReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};