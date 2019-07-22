import React, {Component} from 'react';

class BankItem extends Component {

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextProps !== this.props;
	}

	render() {
		const { item, page, rowspan } = this.props; //console.log(item);
		const isService = page.pathname === '/BankListService';
		//console.log(page.pathname)
		const vals = item.items.map((val, idx) => (
			<td key={idx} className="text-right">{ val.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</td>
		));

		return (
			<tr>
				{ (isService) ? ((rowspan > 0) && <td className="text-center" rowSpan={rowspan}>{ item.bankName }</td>) : <td className="text-center" >{ item.title }</td> }
				{ isService && <td className="text-center">{ item.serviceName }</td> }
				{ vals }
			</tr>
		);
	}
}

export default BankItem;