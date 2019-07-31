import React, {Component} from 'react';
import { Pie } from 'react-chartjs-2';
import Const from '../Common/Const'

const SELECTOR_PREFIX = 'ChartPie_';

class ChartPie extends Component {

	constructor(props) { //console.log(props);
		super(props);
		this.selector = SELECTOR_PREFIX + this.props.id;
	}

	static defaultProps = {
		id: 0,
		item: {
			keys: ['Red', 'Blue', 'Yellow', 'Green',],
			legend: { position: null, },
			titile:  '',
			values: [12, 19, 3, 5,],
		},
	};

	
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextProps !== this.props;
	}

	render() {
		const { keys, legend, title, values  } = this.props.item;

        const pie = {
            labels: keys,
			datasets: [{
				label: title,
				data: values,
				backgroundColor: Const.COLORS,
				borderColor: Const.COLORS,
				borderWidth: 0,
			}]
        };
        const options = {
            legend: {
				position: (typeof legend === "undefined") ? 'bottom' : legend.position,
			},
			scales: {
				yAxes: [{
					display: false,
					gridLines: {
						display: false,
					}, 
				}],
			}
        }
		return (
			<div id="chartbox">
				<Pie id={this.selector} data={pie} options={options} />
			</div>
		);
	}
}

export default ChartPie;