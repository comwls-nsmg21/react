import React, {Component} from 'react';
import axios from 'axios';
import BarChart from '../Common/Chart/BarChart'
import PieChart from '../Common/Chart/PieChart';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.api = {
            'coms.indexStatsAmount': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/companies/amount/stats',
            'coms.indexStatsCat': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/companies/category/stats',
            'coms.indexStatsEmpl': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/companies/employee/stats',
            'coms.indexStatsTop': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/companies/top/stats',
            'banks.indexStatsLocation': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/banks/location/lives'
        };
    }

    state = {
        statsAmount: [],
        statsCat: {},
        statsEmpl: [],
        statsTop: {},
        statsLocation: {},
    };

    componentDidMount() {
        this.getStatsTop();
        this.getStats();
    };

    getStats = () => {
        const getAmount = () => axios.get(this.api["coms.indexStatsAmount"]);
        const getCat = () => axios.get(this.api["coms.indexStatsCat"]);
        const getEmpl = () => axios.get(this.api["coms.indexStatsEmpl"]);
        const getLocation = () => axios.get(this.api["banks.indexStatsLocation"]);
        axios.all([getAmount(), getCat(), getEmpl(), getLocation()]).then(axios.spread((resAmount, resCat, resEmpl, resLocation) => { //console.log(resEmpl.data.data);
            this.setState({
                statsAmount: resAmount.data.data,
                statsCat: resCat.data.data,
                statsEmpl: resEmpl.data.data,
                statsLocation: resLocation.data.data
            });
        })).catch(err => {
            console.log(err); 
        });
    };

    getStatsTop = () => {
        axios.get(this.api["coms.indexStatsTop"], {}).then(res => { //console.log(res.data.data);
            this.setState({statsTop: res.data.data});
        }).catch(err => {
            console.log(err)
        }).finally(() => { /* console.log(this.state) */
        });
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    render() {

        const {statsAmount, statsCat, statsEmpl, statsTop, statsLocation} = this.state;
        const isNotEmpty = (((statsAmount.length > 0) && (Object.keys(statsCat).length > 0) && (statsEmpl.length > 0) && (Object.keys(statsTop).length > 0)) && (Object.keys(statsLocation).length > 0));
        
        const charts = (isNotEmpty) && (
            <div className="animated fadeIn">
                <div className="row">

                    <div className="col-sm-6 col-md-4">
                        <div className="card">
                            <div className="card-header">
                                Top 100 기업 업종별 사업장 비율
                            </div>
                            <div className="card-body">
                                <BarChart item={{
                                    keys: Object.keys(statsTop.category),
                                    values: Object.values(statsTop.category),
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="card">
                            <div className="card-header">
                                Top 100 사업장 위치
                            </div>
                            <div className="card-body">
                                <BarChart item={{
                                    keys: Object.keys(statsTop.sido),
                                    values: Object.values(statsTop.sido),
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="card">
                            <div className="card-header">
                            국민연금 가입자수 기준 사업장 수
                            </div>
                            <div className="card-body">
                                <PieChart item={{
                                    values: statsEmpl.map((val, idx) => ([val.label, val.count, (idx===0 ? true : false), (idx===0 ? true : null)]))
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="card">
                            <div className="card-header">
                                고지금액 기준 사업장 수
                            </div>
                            <div className="card-body">
                                <PieChart item={{
                                    values: statsAmount.map((val, idx) => ([val.label, val.count, (idx===0 ? true : false), (idx===0 ? true : null)]))
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="card">
                            <div className="card-header">
                                업종 기준 사업장
                            </div>
                            <div className="card-body">
                                <BarChart item={{
                                    keys: Object.keys(statsCat).reverse(),
                                    values: Object.values(statsCat).reverse(),
                                }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="card">
                            <div className="card-header">
                                위치기반 일별 라이브
                            </div>
                            <div className="card-body">
                                <BarChart item={{
                                    keys: Object.keys(statsLocation.label).map(key => statsLocation.label[key]),
                                    values: Object.values(statsLocation.total)
                                }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );

        const content = (
            <>
                {charts}
            </>

        );

        return (<> {content} </>);
    }
}

export default Dashboard;
