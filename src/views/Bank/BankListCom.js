import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Const from '../Common/Const';
import BankItem from "./BankItem";
import BankListFilter from "./BankListFilter";
import LineChart from '../Common/Chart/LineChart';

class BankListCom extends Component {

	constructor(props) {
		super(props);
		this.api = {
			'apps.keys': 'http://rsc9-api.koreasouth.cloudapp.azure.com/api/targets?category=bank&type=company',
			'apps.getLists': 'http://rsc9-api.koreasouth.cloudapp.azure.com/api/apps/stats?category=bank&type=company'
		};
		this.appsKey = {
			targets:[]
		};
	}

	state = {
		areaChart: '',
		reqApps: [],
		resApps: {
            months: [],
			apps: [],
			stats: [],
			samples:[],
			totals: [],
		},
		isToggle: true
	};

	componentDidMount() {
		let pm = new Promise(resolve => {
			this.setState({ reqApps: Object.values(Const.BANKS.NAME).map(val => val)});
			resolve();
		});
        pm.then(() => { this.getBanks(); });
        //this.getBanks()
	};

	getApi = () => { //console.log('getApi'); console.log(this.state.reqApps);
		let out = {
            api: this.api["apps.getLists"],
            //keyParams: this.appsKey.apps.map(val => val.package),
            keyParams: this.appsKey.targets.filter(val => (this.state.reqApps.includes(val.name))),
		};
        return out;
	};

	getBanks = () => {
		if(this.appsKey.targets.length === 0) {
			axios.get(this.api["apps.keys"], {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}).then(res => { this.appsKey = res.data.data; //console.log(this.appsKey.apps)
			}).catch(err => { console.log(err);
			}).finally(() => { this.getBanks__(); });
		} else this.getBanks__();
	};

	getBanks__ = () => {
		//let date = new Date();
        const req = this.getApi(); //console.log(req);
		const reqApps = req.keyParams.map(app => app.package); //console.log(reqApps);
		axios.get(req.api, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
			params: { apps: reqApps },
		}).then(res => { //console.log(res.data.data);
			this.setState({ resApps: res.data.data }); //console.log(this.state.reqApps)
		}).catch(err => { console.log(err);
		}).finally(() => { this.setChart(true) });
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
		if(refresh) this.setState({ areaChart: ''});
        const { resApps } = this.state;
        const { months, stats } = resApps;
		this.setState({
            areaChart: <LineChart id={1} 
                item={{
				    keys: months.map(val => val.month),
				    values: stats.map(val => ({'name': val.name, 'data': val.months.map(cnt => cnt.count) }))
                }} 
            />
		})
	};
	toggleHidden = () => {
		this.setState({
			isToggle: !this.state.isToggle
		})
	};

	
	
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextState !== this.state;
	}

	render() { //console.log('render'); //console.log(this.state);
        const { areaChart, resApps } = this.state;
        const { samples, stats, totals } = resApps
        const dataLength = stats.length;
        
        if(dataLength === 0) return(<Fragment> </Fragment>);
        
		const contentHead = (
			<div className="card-header">
				<div className="float-left mt-2"><i className="fa fa-building-o"></i>기업 뱅킹</div>
				<div className="float-right">
					<button	className="btn btn-outline-primary" style={{ width: '120px' }} onClick={this.toggleHidden.bind(this)}>그래프 보기</button>
				</div>
			</div>
		);
        
        const items = stats.map((val, idx) => {
            return <BankItem key={idx} item={val} idx={idx + 1}/>
        });
		//기업정보 조회서비스/은행트랜드/서비스 앱 뱅킹 구현 영역
		// const resRank = resApps.ranking;
		// const resOrder = resRank.map(val => (resApps.data[val]));	//은행 랭크별 정렬  
        
        const totalTbl = (
			<tr className="last-tr">
				{ <td colSpan={2} className="text-center">합계</td>}
				{ totals.map((val, idx) => {
                    const Icon = (()=>{
                        switch(val.trend){
                            case 'up':
                                return (<span className="tri-ico" style={{'color':'red'}}>▲</span>);
                            case 'down':
                                return (<span className="tri-ico" style={{'color':'blue'}}>▼</span>);
                            default:
                                break;
                        }
                    })();
                    return (
                        <td key={idx} className="text-right">
                            <span className="wrap-block">
                                <span className="block">{val.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                { (val.differ !== 0) && <span className="block">({ val.differ })</span>}
                            </span>
                            {Icon}
                        </td>
                    )}
                )}
			</tr>
        )
		const contentItems = (
			<table className="table table-responsive-sm table-striped table-hover table-outline mb-0 table-bordered">
				<thead className="thead-light">
				<tr>
					<th className="text-center middle">순위</th>
                    <th className="text-center">은행명</th>

					{ samples.map((val, idx) => (<th key={idx} className="text-center"> 
						<span className="block">{ val.month }</span>
						<span className="block">({ val.sample.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })</span>
                    </th>)) }
				</tr>
				</thead>
                <tbody>
					{ items }
					{ totalTbl }
				</tbody>
			</table>
		);
		const content = (
			<div className="animated fadeIn">
				<div className="row">
					<div className="col-md-12">
						<div className="card">
							{contentHead}
							<div className="card-body">
								<div className="banks-utility-wrap cf" style={{'width':'100%','position': 'relative'}}>
									<BankListFilter onChange={this.handleFilter} reqBanks={this.state.reqApps} resApps={this.appsKey.apps} page={this.props.location} />
                                </div>
                                <div style={{'display': (!this.state.isToggle) ? 'none' : 'block'}}>
									{ dataLength > 0 && areaChart }
                                </div>
                                <hr />
								{ contentItems }
								<hr />
							</div>
						</div>
					</div>
				</div>
			</div>
		);

		return (<Fragment> {content} </Fragment>);
	}
}

export default BankListCom;