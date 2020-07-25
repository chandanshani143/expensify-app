import {createStore} from 'redux';

//ACtion generator - function that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({         //destructuring incrementBy object and setting its defult value=1 if exist or {}
    type: 'INCREMENT',
    incrementBy                                                 //incrementBy has same name as the object passed so we can use shorthand syntax
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy                                                 
})

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});


//Reducer
// 1. Reducers are pure function
// 2. Never changes state or action
const countReducer = (state = { count: 0 }, action) => {                 //setting default object state i.e count  0
    switch(action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }    
        case'RESET':
            return {
                count: 0
            }
        default:
            return state;
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {                      //store.subscribe() runs everytime there is change in the store      
    console.log(store.getState());                              // getState return current state object
});

//Action - simply an object that gets sent to the store.

store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch(setCount({count: 100}));