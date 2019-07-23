import React, {Component, Fragment} from 'react';
import axios from 'axios';

import CompanyItem from "./CompanyItem";
import CompanyListFilter from "./CompanyListFilter";
import ChartBar from "../Chart/ChartBar";
import ChartPie from "../Chart/ChartPie";
import $ from 'jquery'
import ReactPaginate from 'react-paginate';
import BarChart from '../Common/Chart/BarChart';


class CompanyList extends Component {
    constructor(props) { //console.log(props);
        super(props);
        this.api = {
            'coms.index': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/companies',
            'coms.indexTop': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/companies/top',
            'coms.indexStatsAmount': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/companies/amount/stats',
            'coms.indexStatsCat': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/companies/category/stats',
            'coms.indexStatsEmpl': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/companies/employee/stats',
            'coms.indexStatsTop': 'http://pinfin-dev.koreasouth.cloudapp.azure.com/api/companies/top/stats',
        };
    }

    state = {
        coms: [],
        cond: { page: 1, },
        pagination: {},
        statsAmount: [],
        statsCat: {},
        statsEmpl: [],
        statsTop: {},
        amt:[],
        sort: false,
    };
    componentWillMount() {

    }
    componentDidMount() {
        (this.isPageCom()) ? this.getStats() : this.getStatsTop();
        this.getComs();

    }


    getComs = () => { //console.log(this.state.cond);
        const isPageCom = this.isPageCom();
        const api = (isPageCom) ? this.api["coms.index"] : this.api["coms.indexTop"];
        axios.get(api, {
            params: this.state.cond,
        }).then(res => { //console.log(res.data.data.items);
            this.setState({ coms: ((isPageCom) ? res.data.data.items : res.data.data) });
            (isPageCom) && this.setState({ pagination: res.data.data.pagination });
        }).catch(err => { console.log(err); });
    };

    getStats = () => {
        const getAmount = () => axios.get(this.api["coms.indexStatsAmount"]);
        const getCat = () => axios.get(this.api["coms.indexStatsCat"]);
        const getEmpl = () => axios.get(this.api["coms.indexStatsEmpl"]);
        axios.all([getAmount(), getCat(), getEmpl()]).then(axios.spread((resAmount, resCat, resEmpl) => { //console.log(resAmount.data.data);
            this.setState({ statsAmount: resAmount.data.data, statsCat: resCat.data.data, statsEmpl: resEmpl.data.data, });
        })).catch(err => { console.log(err); });
    };

    getStatsTop = () => {
        axios.get(this.api["coms.indexStatsTop"], {
        }).then(res => { //console.log(res.data.data);
            this.setState({ statsTop: res.data.data });
        }).catch(err => { console.log(err)
        }).finally(() => { /* console.log(this.state) */ });
    };

    handleChartDisplay = () => {
        let areaChart = $('#area_chart');
        const display = (areaChart.css('display') === 'none') ? 'flex' : 'none';
        areaChart.css('display', display);
    };

    handleSearch = (cond) => { //console.log(cond);
        let pm = new Promise(resolve => {
            this.setState({ cond: cond });
            resolve();
        });
        pm.then(() => { this.getComs(); });
    };

    isPageCom = () => (this.props.location.pathname === "/Company");



    handleSortToggle1 = () => {
        const coms = this.state.coms;
        const currentState = this.state.sort;
        this.setState({ sort: !currentState });

        const compare = (a, b) => {
            return a.countSubscriber < b.countSubscriber ? -1 : a.countSubscriber > b.countSubscriber ? 1 : 0;
        };
        let sort = currentState ? coms.reverse(compare) : coms.sort(compare);

        let pm = new Promise(resolve => {
            this.setState({coms: sort});
            resolve();

        });
        pm.then(() => { //console.log(this.state.banks);
            return this.state.coms
        });
    };
    handleSortToggle2 = () => {
        const coms = this.state.coms;
        const currentState = this.state.sort;
        this.setState({ sort: !currentState });

        const compare = (a, b) => {
            return a.salaryTotal < b.salaryTotal ? -1 : a.salaryTotal > b.salaryTotal ? 1 : 0;
        };
        let sort = currentState ? coms.reverse(compare) : coms.sort(compare);

        let pm = new Promise(resolve => {
            this.setState({coms: sort});
            resolve();

        });
        pm.then(() => { //console.log(this.state.banks);
            return this.state.coms
        });
    };
    handleSortToggle3 = () => {
        const coms = this.state.coms;
        const currentState = this.state.sort;
        this.setState({ sort: !currentState });

        const compare = (a, b) => {
            return a.salaryAvg < b.salaryAvg ? -1 : a.salaryAvg > b.salaryAvg ? 1 : 0;
        }
        let sort = currentState ? coms.reverse(compare) : coms.sort(compare);

        let pm = new Promise(resolve => {
            this.setState({coms: sort});
            resolve();

        });
        pm.then(() => { //console.log(this.state.banks);
            return this.state.coms
        });
    };

