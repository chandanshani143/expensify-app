import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';                //provider allow the react component to acces the store
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();                                 //storing the return value of store from configureStore to store variable

store.dispatch(addExpense({ description: 'water bill', amount: 5000}));
store.dispatch(addExpense({ description: 'gas bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 10500 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>                        {/*Provider allows the component to access the store */}
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx , document.getElementById('app'));