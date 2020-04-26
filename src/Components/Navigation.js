import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export const Navigation = (props) => {
    const {isActive, loggedUser} = {...props};
    return (
        <Fragment>
            <ul>
                <li className={`${isActive==='Dashboard' ? "active": "" }`}><Link to="/Dashboard">Dashboard</Link></li>
                <li className={`${isActive==='ScheduleMeeting' ? "active": "" }`}><Link to="/ScheduleMeeting">ScheduleMetting</Link></li>
                <li style={{float: 'right'}}>Hey welcome {loggedUser}!!</li>
            </ul>
        </Fragment>
    );
}
function mapStateToProps(state, props) {
    return {
        loggedUser: state.loginLogoutReducer.username,
    };
}

export default connect(mapStateToProps)(Navigation);