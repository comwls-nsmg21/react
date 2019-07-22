import React, {Component} from 'react';
import Chart from 'chart.js';
import Const from '../Common/Const';

const SELECTOR_PREFIX = 'ChartHorizontalBar__';

class ChartHorizontalBar extends Component {

	constructor(props) {
		super(props);
		this.selector = SELECTOR_PREFIX + this.props.id;
	}

	static defaultProps = {
		id: 0,
		item: {
			keys: ['Red', 'Blue', 'Yellow', 'Green',],
			titile:  '',
			values: [12, 19, 3, 5,],
		},
	};

	componentDidMount() {
		this.setChartHorizontalBar();
	}

	setChartHorizontalBar = () => {
		const { keys, title, values } = this.props.item;
		let ctx = document.getElementById(this.selector).getContext('2d');
		let myBarHorizontalChart  = new Chart(ctx, {
			type: 'horizontalBar',
			data: {
				labels: keys,
				datasets: [{
					label: '# of Votes',
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: Const.COLORS,
					borderColor: Const.COLORS,
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	};

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextProps !== this.props;
	}

	render() {
		return (
			<canvas id={this.selector}> </canvas>
		);
	}
}

export default ChartHorizontalBar;