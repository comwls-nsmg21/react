import React, {Component, Fragment} from 'react';
import axios from 'axios';
import BarChart from '../Common/Chart/BarChart';
import PieChart from '../Common/Chart/PieChart';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.api = {
            'banks.stats':'http://rsc9-api.koreasouth.cloudapp.azure.com/api/pinfin/bank',
        };
    }

    state = {
        rankings:{
            companyApps:[],
            personalApps:[],
            keywords:[],
            companyTop5:[]
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
        .then(resBanks => { //console.log(resBanks.data.data.rankings);
            this.setState({ rankings : resBanks.data.data.rankings});
        }).catch(err => {
            console.log(err)
        })
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    render() {

        const { rankings } = this.state;
        const { personalApps, companyApps, keywords, companyTop5 } = rankings
        const isNotEmpty = (Object.values(rankings).length > 0);
        const pieVal = companyTop5.map((val, idx) => ([val.name, val.count, (idx===0 ? true : false), (idx===0 ? true : null)])) //PieChart 
        
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
                                   keys: personalApps.map(val => val.name),
                                   values: personalApps.map(val => val.count),
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
                                   keys: companyApps.map(val => val.name),
                                   values: companyApps.map(val => val.count),
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
                                   keys: keywords.map(val => val.name),
                                   values: keywords.map(val => val.count),
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
