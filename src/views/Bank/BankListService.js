import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Const from '../Common/Const';
import BankItem from "./BankItem";
import BankListFilter from "./BankListFilter";
import LineChart from '../Common/Chart/LineChart';

class BankListService extends Component {

    constructor(props) {
		super(props);
		this.api = {
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
			data: {},
			grapf: {},
			head:[],
			issue:{},
			ranking: [],
			total: [],
		},
		isToggle: true
	};

    componentWillMount() {
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
        if(this.banksKey.company.length === 0) {
			axios.get(this.api["banks.getLists"], {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}).then(res => { this.banksKey = res.data; //console.log(res.data)
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
		}).then(res => { //console.log(res.data);
			this.setState({ resBanks: res.data });
		}).catch(err => { console.log(err);
		}).finally(() => { this.setChart(true) });
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
		const { data, head } = resBanks;
		const keys = head.map(val=> val.month);
		let values = [];
		for(let key in data) {
			const aaa = {
				name: key,
				data: data[key].map(val => val.count)
			}
			values.push(aaa)
		}
		this.setState({
			areaChart: <LineChart id={1} item={{
				keys: keys,
				values: values
			}} />
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
        const { areaChart, resBanks } = this.state;
        const total = resBanks.total;
        const dataEmpty = Object.keys(resBanks.data).length > 0;
        //if((resBanks.label.length === 0) || (Object.keys(resBanks).length === 0)) return(<Fragment> </Fragment>);
        //if(resBanks.length === 0) return(<Fragment> </Fragment>);
        const contentHead = (
            <div className="card-header">
                <div className="float-left mt-2"><i className="fa fa-code-fork"> </i>서비스 앱 뱅킹</div>
                <div className="float-right">
                    <button	className="btn btn-outline-primary" style={{ width: '120px' }} onClick={this.toggleHidden.bind(this)}>그래프 보기</button>
                </div>
            </div>

        );

        //기업정보 조회서비스/은행트랜드/서비스 앱 뱅킹 구현 영역
        const resRank = resBanks.ranking;
		const resOrder = resRank.map(val => (resBanks.data[val]));	//은행 랭크별 정렬
		
		const items = resOrder.map((bank, idx) => {
			return <BankItem key={idx} item={bank} idx={idx + 1}/>
		});
		const totalTbl = (
			<tr className="last-tr">
				{ (dataEmpty > 0) && <td colSpan={2} className="text-center">합계</td>}
				{ total.map((val, idx) => {
					const Icon = (()=>{
						switch(val.status){
							case 'increase':
								return (<span className="tri-ico" style={{'color':'red'}}>▲</span>);
							case 'decrease':
								return (<span className="tri-ico" style={{'color':'blue'}}>▼</span>);
							default:
								break;
						}
					})();
					return (
						<td key={idx} className="text-right">
							<span className="wrap-block">
								<span className="block">{val.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
								{ (val.amount !== 0) && <span className="block">({ val.amount })</span>}
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
					{ resBanks.head.map((val, idx) => (<th key={idx} className="text-center"> 
						<span className="block">{ val.month }</span>
						<span className="block">({ val.sample.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })</span>
					</th>)) }
				</tr>
				</thead>
				<tbody>
					{items}
					{totalTbl}
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
									<BankListFilter onChange={this.handleFilter} reqBanks={this.state.reqBanks} page={this.props.location} />
								</div>
								<div style={{'display': (!this.state.isToggle) ? 'none' : 'block'}}>
									{ dataEmpty > 0 && areaChart }
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

export default BankListService;