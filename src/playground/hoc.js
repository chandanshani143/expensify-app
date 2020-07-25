//Higher Order Component (HOC) -  A component (HOC) that renders another compenent

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>This info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {              //withAdminWarining is a function that we call to generate HOC //WrappedComponent refers to the Info component that is rendered by hoc
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share!</p>}
            <WrappedComponent {...props} />                   {/*we are spreading the info property from AdminInfo component to Info component */}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);                 //Here AdminInfo is the hoc that takes the return value of withAdminWarining arrow function

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>please authenticate to view the message</p>}
        </div>
    );
};

const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="There are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="There are the details" />, document.getElementById('app'));