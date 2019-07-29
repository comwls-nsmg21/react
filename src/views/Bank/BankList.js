import React, {Component, Fragment} from 'react';
import axios from 'axios';

import Const from '../Common/Const';
import BankItem from "./BankItem";
import BankListFilter from "./BankListFilter";
import LineChart from '../Common/Chart/LineChart';

class BankList extends Component {

	constructor(props) {
		super(props);
		this.api = {
			'banks.getKeys': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/banks',
			'banks.indexCom': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/banks/companies',
			'banks.indexPvt': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/banks/personals',
			'banks.indexSrv': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/banks/services',
			'banks.index': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/banks/services/stats',

			'banks.first': 'http://rsc9-api.koreasouth.cloudapp.azure.com/api/apps/banks/personal',
			'banks.getLists': 'http://rsc9-api.koreasouth.cloudapp.azure.com/api/apps/banks/lists'
			
		};
		this.banksKey = {
			company: [],
			personal: [],
			service: [],
		};
	}

	state = {
		areaChart: '',
		reqBanks: [],
		resBanks: {
			items: [],
			label: [],
		},
	};

	componentDidMount() {
		let pm = new Promise(resolve => {
			this.setState({ reqBanks: Object.values(Const.BANKS.NAME).map(val => val)});
			resolve();
		});
		pm.then(() => { this.getBanks(); });
	};

	getApi = () => { //console.log('getApi'); console.log(this.banksKey);
		let out = {
			api: this.api["banks.first"],
			keyParams: this.banksKey.personal.filter(bank => (this.state.reqBanks.includes(bank.bankName))),
		};
		return out;
	};

	getBanks = () => {
		// if(this.banksKey.company.length === 0) {
		// 	axios.get(this.api["banks.getKeys"], {
		// 	}).then(res => { this.banksKey = res.data.data; console.log(res.data.data)
		// 	}).catch(err => { console.log(err);
		// 	}).finally(() => { this.getBanks__(); });
		// } else this.getBanks__();
		if(this.banksKey.company.length === 0) {
			axios.get(this.api["banks.getLists"], {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}).then(res => { this.banksKey = res.data; console.log(res.data)
			}).catch(err => { console.log(err);
			}).finally(() => { this.getBanks__(); });
		} else this.getBanks__();
	};

	getBanks__ = () => {
		//let date = new Date();
		const req = this.getApi(); //console.log(req);
		const reqBanks = req.keyParams.map(bank => bank.bankKey); //console.log(reqBanks);
		axios.get(req.api, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
			params: { bankIds: reqBanks },
		}).then(res => { console.log(res.data);
			this.setState({ resBanks: res.data });
		}).catch(err => { console.log(err);
		}).finally(() => { (this.state.areaChart !== '') && this.setChart(true); });
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
		if(refresh) this.setState({ areaChart: ''});
		const { resBanks } = this.state; //console.log(resBanks);
		const { items, label } = resBanks;
		const chartItem = items.map(val => {
			const cItem = {
				name: val.title,
				data: val.items.map(cnt => cnt.count),
			}
			return cItem
		})
		this.setState({ areaChart: (this.state.areaChart !== '') ? '' : <LineChart 
			item = {{
				keys: label,
				values: chartItem
			}} />
		});
	};
	
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextState !== this.state;
	}

	render() { //console.log('render'); //console.log(this.state);
		const { areaChart, resBanks } = this.state;
		//if((resBanks.label.length === 0) || (Object.keys(resBanks).length === 0)) return(<Fragment> </Fragment>);
		if(resBanks.label.length === 0) return(<Fragment> </Fragment>);
		const contentHead = (
			<div className="card-header">
				<div className="float-left mt-2"><i className="fa fa-building"> </i>개인뱅킹</div>
				<div className="float-right">
					<button	className="btn btn-outline-primary" style={{ width: '120px' }} onClick={this.setChart}>그래프 보기</button>
				</div>
			</div>

		);

		//기업정보 조회서비스/은행트랜드/서비스 앱 뱅킹 구현 영역
		let banksCount = {};
		resBanks.items.map(bank => (bank.bankName)).forEach(function(i) { banksCount[i] = (banksCount[i] || 0) + 1; }); //console.log(banksCount);
		let bankNamePrev = '';
		const items = resBanks.items.map((bank, idx) => {
			const isBankNameInit = (bankNamePrev !== bank.bankName);
			bankNamePrev = bank.bankName;
			const bCount = (isBankNameInit) ? banksCount[bank.bankName] : 0; //console.log(bCount);
			return <BankItem key={idx} item={bank} page={this.props.location} rowspan={ bCount } />
		}); //console.log(resBanks);

		const contentItems = (
			<table className="table table-responsive-sm table-hover table-outline mb-0 table-bordered">
				<thead className="thead-light">
				<tr>
					<th className="text-center">은행명</th>

					{ resBanks.label.map((val, idx) => (<th key={idx} className="text-center"> { val } </th>)) }
				</tr>
				</thead>
				<tbody>{items}</tbody>
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
									<BankListFilter onChange={this.handleFilter} reqBanks={this.state.reqBanks} page={this.props.location} />
								</div>
								<div>{ (this.state.areaChart !== '') && <br /> } { areaChart }</div>
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

export default BankList;