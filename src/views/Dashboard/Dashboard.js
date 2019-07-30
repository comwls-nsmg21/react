import React, {Component} from 'react';
import axios from 'axios';
import BarChart from '../Common/Chart/BarChart';
//import PieChart from '../Common/Chart/PieChart';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.api = {
            'banks.stats':'http://rsc9-api.koreasouth.cloudapp.azure.com/api/bank/dashboard',
        };
    }

    state = {
        statsBanks:{},
    };

    componentDidMount() {
        this.getStatsTop();
        this.getStats();
    };

    getStats = () => {
        axios.get(this.api["banks.stats"], {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(resBanks => { console.log(resBanks);
            this.setState({statsBanks: resBanks.data});
        }).catch(err => {
            console.log(err)
        }).finally(() => { /* console.log(this.state) */
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

        const {statsBanks} = this.state;
        const { personal, company } = statsBanks
        const isNotEmpty = (Object.values(statsBanks).length > 0);
        
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
