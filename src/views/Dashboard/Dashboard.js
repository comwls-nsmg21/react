import React, {Component, Fragment} from 'react';
import axios from 'axios';
import BarChart from '../Common/Chart/BarChart';
import PieChart from '../Common/Chart/PieChart';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.api = {
            'banks.stats':'http://rsc9-api.koreasouth.cloudapp.azure.com/api/bank/dashboard',
        };
    }

    state = {
        statsBanks:{
            company:[],
            personal:[],
            keyword:{},
            top5:{}
        },
    };

    componentDidMount() {
        this.getStats();
    };

    getStats = () => {
        axios.get(this.api["banks.stats"], {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(resBanks => { //console.log(resBanks);
            this.setState({statsBanks: resBanks.data});
        }).catch(err => {
            console.log(err)
        })
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    render() {

        const {statsBanks} = this.state;
        const { personal, company, keyword, top5 } = statsBanks
        const isNotEmpty = (Object.values(statsBanks).length > 0);
        let pieVal = [];
        let idx=0;
        for(let val in top5){
            pieVal.push([val, top5[val], (idx===0 ? true : false), (idx===0 ? true : null)])
            idx++;
        };
        
        const charts = (isNotEmpty) && (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <i className="nav-icon fa fa-user-o"></i>개인뱅킹 앱순위
                            </div>
                            <div className="card-body">
                                <BarChart id={1} item={{
                                   keys: personal.map(val => val.company),
                                   values: personal.map(val => val.count),
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <i className="nav-icon fa fa-building-o"></i>기업뱅킹 앱순위
                            </div>
                            <div className="card-body"> 
                                <BarChart id={2} item={{ 
                                   keys: company.map(val => val.company),
                                   values: company.map(val => val.count),
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <i className="nav-icon fa fa-building-o"></i>기업뱅킹 앱순위
                            </div>
                            <div className="card-body"> 
                                <BarChart id={3} item={{ 
                                   keys: Object.keys(keyword),
                                   values: Object.values(keyword),
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <i className="nav-icon fa fa-building-o"></i>기업뱅킹 앱순위
                            </div>
                            <div className="card-body"> 
                                <PieChart id={4} item={{
                                    values:pieVal
                                }} />
                            </div>
                        </div>
                    </div>
                    
                </div> 
            </div>

        );

        const content = (
            <Fragment>
                {charts}
            </Fragment>

        );

        return (<Fragment> {content} </Fragment>);
    }
}

export default Dashboard;
