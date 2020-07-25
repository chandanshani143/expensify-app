import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';
const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
        onSubmit={(expense) => {
            props.dispatch(addExpense(expense));
            props.history.push('/');   //push will redirect us to the Dashboard page when we submmit the form
        }}
        />
    </div>
);

export default connect()(AddExpensePage);