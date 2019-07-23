import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

class LineChart extends Component {
    static defaultProps = {
        id: 0,
        item: {
            keys: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            values: [{
                name: 'Installation',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
                name: 'Manufacturing',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }, {
                name: 'Sales & Distribution',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
                name: 'Project Development',
                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
                name: 'Other',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            }],
        },
    };
    render() {
        const { keys, values } = this.props.item;
        console.log(keys)
        const config = {
            title: false,
        
            subtitle: false,

            xAxis: {
                categories: keys
            },
            
            yAxis: {
                title: false
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    //enableMouseTracking: false
                }
            },
        
            series: values,
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        };
        return (
            <>
                <ReactHighcharts config = {config}></ReactHighcharts>
            </>
        );
    }
}

export default LineChart;