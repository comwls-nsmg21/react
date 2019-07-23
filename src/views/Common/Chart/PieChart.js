import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

class PieChart extends Component {
    static defaultProps = {
        id: 0,
        item: {
            keys: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            values: [
                ['Apples', 29.9, false],
                ['Pears', 71.5, false],
                ['Oranges', 106.4, false],
                ['Plums', 129.2, false],
                ['Bananas', 144.0, false],
                ['Peaches', 176.0, false],
                ['Prunes', 135.6, true, true],
                ['Avocados', 148.5, false]
            ]
        },
    };
    render() {
        const { values } = this.props.item;
        
        const config = {
            chart: {
                styledMode: true
            },
            title: false,
            series: [{
                type: 'pie',
                allowPointSelect: true,
                keys: ['name', 'y', 'selected', 'sliced'],
                data: values,
                showInLegend: true
            }],
            credits: {
                enabled: false,
            }
        };
        return (
            <>
                <ReactHighcharts config = {config}></ReactHighcharts>
            </>
        );
    }
}

export default PieChart;