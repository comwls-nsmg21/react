import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import Const from '../Common/Const';

const SELECTOR_PREFIX = 'ChartLine_';

class ChartLine extends Component {

	constructor(props) {
		super(props);
		this.selector = SELECTOR_PREFIX + this.props.id;
	}

	static defaultProps = {
		height: '',
		id: 0,
		item: {
			ids: ['foo', 'bar'],
			keys: ['Red', 'Blue', 'Yellow', 'Green',],
			titile:  '',
			values: [[12, 19, 3, 5,], [3, 5, 7, 9]],
			beginAtZero : 'false',
		},
	};

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextProps !== this.props;
	}

	render() {
		const { ids, keys, title, values, beginAtZero } = this.props.item;
		const data = ids.map((val, key) => {
			const color = Const.COLORS[Math.floor(Math.random() * Const.COLORS.length)];
			return {
				backgroundColor: color,
				borderColor: color,
				borderWidth: 1,
				data: values[key],
				fill: false,
				label: val,
				lineTension: 0.1,
			};
		}); 

        const line = {
            labels: keys,
			datasets: data,
        };
        const options = {
            legend: { position: 'bottom', },
				responsive: true,
				hoverMode: 'index',
				stacked: false,
				title:{
					display:true,
					text: title
				},
				scales: {
					xAxes: [{
						gridLines: { display: false, },
					}],
					yAxes: [{
						gridLines: { display: false, },
						ticks: {
							beginAtZero: beginAtZero,
							callback: function(val) { if(Number.isInteger(val)) return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); },
							stepSize: Math.round(Math.max(data) / 5),
						},
						type: 'linear',
						display: true,
					}]
				}
        }
		return (
			<Line id={this.selector} data={line} options={options} height={ this.props.height } />
		);
	}
}

export default ChartLine;