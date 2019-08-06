import React, {Component} from 'react';
import DateFickerCom from "../Common/DatePickerCom";
import BankListFilter from "../Common/BankListFilter"; 

class NaverBankKeyword extends Component {
    render() {
        const contentHead = (
            <div className="card-header">
                <div className="float-left mt-2"><i className="fa fa-building"> </i>네이버 월간 조회(키워드)</div>
                <div className="float-right">
                    <button	className="btn btn-block btn-outline-dark float-sm-right chart-button-stats" >그래프 보기</button>
                </div>
            </div>
        );
        return (
            <div className="card">
                {contentHead}
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row pl-3">
                                <div className="form-inline form-group">
                                    <DateFickerCom
                                        startDate={this.props.startDateKeyword}
                                        endDate={this.props.endDateKeyword}
                                        handleChangeStart={this.props.handleChangeStart}
                                        handleChangeEnd={this.props.handleChangeEnd}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row ">
                        <label className="my-auto mx-2 font-weight-bold pl-3">키워드</label>
                        <div className="col-md-9">
                            <select className="js-example-basic-multiple form-control" id="keyword"
                                    multiple="multiple">
                                <option value="1">1</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NaverBankKeyword;