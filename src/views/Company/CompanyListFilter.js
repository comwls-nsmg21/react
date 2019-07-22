import React, {Component, Fragment} from 'react';

class CompanyListFilter extends Component {

	state = {
		category: '',
		companyName: '',
		//companyType: '',
		fromAmount: '',
		fromEmployee: '',
		size: 50,
		sido: '',
		toAmount: '',
		toEmployee: '',
	};

	handleChange = (e) => { //console.log(e.target.value);
		let pm = new Promise(resolve => {
			this.setState({[e.target.name]: e.target.value});
			resolve();
		});
		pm.then(() => {
			this.props.onSearch(this.state);
		});
	};

	handleKeyPress = (e) => { //console.log(e.key);
		if ((e.target.name === 'button') || (e.key === 'Enter')) setTimeout(() => { this.props.onSearch(this.state); }, 200);
		if (e.target.name === 'button') e.preventDefault();
		else this.setState({[e.target.name]: e.target.value});
	};

	handleKeyPressChange = (e) => { //console.log(e.target.value);
		this.setState({ [e.target.name]: e.target.value });
	};

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextState !== this.state; //TODO CONFIRM
	}

	render() {

		const out = (
			<div style={{'width': '100%'}}>
				<form action="#">
					<div className="search-filter">
						<div className="search-area">
							<dl>
								<dt>종업원 수</dt>
								<dd>
									<input type="number" onKeyPress={this.handleKeyPress} onChange={this.handleKeyPressChange}
										   defaultValue={this.state.fromEmployee} name="fromEmployee" style={{
										'width':160,
										'padding': 5,
										'border': '1px solid #e4e7ea',
										'borderRadius': '0.25rem'
									}}/> 인
									<span style={{'paddingLeft': 10, 'paddingRight': 10}}>&#126;</span>
									<input type="number" onKeyPress={this.handleKeyPress} onChange={this.handleKeyPressChange}
										   defaultValue={this.state.toEmployee} name="toEmployee" style={{
										'width':160,
										'padding': 5,
										'border': '1px solid #e4e7ea',
										'borderRadius': '0.25rem'
									}}/> 인
								</dd>
							</dl>
							<dl>
								<dt>총 급여액</dt>
								<dd>
									<input type="number" onKeyPress={this.handleKeyPress} onChange={this.handleKeyPressChange}
										   defaultValue={this.state.fromAmount} name="fromAmount" style={{
										'width':160,
										'padding': 5,
										'border': '1px solid #e4e7ea',
										'borderRadius': '0.25rem'
									}}/> 원
									<span style={{'paddingLeft': 10, 'paddingRight': 10}}>&#126;</span>
									<input type="number" onKeyPress={this.handleKeyPress} onChange={this.handleKeyPressChange}
										   defaultValue={this.state.toAmount} name="toAmount" style={{
										'width':160,
										'padding': 5,
										'border': '1px solid #e4e7ea',
										'borderRadius': '0.25rem'
									}}/> 원
								</dd>
							</dl>
							<dl>
								<dt>지역</dt>
								<dd>
									<select name="sido" id="" defaultValue="0" onChange={this.handleChange} style={{
										'width': 160,
										'padding': 5,
										'border': '1px solid #e4e7ea',
										'borderRadius': '0.25rem'
									}}>
										<option value="">전국</option>
										<option value="서울">서울</option>
										<option value="경기">경기</option>
										<option value="경북">경북</option>
										<option value="경남">경남</option>
										<option value="대전">대전</option>
										<option value="전남">전남</option>
										<option value="울산">울산</option>
										<option value="광주">광주</option>
										<option value="충남">충남</option>
										<option value="전북">전북</option>
										<option value="인천">인천</option>
										<option value="강원">강원</option>
										<option value="충북">충북</option>
										<option value="대구">대구</option>
										<option value="부산">부산</option>
										<option value="제주">제주</option>
										<option value="세종">세종</option>
									</select>
								</dd>
							</dl>
						</div>
						<div className="search-area">
							<dl>
								<dt className="text-center">업종</dt>
								<dd>
									<input type="text" onKeyPress={this.handleKeyPress} onChange={this.handleKeyPressChange}
										   defaultValue={this.state.category} name="category" style={{
										'width':160,
										'padding': 5,
										'border': '1px solid #e4e7ea',
										'borderRadius': '0.25rem'
									}} />
								</dd>
							</dl>
							<dl>
								<dt className="text-center">기업명</dt>
								<dd>
									<input type="text" onKeyPress={this.handleKeyPress} onChange={this.handleKeyPressChange}
										   defaultValue={this.state.companyName} name="companyName" style={{
										'width':160,
										'padding': 5,
										'border': '1px solid #e4e7ea',
										'borderRadius': '0.25rem'
									}} />
								</dd>
							</dl>
							<dl>
								<dt className="text-hide">검색</dt>
								<dd><button name="button" onClick={this.handleKeyPress} className="btn btn-outline-primary" style={{'width': 160}}>검색</button></dd>
							</dl>
						</div>
					</div>
					<div style={{'width': '100%', 'position': 'relative'}}>
						<select name="size" id="" style={{
							'width': 'auto%',
							'position': 'absolute',
							'right': 0,
							'bottom': -10,
							'padding': 5,
							'border': '1px solid #e4e7ea',
							'borderRadius': '0.25rem'
						}} defaultValue="0" onChange={this.handleChange}>
							<option value="50">50개씩 조회</option>
							<option value="100">100개씩 조회</option>
							<option value="500">500개씩 조회</option>
							<option value="1000">1000개씩 조회</option>
						</select>
					</div>
				</form>
			</div>
		);

		return (<Fragment> {out} </Fragment>);
	}
}

export default CompanyListFilter;