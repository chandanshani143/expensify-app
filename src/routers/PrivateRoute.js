import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,                //destructuring component and we are renaming it with capital C because as we know react component start with capital first letter and it is refering to components like AddExpensePage, ExpenseDashboardPage
    ...rest                             //rest will contain all other properties passed to route except compinent and we can name it anything from rest
}) => (
    <Route {...rest} component={(props) => (             /*here we want to render our component bacause we are not getting component by using rest */
    isAuthenticated ? (
        <div>
            <Header />
            <Component {...props}/>                      {/*The Componenft will be replaced by AddExpense,EditExpense etc. */}
        </div>
    ) : (
        <Redirect to="/"/>
    )
    )}/>
);

const mapStateToProps = (state) => ({ 
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);