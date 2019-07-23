import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

class BarChart extends Component {
    static defaultProps = {
        id: 0,
        item: {
            keys: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            values: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4],
        },
    };
    render() {
        const { keys, values } = this.props.item;

        const config = {
            chart: {
                type: 'column'
            },
            title: false,
            xAxis: {
                categories: keys
            },
            yAxis: {
                allowDecimals: false,
                min: 0,
                title: false
            },
            series: [{
                data: values
            }],
            colorByPoint: true,
            legend: {
                enabled: false
            },
        };
        return (
            <div>
                <ReactHighcharts config = {config}></ReactHighcharts>
            </div>
        );
    }
}

export default BarChart;