import React, {Component, Fragment} from 'react';
import Chart from 'chart.js'
import axios from 'axios';

class CompanyItemChart extends Component {

	state = {
		isOpen: false,
	};

	drawChart = (id, data) => { console.log(data);
		var ctx = document.getElementById('chart_canvas_' + id).getContext('2d');
		window.myLine = new Chart(ctx, {
			type: 'line',
			data: data, //chartDataGet(id), //lineChartData,
			options: {
				legend: { position: 'bottom', },
				responsive: true,
				hoverMode: 'index',
				stacked: false,
				//title: { display: true, text: 'Chart.js Line Chart - Multi Axis' },
				scales: {
					xAxes: [{
						gridLines: { display: false, },
					}],
					yAxes: [{
						ticks: {
							callback: function(val) { if(Number.isInteger(val)) return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); },
							stepSize: Math.round(Math.max(data) / 5),
						},
						type: 'linear',
						display: true,
						position: 'left',
						id: 'y-axis-1',
					}, {
						//ticks: { min: 0, max: 15, stepSize: 5, },
						ticks: {
							callback: function(val) { if(Number.isInteger(val)) return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); },
							stepSize: Math.round(Math.max(data) / 5),
						},
						type: 'linear',
						display: true,
						position: 'right',
						id: 'y-axis-2',
						gridLines: {
							drawOnChartArea: false,
						},
					}],
				}
			}
		});
	};

	getChartData = () => { //console.log('getChartData');
		let id = this.props.item.company_id;
		axios.get('http://pinfin-dev.koreasouth.cloudapp.azure.com/api/locations/stats/company/months', { params: { 'companyId': id, },
		}).then(res => { //console.log(res);
			let data = res.data.data[id];
			let lineChartData = {
				labels: data.label,
				datasets: [{
					lineTension: 0.1,
					label: '월 고지금액',
					borderColor: window.chartColors.blue,
					backgroundColor: window.chartColors.blue,
					fill: false,
					yAxisID: 'y-axis-1',
					data: data.amount,
				}, {
					label: '종업원 수',
					borderColor: window.chartColors.red,
					backgroundColor: window.chartColors.red,
					fill: false,
					yAxisID: 'y-axis-2',
					data: data.countSubscriber,
				}]
			};
			this.drawChart(id, lineChartData);
		}).catch(err => { console.log(err);
		}).finally(() => {});
	};

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({ isOpen: nextProps.isOpen });
		if(nextProps.isOpen) try { this.getChartData(); } catch (e) {}
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextProps !== this.props;
	}

	render() { //console.log(this.state.isOpen);chart-area
		const { item } = this.props;
		const out = (
			<tr className="chart-area-wrap" style={{'display': (this.state.isOpen) ? '' : 'none'}}>
				<td className="chart-area-com" colSpan="8">
					<canvas id={`chart_canvas_` + item.company_id} height="50px"> </canvas>
				</td>
			</tr>
		);

		return (<Fragment>{ out }</Fragment>);
	}
}

export default CompanyItemChart;