    handlePageClick = (coms) => {
        console.log(this.state.cond)
        let pm = new Promise(resolve => {
            this.setState({
                cond: {
                    page: Number(Object.values(coms)) + 1
                }
            })
            resolve();
        });
        pm.then(() => { this.getComs() });
        console.log(this.state.pagination);
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    render() {//console.log(this.props.location.pathname)
        const { coms, statsAmount, statsCat, statsEmpl, statsTop, pagination } = this.state;
        const isNotEmpty = ((coms.length > 0) && ((statsAmount.length > 0) || (Object.keys(statsCat).length > 0) || (statsEmpl.length > 0) || (Object.keys(statsTop).length > 0) ));
        const isNotEmptyPag = Object.keys(pagination).length > 0;
        //console.log(this.state); console.log(isNotEmpty);

        const charts = ((isNotEmpty) && (this.isPageCom())) && (
            <div id="area_chart" style={{'width':'100%', 'display':'none','flexFlow':'row','paddingRight':'2%','boxSizing':'border-box', 'marginBottom': '2%', 'marginTop': '40px', }}>
                <div style={{'flexBasis':'30%'}}>
                    <h2 className="chart-title" style={{'fontSize': 17,'textAlign':'center' }}>국민연금 가입자수 기준 사업장 수</h2>
                    <ChartPie id={1} item={{
                        keys: statsEmpl.map(obj => (obj.label)).reverse(),
                        legend: { position: 'right' },
                        title: '국민연금 가입자수 기준 사업장 수',
                        values: statsEmpl.map(obj => (obj.count)).reverse(),
                    }} />
                </div>
                <div style={{'flexBasis':'30%','marginRight':'5%','marginLeft':'5%'}}>
                    <h2 className="chart-title" style={{'fontSize': 17,'textAlign':'center'  }}>고지금액 기준 사업장 수</h2>
                    <ChartPie id={2} item={{
                        keys: statsAmount.map(obj => (obj.label)).reverse(),
                        legend: { position: 'right' },
                        title: '고지금액 기준 사업장 수',
                        values: statsAmount.map(obj => (obj.count)).reverse(),
                    }} />
                </div>
                <div style={{'flexBasis':'30%'}}>
                    <h2 className="chart-title" style={{'fontSize': 17,'textAlign':'center'}}>업종 기준 사업장</h2>
                    <ChartBar id={3} item={{
                        keys: Object.keys(statsCat).reverse(),
                        title: '업종 기준 사업장 수',
                        values: Object.values(statsCat).reverse(),
                    }} />
                </div>
            </div>
        );

        const chartsTop = ((isNotEmpty) && (!(this.isPageCom()))) && (
            <div id="area_chart" style={{ 'width': '100%', 'display':'none','flexFlow':'row','paddingRight':'2%','boxSizing':'border-box' }}>
                <div style={{'width':'47%','marginRight':'6%'}}>
                    <h2 className="chart-title" style={{'fontSize': 17,'textAlign':'center' }}>17개 시도별 사업장 수</h2>
                    <BarChart item={{
                        keys: Object.keys(statsTop.sido), //['서울', '부산', '인천', '제주'],
                        title: '',
                        values: Object.values(statsTop.sido), //[12, 5, 3, 2],
                    }} />
                </div>
                <div style={{'width':'47%'}}>
                    <h2 className="chart-title" style={{'fontSize': 17,'textAlign':'center' }}>사업자 업종별 사업장 비율</h2>
                    <BarChart item={{
                        keys: Object.keys(statsTop.category), //['제조', '도매', '소매', '운수'],
                        title: '',
                        values: Object.values(statsTop.category), //[3, 2, 5, 12],
                    }} />
                </div>
            </div>
        );

        const contentHead = (
            <div className="card-header">
                <div className="float-left mt-2"><i className="fa fa-building"> </i> { (this.isPageCom()) ? '사업장 검색' : 'Top 100' } </div>
                <div className="float-right">
                    <button onClick={this.handleChartDisplay} className="btn btn-outline-primary" style={{ width: '120px' }}>그래프 보기</button>
                </div>
            </div>
        );

        const items = (Array.isArray(coms)) && coms.map((com, idx) => (
            <CompanyItem key={com.company_id} item={com} page={this.props.location.pathname} idx={idx + 1} />
        ));
        const contentItems = (
            <table className="table table-responsive-sm table-hover table-outline mb-0 table-bordered">
                <thead className="thead-light">
                <tr>
                    { (!(this.isPageCom())) && <th className="text-center btn-change-sort" data-key="id" data-value="">순위 <i className="fa fa-fw d-none" id="sort_id"> </i></th> }
                    {/* <th className="text-center">형태</th> */}
                    <th className="text-center">사업장명</th>
                    <th className="text-center">주소</th>
                    <th className="text-center">위치</th>
                    <th className="text-center btn-change-sort" onClick={this.handleSortToggle1} style={{'cursor': 'pointer'}} data-key="count_subscriber">사원수 <i className='fa fa-sort fa-sm'></i></th>
                    <th className="text-center" onClick={this.handleSortToggle2} style={{'cursor': 'pointer'}}>총 급여액 <i className='fa fa-sort fa-sm'></i></th>
                    <th className="text-center" onClick={this.handleSortToggle3} style={{'cursor': 'pointer'}}>평균 급여액 <i className='fa fa-sort fa-sm'></i></th>
                    <th className="text-center">사업장업종</th>
                    {/* <th className="text-center">사업자등록번호</th>
						<th className="text-center">작업</th> */}
                </tr>
                </thead>
                <tbody>{ items }</tbody>
            </table>
        );

        const content = (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            { contentHead }
                            <div className="card-body">
                                {/*<CompanyListCount />*/}
                                { (this.isPageCom()) && <CompanyListFilter onSearch={this.handleSearch} /> }
                                { (this.isPageCom()) ? charts : chartsTop }
                                { (this.isPageCom()) && <hr /> }
                                { contentItems }
                                <nav style={{'marginTop': 25}}>
                                    { (isNotEmptyPag) && <ReactPaginate
                                        previousLabel={'<'}
                                        nextLabel={'>'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={this.state.pagination.maxPerPage}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.handlePageClick}
                                        containerClassName={'pagination justify-content-center'}
                                        pageClassName={'page-item'}
                                        pageLinkClassName={'page-link'}
                                        previousLinkClassName={'page-link'}
                                        nextLinkClassName={'page-link'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                    />}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return ( <Fragment> { content } </Fragment> );
    }
}

export default CompanyList;
