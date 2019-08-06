import React, {Component, Fragment} from 'react';
import axios from 'axios';
import $ from 'jquery';

import DownBtn from '../../../src/assets/img/bank/down_ico.png';
import UpBtn from '../../../src/assets/img/bank/up_ico.png';

class BankListFilter extends Component {

	constructor(props) { 
		super(props);
		this.api = {
			'apps.index': 'http://rsc9-api.koreasouth.cloudapp.azure.com/api/apps?category=bank'
		};
    }
    static defaultProps = {
        apps: [],
    }

	state = {
		apps: [],
		isChecked: true
	};

	componentWillMount() {
		if (this.state.apps.length === 0) this.getBanks();
	}

	componentDidMount() {
		let infoOption = $('.option-list-wrap-banks');
		infoOption.removeClass('visible');
	}

	handleClose = () => {
		let infoOption = $('.option-list-wrap-banks');
		infoOption.toggleClass('visible');
		if(infoOption.hasClass('visible') === true)
			$('.option-select').find('img').attr('src', UpBtn);
		else $('.option-select').find('img').attr('src', DownBtn);
	};

	getBanks = () => { //console.log(this.props.reqBanks);
		axios.get(this.api["apps.index"], {
			headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => { console.log(res.data.data.apps);
            let data = [];
            data = res.data.data.apps
			this.setState({ apps: data.map(bank => ( {[bank.name]: (this.props.reqBanks.includes(bank.name))} )), });
		}).catch(err => { console.log(err);
		}).finally(() => { this.forceUpdate(); });
	};

	handleChange = (e) => { //console.log(e.target.checked);
		let pm = new Promise(resolve => {
			const outs = this.state.apps.map(src => ( (Object.keys(src)[0] === e.target.name) ? { [e.target.name]: e.target.checked } : src )); //console.log(outs);
			this.setState({ apps: outs });
			resolve();
		});
		pm.then(() => { this.props.onChange(this.state.apps); });
	};
	//전체 뱅킹 목록 선택
	handleBankAllCheak = (e) => {
		const apps = this.state.apps;
		const checked = e.target.checked;
		let pm = new Promise(resolve => {
			const appsmap = apps.map(t => {
				const name = Object.keys(t)[0]; //console.log(name);
				if(checked){
					return { [name]: true };
				} else {
					return { [name]: false };
				}
			}); console.log(appsmap);
			this.setState({apps: appsmap,isChecked: !this.state.isChecked});
			resolve();

		});
		pm.then(() => { //console.log(this.state.banks);
			this.props.onChange(this.state.apps);
		});

    };

	render() { //console.log(this.props);
		const isNotEmpty = (this.state.apps.length > 0);
		const apps = (isNotEmpty) && this.state.apps.map((app, idx) => (
			<li key={idx}>
				<input type="checkbox" id={`apps_${idx}`} name={Object.keys(app)} onChange={this.handleChange} checked={Object.values(app)[0]} />
				<label htmlFor={`apps_${idx}`}>{ Object.keys(app) }</label>
			</li>
		));

		const out = (
			<div className="option-wrap">
				<div className="option-select" onClick={this.handleClose}>은행 추가선택
					<span className="option-ico"><img src={DownBtn} alt="down icon"/></span>
				</div>
				<div className="option-list-wrap-banks visible cf">
					<div className="option-list-box">
						<ul className="option-list">
							<li><input type="checkbox" onChange={this.handleBankAllCheak} id="allCheck" checked={this.state.isChecked} /><label
								htmlFor="allCheck">전체</label></li>
							{ apps }
						</ul>
					</div>
					<div className="btn-close-wrap">
						<input type="button" className="btn-close" onClick={this.handleClose} value="닫기"/>
					</div>
				</div>
			</div>
		);

		return (<Fragment>{ out }</Fragment>);
	}
}

export default BankListFilter;