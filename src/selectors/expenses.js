import moment from 'moment';

//Get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate } ) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);                                        //taking createdAt time from expense
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true ;        //checking if the createdAt value of expense is after startDate
        const endDateMacth = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;          //agar enddate provided nhi h toh simply true hoga
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

export default getVisibleExpenses;