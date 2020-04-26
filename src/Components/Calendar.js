import React, { Fragment } from 'react';
class Calendar extends React.Component {
    render() {
        const blanks = this.props.blanks;
        const daysInMonth = this.props.daysInMonth;
        const totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row); // if index not equal 7 that means not go to next week
            } else {
                rows.push(cells); // when reach next week we contain all td in last week to rows 
                cells = []; // empty container 
                cells.push(row); // in current loop we still push current row to new container
            }
            if (i === totalSlots.length - 1) { // when end loop we add remain date
                rows.push(cells);
            }
        });

        let daysGot = rows.map((d, i) => {
            return <tr>{d}</tr>;
        });
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        let weekdayshortname = days.map(day => {
            return (
                <th key={day}>{day}</th>
            );
        });

        return (
            <Fragment>
                <table>
                    <thead>
                        <tr>{weekdayshortname}</tr>
                    </thead>
                    <tbody>{daysGot}</tbody>
                </table>
            </Fragment>
        );
    }
};
export default Calendar;