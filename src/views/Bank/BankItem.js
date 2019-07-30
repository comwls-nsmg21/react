import React, {Component} from 'react';

class BankItem extends Component {

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextProps !== this.props;
	}

	render() {
		const { item, idx } = this.props; //console.log(item);
		const vals = item.map((val, idx) => {
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
						<span className="block">{ val.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</span>
						{ (val.amount !== 0) && <span className="block">({ val.amount })</span>}
					</span>
					{Icon}
				</td>
			)
		});

		return (
			<tr>
				<td className="text-center">{ idx }</td>
				<td className="text-center">{item[0].company}</td>
				{ vals }
			</tr>
		);
	}
}

export default BankItem;