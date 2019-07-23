import React, {Component} from 'react';
import axios from 'axios';
import LocationLiveItem from './LocationLiveItem'
import ChartLine from "../Chart/ChartLine";
import $ from 'jquery'
import LineChart from '../Common/Chart/LineChart';
class LocationLive extends Component {
    constructor(props) {
        super(props);
        this.api = {
            'banks.live': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/banks/location/lives'
        };
    }

    state = {
        banks: {
            items:[],
            label:[],
            total:[]
        }
    };


    getBanksLocation = () => {
        axios.get(this.api["banks.live"], {
        }).then(res => { //console.log(res.data.data);
            this.setState({ banks: res.data.data });
        }).catch(err => { console.log(err)
        }).finally(() => { /* console.log(this.state) */ });
    };

    handleChartDisplay = () => {
        let areaChart = $('#area_chart');
        const display = (areaChart.css('display') === 'none') ? 'flex' : 'none';
        areaChart.css('display', display);
    };
    componentDidMount() {

    }

    componentWillMount() {
        this.getBanksLocation();

    };
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    render() {
        const { banks } = this.state;
        const isNotEmpty = (Object.keys(banks.label).length > 0); console.log(isNotEmpty);

        //if(!isNotEmpty) return(<Fragment></Fragment>);
        console.log(banks);
        const contentHead = (
            <div className="card-header">
                <div className="float-left mt-2"><i className="fa fa-building"> </i> 위치기반 라이브 </div>
                <div className="float-right">
                    <button onClick={this.handleChartDisplay} className="btn btn-outline-primary" style={{ width: '120px' }}>그래프 보기</button>
                </div>
            </div>
        );

        const chart = (isNotEmpty) && (
            <div id="area_chart" style={{'width':'100%', 'display':'none','flexFlow':'row','paddingRight':'2%','boxSizing':'border-box', 'marginBottom': '2%', 'marginTop': '40px', }}>
                {/*<h2 style={{ 'marginBottom':10,'fontSize': 20,'textAlign':'center' }}>위치기반 일별 라이브</h2>
                <ChartLine id={1} item={{
                    ids: Object.entries(banks.items).map(bank => bank[0]),
                    keys: Object.keys(banks.label).map(key => banks.label[key]),
                    values: Object.entries(banks.items).map(bank => Object.values(bank[1])),
                    hegiht: '50px',
                    beginAtZero: 'true'
                }}
                />
                */}
            </div>
        );

        const items = (isNotEmpty) && (Object.entries(banks.items).map((bank, idx) => {
            return <LocationLiveItem key={idx} item={bank} />
        }));
        const contentItems = (isNotEmpty) && (
            <table className="table table-responsive-sm table-hover table-outline mb-0 table-bordered">
                <thead className="thead-light">
                <tr>
                    <th className="text-center">구분</th>
                    { banks.label.map((val,i) => (<th key={ i } className="text-center">{ val }</th>)) }
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>
        );
        return (
            <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                {contentHead}
                                <div className="card-body">
                                    <LineChart items={{
                                        keys: banks,
                                    }} />
                                    {chart}
                                    <hr />
                                    {contentItems}
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
export default LocationLive;