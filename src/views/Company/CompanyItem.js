import React, {Component, Fragment} from 'react';
import CompanyItemChart from "./CompanyItemChart";

class CompanyItem extends Component {

	state = {
		isChart: false,
	};

	handleClickMember = () => {
		this.setState({ isChart: !(this.state.isChart) });
	};

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextState !== this.state;
	}

	render() { //console.log(this.props);

		const { idx, item, page } = this.props;
		const { company, nps } = item; //console.log(company.geo_point);
		const typeNull = "null";
		//console.log(item.salary.avg)
		const content = (
			<tr className="text-layout">
				{ (page !== "/Company/Company") && (<td className="text-center">{ idx }</td>) }
				{/* <td className="text-center">
					{ (company.shape === 1) ? <span className="badge badge-primary">법인</span> : <span className="badge badge-warning">개인</span> }
				</td> */}
				<td className="text-left">
					{ company.name }
				</td>
				<td className="text-left">
					{ (typeof company.address === typeNull) ? company.type_code : company.address }
				</td>
				<td className="text-center">
					{ ((typeof company.geo_point === "object") && ((company.geo_point.lat > 0) && (company.geo_point.lon > 0))) && <a href={`http://map.daum.net/link/map/` + encodeURI(company.name) + `,` + company.geo_point.lat + `,` + company.geo_point.lon} rel="noopener noreferrer"><i className="fa fa-map-marker"> </i> 지도</a> }
				</td>
				<td className="text-right text-on" onClick={this.handleClickMember}>
					{ nps.count_subscriber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
				</td>
				<td className="text-right">
					{item.salary.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }원
				</td>
				<td className="text-right">
					{item.salary.avg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }원
				</td>
				<td className="text-center">
					{ company.type_name }
				</td>
			</tr>
		);

		const out = (
			<Fragment>
				{ content }
				<CompanyItemChart isOpen={this.state.isChart} item={item} />
			</Fragment>
		);

		return (<Fragment>{ out }</Fragment>);
	}
}

export default CompanyItem;