import React, {Component, Fragment} from 'react';
import axios from 'axios';
import './BankListFilter.css';

import Const from '../Common/Const';

class BankListFilter extends Component {

	constructor(props) {
		super(props);
		this.api = {
			'banks.index': '/api/banks',
		};
	}

	state = {
		banks: [],
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
			$('.option-select').find('img').attr('src','/img/bank/up_ico.png');
		else $('.option-select').find('img').attr('src','/img/bank/down_ico.png');
	};

	getBanks = () => {
		axios.get(this.api["banks.index"], {
		}).then(res => {
			this.setState({ banks: res.data.data.service.map(bank => ( {[bank.bankName]: false} )), });
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

	render() { //console.log(this.state.banks);
		const isNotEmpty = (this.state.banks.length > 0);
		const banks = (isNotEmpty) && this.state.banks.map((bank, idx) => (
			<li key={idx}>
				<input type="checkbox" name={Object.keys(bank)} onChange={this.handleChange} />{ Object.keys(bank) }
			</li>
		));

		const out = (
			<div className="option-wrap">
				<div className="option-select" onClick={this.handleClose}>은행 추가선택
					<span className="option-ico"><img src="/img/bank/down_ico.png" alt="down icon"/></span>
				</div>
				<div className="option-list-wrap-banks visible cf">
					<div className="option-list-box">
						<ul className="option-list">
							{ banks }
						</ul>
					</div>
				</div>
			</div>
		);

		return (<Fragment>{ out }</Fragment>);
	}
}

export default BankListFilter;