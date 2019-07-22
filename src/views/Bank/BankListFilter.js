import React, {Component, Fragment} from 'react';
import axios from 'axios';
import './BankListFilter.css';
import Const from '../Common/Const';
import $ from 'jquery';

import DownBtn from '../../../src/assets/img/bank/down_ico.png';
import UpBtn from '../../../src/assets/img/bank/up_ico.png';

class BankListFilter extends Component {

	constructor(props) {
		super(props);
		this.api = {
			'banks.index': 'http://pinfin-dev.koreasouth.cloudapp.azure.com//api/banks',
		};
	}

	state = {
		banks: [],
		isChecked: true
	};

	componentWillMount() {
		if (this.state.banks.length === 0) this.getBanks();
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
		axios.get(this.api["banks.index"], {
		}).then(res => { //console.log(res.data.data);
			let data = [];
			switch (this.props.page) {
				default: case Const.BANKS.PAGE.COM: data = res.data.data.company; break;
				case Const.BANKS.PAGE.PVT: data = res.data.data.personal; break;
				case Const.BANKS.PAGE.SERVICE: data = res.data.data.service; break;
			}
			this.setState({ banks: data.map(bank => ( {[bank.bankName]: (this.props.reqBanks.includes(bank.bankName))} )), });
		}).catch(err => { console.log(err);
		}).finally(() => { this.forceUpdate(); });
	};

	handleChange = (e) => { //console.log(e.target.checked);
		let pm = new Promise(resolve => {
			const outs = this.state.banks.map(src => ( (Object.keys(src)[0] === e.target.name) ? { [e.target.name]: e.target.checked } : src )); //console.log(outs);
			this.setState({ banks: outs });
			resolve();
		});
		pm.then(() => { this.props.onChange(this.state.banks); });
	};
	//전체 뱅킹 목록 선택
	handleBankAllCheak = (e) => {
		const banks = this.state.banks;
		const checked = e.target.checked;
		let pm = new Promise(resolve => {
			const banksmap = banks.map(t => {
				const name = Object.keys(t)[0]; //console.log(name);
				if(checked){
					return { [name]: true };
				} else {
					return { [name]: false };
				}
			}); console.log(banksmap);
			this.setState({banks: banksmap,isChecked: !this.state.isChecked});
			resolve();

		});
		pm.then(() => { //console.log(this.state.banks);
			this.props.onChange(this.state.banks);
		});

    };

	render() { //console.log(this.state.banks);
		const isNotEmpty = (this.state.banks.length > 0);
		const banks = (isNotEmpty) && this.state.banks.map((bank, idx) => (
			<li key={idx}>
				<input type="checkbox" id={`bank_${idx}`} name={Object.keys(bank)} onChange={this.handleChange} checked={Object.values(bank)[0]} />
				<label htmlFor={`bank_${idx}`}>{ Object.keys(bank) }</label>
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
							{ banks }
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