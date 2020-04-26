import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import { addMeetingEvent, editData } from './../Actions/MeetingAction';
class ScheduleMeeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: 1,
            month: 4,
            year: 2020,
            errorFlag: true,
            errorMessage: undefined,
            name: '',
            description: '',
            email: '',
            date: '',
        }
    }

    formatDate = () => `0${this.state.day}-0${this.state.month}-${this.state.year}`

    handleDay = (e) => {
        e.preventDefault();
        const day = e.target.value;
        if (day < 31) {
            this.setState({
                day: parseInt(e.target.value),
                errorFlag: false,
            })
        } else {
            this.setState({
                day: e.target.value,
                errorFlag: true,
            })
        }

    }

    handleOnChange = (e, type) => {
        e.preventDefault();
        this.setState({
            [type]: e.target.value,
        })
    }

    validateMultipleEmails(email) {
        const isValidEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
        return isValidEmail;
    }

    async handleOnSubmit(e) {
        let emails = this.state.email.split(",");
        const verifiedList = emails.map((mail) => { return this.validateMultipleEmails(mail) });
        const formatedDate = this.formatDate();
        if (!verifiedList.includes(false) && this.state.name !== '' && this.state.day < 31) {
            await this.setState({
                errorMessage: '',
                email: this.state.email,
                date: formatedDate,
                errorFlag: false,
            });
        } else {
            let message;
            message = this.state.name === '' ? 'Please enter Name' : 'Please enter Valid Email!';
            if (this.state.day > 30) message = 'date cannot be more than 30';
            await this.setState({
                email: this.state.email,
                errorMessage: message,
                date: formatedDate,
                errorFlag: true,
            })
        }
        if (!this.state.errorFlag) {
            const data = this.props.editingData;
            const updateDate = `0${data.date}-0${this.state.month}-${this.state.year}`
            data.edit && await this.setState({ day: data.date, date: updateDate });
            data.edit && this.props.editingInfo(false, data.date);
            this.props.meetingEvent(this.state);
        }
    }

    render() {
        if (this.props.loggedUser !== '') {
            const isEditing = this.props.editingData && this.props.editingData.edit;
            return (
                <Fragment>
                    <Navigation isActive="ScheduleMeeting" />
                    <h3>{isEditing ? 'Edit the data you want to update!!' : 'Create a meeting schedule!!'}</h3>
                    <div className="meetingForm">
                        <div className="Date">
                            <input type="number" name="Day" value={isEditing ? this.props.editingData.date : this.state.day} readOnly={isEditing} onChange={this.handleDay} className="" min="1" max="30" />
                            <input type="number" name="Month" className="" value={this.state.month} readOnly />
                            <input type="number" name="Year" className="" value={this.state.year} readOnly />
                        </div>
                        <input type="text" name="Name" className="" id="Name" placeholder="Name" onChange={e => this.handleOnChange(e, "name")} />
                        <textarea className="Description" placeholder="Description" style={{ alignItems: 'center' }} maxLength="300" onChange={e => this.handleOnChange(e, "description")} ></textarea> <br />
                        <input type="email" name="mails" className="" id="mails" placeholder="Attendees" multiple onChange={e => this.handleOnChange(e, "email")} />
                        <input type="submit" className="" style={{ alignItems: 'center' }} value={isEditing ? 'Update' : 'Submit'} onClick={e => this.handleOnSubmit(e, this)} /><br />
                        <p style={{ color: 'Red' }}>{this.state.errorMessage}</p>
                        <p>{(!this.state.errorFlag && this.state.errorMessage === '') && !isEditing && 'You have succcessfyully added a event!'}</p>
                    </div>
                </Fragment>
            );
        }
        return <Fragment>{this.props.history.push('/')}</Fragment>
    }
}

function mapStateToProps(state, props) {
    return {
        loggedUser: state.loginLogoutReducer.username,
        editingData: state.meetingReducer.editingInfo,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        meetingEvent: (state) => dispatch(addMeetingEvent(state)),
        editingInfo: (edit, day) => dispatch(editData(edit, day)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleMeeting);