import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const PopUp = (props) => {
    const { day, meetingData } = { ...props };
    const dataToDisplay = meetingData.find(item => {
        return item.day===day;
    });
    
    return (
        <Fragment>
            {dataToDisplay &&
                <div className="popup">
                    <span>Date: {dataToDisplay.date}</span><br />
                    <span>Name: {dataToDisplay.name}</span> <br />
                    <span>Attendees: {dataToDisplay.email}</span><br />
                    <span>Description: {dataToDisplay.description}</span>
                </div>}
        </Fragment>
    );
}

function mapStateToProps(state, props) {
    return {
        meetingData: state.meetingReducer.meetingData,
    };
}

export default connect(mapStateToProps, null)(PopUp);