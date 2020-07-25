import {createStore, combineReducers} from 'redux';
import {uuid} from 'uuidv4';

//Action Generators
//ADD_EXPENSE
const addExpense = ({description = '', note= '', amount = '', createdAt = 0 } = {} ) => ({                         //we are implicitly returning action object
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
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
const editExepense = ( id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//SET_TEXT_FILTER
const setTextFilter = ( text = '') => ({                    //if text value is provided then it will take that value else it will be empty
    type: 'SET_TEXT_FILTER',
    text
})

//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

//SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});
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
            default: 
            return state;
    }
};

//filter Reducer
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}
const filterReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};

//get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate } ) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;          //createdAt ka time startDate aur endDate k andar ayega tab subset show hoga warna nhi hoga obvious h
        const endDateMacth = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch  = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMacth && textMatch;                    //filter will return a subset if all these three condition is true
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;             //agar a ka createdAt jada puarana h matlab chota h toh b pehle ayega  (1 b ko refer kar rha h aur -1 a ko)
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;                   //agar a ka amount kaam h b se toh b pehle ayega (1 b ko refer kar rha h aur -1 a ko)
        }
    });
};
//store creation
const store =createStore(
    combineReducers({
        expenses: expenseReducer,                            //combineReducers takes the key value pair where key is the root property and value is the reducer manages the property
        filters: filterReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 50, createdAt: 1500}));
const expenseTwo = store.dispatch(addExpense({description: 'coffee', amount: 100, createdAt: 1000}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExepense(expenseTwo.expense.id, {amount: 50 }));

// store.dispatch(setTextFilter('ffe'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-1500));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(500));

const demoState = {
  expenses: [{
      id: 'addiado',
      description: 'january Rent',
      note: 'This was the final payment fo that address',
      amount: 54500,
      createdAt: 0
  }],
  filters: {
      text: 'rent',
      sortBy: 'amount',  //date or amount
      startDate: undefined,
      endDate: undefined
  }
};
