import {uuid} from 'uuidv4';

//Action Generators
//ADD_EXPENSE
export const addExpense = ({description = '', note= '', amount = 0, createdAt = 0 } = {} ) => ({                         //we are implicitly returning action object
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

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