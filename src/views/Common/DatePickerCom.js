import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DatePickerCom extends Component {
    render() {
        return (
            <>
                <label className="my-auto mx-2 font-weight-bold">검색날짜</label>
                <div className="input-group input-daterange">
                    <DatePicker
                        className="form-control"
                        id="fromDateStats"
                        name="fromDateStats"
                        placeholder="검색날짜"
                        dateFormat="yyyy-MM-dd"
                        selected={this.props.startDate}
                        selectsStart
                        startDate={this.props.startDate}
                        endDate={this.props.endDate}
                        onChange={this.props.handleChangeStart}
                        maxDate={new Date()}
                    />
                    &nbsp;~&nbsp;
                    <DatePicker
                        className="form-control"
                        id="toDateStats"
                        name="toDateStats"
                        placeholder="검색날짜"
                        dateFormat="yyyy-MM-dd"
                        selected={this.props.endDate}
                        selectsEnd
                        startDate={this.props.startDate}
                        endDate={this.props.endDate}
                        onChange={this.props.handleChangeEnd}
                        minDate={this.props.startDate}
                        maxDate={new Date()}
                    />
                </div>
            </>
        );
    }
}

export default DatePickerCom;