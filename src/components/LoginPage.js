import React from 'react';
import { connect } from 'react-redux';
import {startLogin} from '../actions/auth';

export const LoginPage = ({ startLogin }) => (                   //here we are destructuring the startLogin prop present below
    <div>
        <button onClick={startLogin}>Login</button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);