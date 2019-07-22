import React, {Component} from 'react';
import axios from 'axios/index';
import * as moment from "moment/moment";
import Const from "../Common/Const";
import NaverBankMonth from "./NaverBankMonth"
import ChartLine from "../Chart/ChartLine"

class NaverBank extends Component {
    constructor(props) {
        super(props);

        const d = new Date();
        const d2 = new Date();
        const lastWeek = d.getDate();

        this.api = {
            'naver': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/keywords/naver',
            'naver.stats': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/keywords/naver/stats',
            'banks.getKeys': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/banks',
            'banks.indexPvt': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/banks/personals',
        };
        this.banksKey = {
            company: [],
            personal: [],
            service: [],
        };
        this.state = {
            //차트
            areaChartM:'',
            areaChartW:'',
            //네이버 월간조회
            startDate: d.setDate(lastWeek - 7),
            endDate: new Date(),
            //네이버 월간조회(키워드)
            startDateKeyword: d2.setDate(lastWeek - 7),
            endDateKeyword: new Date(),
            //은행 Api
            resBanks: [{
                items: [],
                title: []
            }],
            labels : [],
            keywords : [],
            pcCount : {},
            mobileCount : {},
            //차트보기
            isToggle: true
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    componentDidMount() {
        let pm = new Promise(resolve => {
            this.setState({ reqBanks: Object.values(Const.BANKS.NAME).map(val => val)/*[Const.BANKS.NAME.KB, Const.BANKS.NAME.KAKAO, Const.BANKS.NAME.SHINHAN]*/ });
            resolve();
        });
        pm.then(() => { this.getBanks(); });
    };

    //네이버 월간 조회
    getApi = () => { //console.log('getApi'); console.log(this.banksKey);
        let out = {
            api: this.api["naver.stats"],
            keyParams: this.banksKey.personal.filter(bank => (this.state.reqBanks.includes(bank.bankName))),
        };
        return out;
    };


    getBanks = () => {
        if(this.banksKey.company.length === 0) {
            axios.get(this.api["banks.getKeys"], {
            }).then(res => { this.banksKey = res.data.data; //console.log(res.data.data)
            }).catch(err => { console.log(err);
            }).finally(() => { this.getBanks__(); });
        } else this.getBanks__();
    };
    //네이버 월간조회
    getBanks__ = () => {
        const req = this.getApi(); //console.log(req);
        const sDate = this.state.startDate;
        const eDate = this.state.endDate;

        const reqBanks = req.keyParams.map(bank => bank.bankKey); //console.log(reqBanks);
        axios.get(req.api, {
            params: {
                type: 'bankName',
                fromDate: moment(sDate).format('YYYY-MM-DD'),
                toDate: moment(eDate).format('YYYY-MM-DD'),
                bankIds: reqBanks
            },
        }).then(res => { console.log(res.data.data);
            res.data.data.forEach((val) => {
                this.setState({
                    labels: Object.values(val.items).map(labels => labels.label),
                })
            });
            this.setState({
                resBanks: res.data.data
            });
        }).catch(err => { console.log(err);
        }).finally(() => { this.setChart(true); });
    };


    handleFilter = (conds) => { //console.log(conds);
        const reqFilterConds = (conds.length > 0) && conds.filter(cond => (
            (Object.values(cond)[0] === true)
        )); //console.log(reqFilterConds);
        let pm = new Promise(resolve => {
            this.setState({ reqBanks: reqFilterConds.map(cond => Object.keys(cond)).flat() });
            resolve();
        });
        pm.then(() => { this.getBanks(); });
    };
    setChart = (refresh = false) => {
        if(refresh) this.setState({ areaChartM: '', areaChartW: ''});
        this.forceUpdate();
        const { resBanks, labels } = this.state;
        this.setState({
            areaChartM: <ChartLine id={1} item={{
                title: '모바일 월간조회수',
                ids: resBanks.map(val=>val.title),
                keys: labels.map(val=>val),
                values: resBanks.map(val => Object.values(val.items).map(item => item.mobileCount))
            }} />,
            areaChartW: <ChartLine id={2} item={{
                title: '웹 월간조회수',
                ids: resBanks.map(val=>val.title),
                keys: labels.map(val=>val),
                values: resBanks.map(val => Object.values(val.items).map(item => item.pcCount))
            }} />
        });
        console.log(this.state.areaChartM)
    };
    toggleHidden = () => {
        this.setState({
            isToggle: !this.state.isToggle
        })
        this.setChart(true);
        console.log(this.setChart(true))
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
        const { resBanks, reqBanks, labels } = this.state;
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-md-12">
                        <NaverBankMonth
                            resBanks={resBanks}
                            reqBanks={reqBanks}
                            labels={labels}
                            handleChangeStart={this.handleChangeStart}
                            handleChangeEnd={this.handleChangeEnd}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleFilter}
                            page={this.props.location.pathname}
                            areaChartM={this.state.areaChartM}
                            areaChartW={this.state.areaChartW}
                            toggleHidden={this.toggleHidden}
                            isToggle={this.state.isToggle}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default NaverBank;