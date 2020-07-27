import {uuid} from 'uuidv4';
import database from '../firebase/firebase'

//Action Generators
//ADD_EXPENSE
export const addExpense = (expense) => ({                         //we are implicitly returning action object
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {                                         //destructuring default values from expenseData
            description = '',
            note= '', 
            amount = 0, 
            createdAt = 0
        } = expenseData;              
        const expense = { description, note, amount, createdAt };
        
        database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

//REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
export const editExpense = ( id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});