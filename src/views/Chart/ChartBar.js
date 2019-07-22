import React, {Component} from 'react';
import { Bar } from 'react-chartjs-2';
import Const from '../Common/Const'


const SELECTOR_PREFIX = 'ChartBar_';

class ChartBar extends Component {

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

    

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.chart !== this.props.chart;
    }

    render() {
        const { keys, title, values } = this.props.item;

        const bar = {
            labels: keys,
            datasets: [{
                label: title,
                data: values,
                backgroundColor: Const.COLORS,
                borderColor: Const.COLORS,
                borderWidth: 1,
            }]
        };
        const options = {
            legend: {
                display: false, //(title !== ''),
            },
            scales: {
                xAxes: [{
                    gridLines: { display: false, },
                }],
                yAxes: [{
                    ticks: { beginAtZero: true },
                    gridLines: { display: false, },
                }]
            }
        }
        return (
            <div id="chartbox">
                <Bar id={this.selector} data={bar} options={options} />
            </div>
        );
    }
}

export default ChartBar;