import React, {Component} from 'react';
import axios from 'axios';
import * as moment from "moment/moment";
import Const from "../Common/Const";
import DateFickerCom from "../Common/DatePickerCom";
import BankListFilter from "../Common/BankListFilter";
import TrendItem from "./TrendItem";
import LineChart from "../Common/Chart/LineChart"

class TrendAppsPrd extends Component {
    constructor(props) {
        super(props);

        const d = new Date();
        const lastWeek = d.getDate();

        this.api = {
            'apps.keys': 'http://rsc9-api.koreasouth.cloudapp.azure.com/api/apps?category=bank',
            'trend': 'http://rsc9-api.koreasouth.cloudapp.azure.com/api/trends?category=bank&type=product',
        };
        this.appsKey = {
			apps:[]
		};
        this.state = {
            //차트
            areaChartM:'',
            areaChartW:'',
            
            startDate: d.setDate(lastWeek - 3),
            endDate: new Date(),
            
            reqApps: [],
            //은행 Api
            resApps: {
                dates: [],
                names: [],
                trends: []
            },
            labels : [],
            keywords : [],
            pcCount : {},
            mobileCount : {},
            //차트보기
            isToggle: true
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this)
    }

    componentDidMount() {
        let pm = new Promise(resolve => {
            this.setState({ reqApps: Object.values(Const.BANKS.NAME).map(val => val)/*[Const.BANKS.NAME.KB, Const.BANKS.NAME.KAKAO, Const.BANKS.NAME.SHINHAN]*/ });
            resolve();
        });
        pm.then(() => { this.getBanks(); });
    };

    //네이버 월간 조회
    getApi = () => { //console.log('getApi'); console.log(this.appsKey.apps);
        let out = {
            api: this.api["trend"],
            keyParams: this.appsKey.apps.filter(val => (this.state.reqApps.includes(val.name))),
        };
        return out;
    };


    getBanks = () => {
        if(this.appsKey.apps.length === 0) {
            axios.get(this.api["apps.keys"], {
                headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
            }).then(res => { this.appsKey = res.data.data; console.log(res.data.data)
            }).catch(err => { console.log(err);
            }).finally(() => { this.getBanks__(); });
        } else this.getBanks__();
    };
    //네이버 월간조회
    getBanks__ = () => {
        const req = this.getApi(); //console.log(req);
        const sDate = this.state.startDate;
        const eDate = this.state.endDate;

        const reqApps = req.keyParams.map(app => app.package); //console.log(reqApps);
        axios.get(req.api, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                from: moment(sDate).format('YYYY-MM-DD'),
                to: moment(eDate).format('YYYY-MM-DD'),
                apps: reqApps
            },
        }).then(res => { console.log(res.data.data);
            this.setState({
                resApps: res.data.data
            });
        }).catch(err => { console.log(err);
        }).finally(() => { this.setChart(true); });
    };


    handleFilter = (conds) => { //console.log(conds);
        const reqFilterConds = (conds.length > 0) && conds.filter(cond => (
            (Object.values(cond)[0] === true)
        )); //console.log(reqFilterConds);
        let pm = new Promise(resolve => {
            this.setState({ reqApps: reqFilterConds.map(cond => Object.keys(cond)).flat() });
            resolve();
        });
        pm.then(() => { this.getBanks(); });
    };
    setChart = (refresh = false) => {
        if(refresh) this.setState({ areaChartM: '', areaChartW: ''});
        this.forceUpdate();
        const { resApps } = this.state;
        const { dates, trends } = resApps
        this.setState({
            areaChartM: <LineChart id={1} item = {{
				keys: dates.map(val => val.name),
				values: trends.map(val => ({'name': val.name, 'data': val.dates.map(cnt => cnt.mobile.count)}))
            }} />,
            areaChartW: <LineChart id={2} item = {{
				keys: dates.map(val => val.name),
				values: trends.map(val => ({'name': val.name, 'data': val.dates.map(cnt => cnt.pc.count)}))
            }} />
        });
    };
    toggleHidden = () => {
        this.setState({
            isToggle: !this.state.isToggle
        })
        this.setChart(true);
    };

    handleChangeStart(date) {
        let pm = new Promise(resolve => {
            this.setState({
                startDate: date
            });
            resolve();
        });
        pm.then(() => { this.getBanks() });
    }
    handleChangeEnd(date) {
        let pm = new Promise(resolve => {
            this.setState({
                endDate: date
            });
            resolve();
        });
        pm.then(() => { this.getBanks() });

    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }
    render() {
        const { resApps, reqApps, areaChartM, areaChartW } = this.state;
        const { dates, trends } = resApps
        console.log(trends)
        const item = trends.map((val,idx) => {
            return <TrendItem key={idx} item={val} idx={idx + 1} />
        });

        const contentItems = (
            <table className="table table-hover trend-table mb-0 table-bordered">
                <thead className="thead-light">
                <tr>
                <th className="text-center align-middle" rowSpan={2}>순위</th>
                    <th className="text-center align-middle" rowSpan={2}>검색어</th>
                    { dates.map((val, idx) => (<th className="text-center" colSpan={3} key={idx}>{val.date}</th>)) }
                </tr>
                <tr>
                    { dates.map(idx => (<React.Fragment key={idx}><th className="text-center">모바일</th><th className="text-center">웹</th><th className="text-center">합계</th></React.Fragment>)) }
                </tr>
                </thead>
                <tbody>
                    { item }
                </tbody>
            </table>
        );

        
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="float-left mt-2"><i className="fa fa-building"> </i>은행상품별 검색(전체)</div>
                                <div className="float-right">
                                    <button	className="btn btn-block btn-outline-dark float-sm-right chart-button-stats" onClick={this.toggleHidden}>그래프 보기</button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="row pl-3">
                                            <div className="form-inline form-group">
                                            <DateFickerCom
                                                startDate={this.state.startDate}
                                                endDate={this.state.endDate}
                                                handleChangeStart={this.handleChangeStart}
                                                handleChangeEnd={this.handleChangeEnd}
                                            /> 
                                            </div>
                                            
                                            <div className="col-3">
                                                <BankListFilter onChange={this.handleFilter} resBanks={resApps} reqBanks={reqApps} page={this.props.page} />
                                            </div>
                                        </div>
                                    </div>
            
                                </div>
                                <hr style={{'display': (!this.state.isToggle) ? 'none' : 'block'}} />
                                <div className="wrap-chart" style={{'display': (!this.state.isToggle) ? 'none' : 'block'}}>
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
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default TrendAppsPrd;