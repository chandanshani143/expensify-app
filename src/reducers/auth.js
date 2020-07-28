export default (state = {}, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};          //returing empty object
        default:
            return state;       //if there is no user login or logout then object won't exist
    }
};