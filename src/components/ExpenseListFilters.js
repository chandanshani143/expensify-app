import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

class ExpenseListfilters extends React.Component {
    state = {
        calenderFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => {                    //this function is get called by the react-dates library with an object and on that object we have satrtDate and endDate and we are destructuring here
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }));
    }
    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            type="text"
                            placeholder="Search expenses"
                            className="text-input"
                            value={this.props.filters.text}
                            onChange={(e) => {
                                this.props.dispatch(setTextFilter(e.target.value));
                            }} />
                    </div>
                    <div className="input-group__item">
                        <select
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={(e) => {
                                if (e.target.value === 'date') {
                                    this.props.dispatch(sortByDate());
                                } else if (e.target.value === 'amount') {
                                    this.props.dispatch(sortByAmount());
                                }
                            }}
                        >
                            <option value='date'>Date</option>
                            <option value='amount'>Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calenderFocused}
                            onFocusChange={this.onFocusChange}
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            startDateId="abasdhwkhqkeqw"
                            endDateId="vbbvzbzbxcvzx"
                        />
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListfilters);