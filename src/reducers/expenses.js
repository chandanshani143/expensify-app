//Expenses Reducer

const expensesReducerDefaultState = []

const expenseReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [ ...state, action.expense];                     //spread operator returns a new array without changeing the original array i.e state
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => {
                return id !== action.id;                            //if they are not equal then it will return true and the item will be kept or if it is false then it means that expense was a match and needs to filter out
            });
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id ===action.id) {
                    return {
                        ...expense,                               //it is refering to  all the existing expenses
                        ...action.updates                         //it is refering to the expense changes
                    };
                } else {
                    return expense;
                };
            });
        case 'SET_EXPENSES':                                      //it is fetching data from the database
            return action.expenses
           default: 
            return state;
    }
};

export default expenseReducer;