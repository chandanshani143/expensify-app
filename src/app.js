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
import 'react-dates/lib/css/_datepicker.css';
import numeral from 'numeral';

const store = configureStore();                                 //storing the return value of store from configureStore to store variable

numeral.register('locale', 'inr', {
    delimiters: {
      thousands: ',',
      decimal: '.'
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
    },
    currency: {
      symbol: '₹'
    }
  });
   
  numeral.locale('inr');

const jsx = (
    <Provider store={store}>                        {/*Provider allows the component to access the store */}
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx , document.getElementById('app'));


