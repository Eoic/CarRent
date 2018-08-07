import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../utils/authorize';

class LogoutFunction extends React.Component {

    componentDidMount() {
        Auth.deauthenticateUser();
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <p> Logging out... </p>
            </div>
        )
    }
}

LogoutFunction.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LogoutFunction;
