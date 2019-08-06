import React, {Component} from 'react';
import DateFickerCom from "../Common/DatePickerCom";
import BankListFilter from "../Common/BankListFilter";
import TrendItem from "./TrendItem";

class NaverBankMonth extends Component {
    render() {
        const { resBanks, reqBanks, areaChartM, areaChartW, labels } = this.props;

        //const labels = Object.keys(resBanks[0].items);
        const contentHead = (
            <div className="card-header">
                <div className="float-left mt-2"><i className="fa fa-building"> </i>네이버 월간 조회</div>
                <div className="float-right">
                    <button	className="btn btn-block btn-outline-dark float-sm-right chart-button-stats" onClick={this.props.toggleHidden}>그래프 보기</button>
                </div>
            </div>
        );

        const item = resBanks.map((val,idx) => {
            return <TrendItem key={idx} item={val} />
        });

        const contentItems = (
            <table className="table table-hover naver-keyword mb-0 table-bordered">
                <thead className="thead-light">
                <tr>
                    <th className="text-center align-middle" rowSpan={2}>검색어</th>
                    {labels.map((val, idx) => (<th className="text-center" colSpan={2} key={idx}>{val}</th>))}
                </tr>
                <tr>
                    {labels.map(idx => (<React.Fragment key={idx}><th className="text-center">모바일</th><th className="text-center">웹</th></React.Fragment>))}
                </tr>
                </thead>
                <tbody>
                {item}
                </tbody>
            </table>
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
                                        startDate={this.props.startDate}
                                        endDate={this.props.endDate}
                                        handleChangeStart={this.props.handleChangeStart}
                                        handleChangeEnd={this.props.handleChangeEnd}
                                    /> 
                                </div>
                                {/*<div className="form-inline form-group">
                                    &nbsp;
                                    <button type="button"
                                            className="btn btn-block btn-outline-primary submit-btn-stats"
                                            style={{'width':'100px'}}
                                    >검색
                                    </button>
                                </div>*/}
                                <div className="col-3">
                                    <BankListFilter onChange={this.props.onChange} resBanks={resBanks} reqBanks={reqBanks} page={this.props.page} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <hr style={{'display': (!this.props.isToggle) ? 'none' : 'block'}} />
                    <div className="wrap-chart" style={{'display': (!this.props.isToggle) ? 'none' : 'block'}}>
                        <div className="chart-area">
                            <h2>모바일 월간조회수</h2>
                            {areaChartM}
                        </div>
                        <div className="chart-area">
                            <h2>웹 월간조회수</h2>
                            {areaChartW}
                        </div>
                    </div>
                    <hr/>
                    <div className="wrap-table">
                        {contentItems}
                    </div>
                </div>
            </div>
        );
    }
}

export default NaverBankMonth;