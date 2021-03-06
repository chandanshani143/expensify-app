import React from 'react';
import { connect } from 'react-redux';                   //connect react component to the redux store
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>                    {/*This is only for mobile */}
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No expenses</span>
                    </div>
                ) : (
                        props.expenses.map((expense) => {
                            return <ExpenseListItem key={expense.id} {...expense} />
                        })
                    )
            }
        </div>
    </div>
);

const mapStateToProps = (state) => {              //this arrow function enables us to determine what information Component need to access from the store
    return {
        expenses: selectExpenses(state.expenses, state.filters)        //we used this inorder to provide the sorted and filtered array of data
    };
};

export default connect(mapStateToProps)(ExpenseList);          //connecting redux store to the react components









// //HOC
// const ConnectedExpenseList = connect((state) => {              //this arrow function enables us to determine what information we need to access from the store
//     return {
//         expenses: state.expenses
//     }
// })(ExpenseList);

// export default ConnectedExpenseList;