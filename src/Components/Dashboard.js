import React, { Fragment } from 'react';
import Navigation from './Navigation';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import PopUp from './PopUp';
import { editData } from './../Actions/MeetingAction';

export const firtDayOfMonth = () => {
  let dt = new Date();
  const month = dt.getMonth(); // read the current month
  const year = dt.getFullYear(); // read the current year
  dt = new Date(year, month, 1);//Year , month,date format
  const firstDay = dt.getDay(); //, first day of present month
  dt.setMonth(month + 1, 0); // Set to next month and one day backward.
  const lastDate = dt.getDate(); // Last date of present month
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = months[dt.getMonth()]
  return { firstDay, lastDate, monthName, year };
};

class Dashboard extends React.Component {
  state = {
    showPopupIndex: false,
    editing: false,
  };

  getPopUp = (e, index) => {
    e.preventDefault();
    // if truthy showPopupIndex, set null, else, set index
    this.setState(prevState => ({ showPopupIndex: prevState.showPopupIndex ? null : index }));
  };

  editingInfo = (e, date) => {
    this.props.deleteData(date);
    const meetingData = this.props.meetingData;
    const dateToDisplay = meetingData.find(item => {
      if (item.day === date) return item.day;
      return '';
    });
    dateToDisplay && this.props.editingInfo(true, date) && this.props.history.push('/ScheduleMeeting');
  }

  render() {
    if (this.props.loggedUser !== '') {
      const { meetingData } = this.props;
      const daysToAddEvent = meetingData.map(item => item.day);
      let { firstDay, lastDate, monthName, year } = firtDayOfMonth();
      let blanks = [];
      for (let i = 0; i < firstDay; i++) {
        blanks.push(
          <td>{""}</td>
        );
      }
      let daysInMonth = [];
      for (let d = 1; d <= lastDate; d++) {
        daysInMonth.push(
          <td key={d}>
            <a style={{ textDecoration: 'none' }} onClick={e => this.getPopUp(e, d)} onDoubleClick={e => this.editingInfo(e, d)}>
              {d}
              {this.state.showPopupIndex === d && <PopUp day={d} />}
            </a>
            <span className={`${daysToAddEvent.find((day) => parseInt(day) === d) ? "dotted" : ''}`}></span>
          </td >
        );
      }

      return (
        <Fragment>
          <Navigation isActive="Dashboard" />
          <div style={{ border: '1px solid black', width: '250px', height: '250px', margin: 'auto' }}>
            <h3>{monthName} {year}</h3>
            <hr />
            <Calendar blanks={blanks} daysInMonth={daysInMonth} />
          </div>
        </Fragment>
      );
    } else
      return this.props.history.push('/');
  }
}


function mapStateToProps(state, props) {
  return {
    meetingData: state.meetingReducer.meetingData,
    loggedUser: state.loginLogoutReducer.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editingInfo: (edit, date) => dispatch(editData(edit, date)),
    deleteData: (data) => dispatch({ type: "DELETE_MEETING_DATA", data })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);