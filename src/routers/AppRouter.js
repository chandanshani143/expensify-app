import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import NotFoundPage from '../components/404page';
import AddExpensePage from '../components/AddExpense';
import EditExpensePage from '../components/EditExpense';
import Header from '../components/Header';
import HelpPage from '../components/Helppage';
import ExpenseDashboardPage from '../components/ExpenseDashboard';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true} />         {/*we set extact true because earlier it was call with all other routes beacause / matches with all routes */}
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;