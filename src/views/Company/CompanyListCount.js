import React, {Component, Fragment} from 'react';

class CompanyListCount extends Component {

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextProps !== this.props;
	}

	render() {
		const out = (
			<div className="row">
				<div className="col-sm-12">
					<div className="row">
						<div className="col-sm-3">
							<div className="callout callout-warning">
								<small className="text-muted">검색결과</small> <br />
								<strong className="h4">
									123,456{/* //FIXME {{number_format($companies ? $companies->total() : 0)}}*/}
								</strong>
								<div className="chart-wrapper">
									<canvas id="sparkline-chart-1" width="100" height="30"> </canvas>
								</div>
							</div>
						</div> 
						<div className="col-sm-3">
							<div className="callout callout-info">
								<small className="text-muted">총 개수</small> <br />
								<strong className="h4">
									789,123{/* //FIXME {{number_format($summary['total'])}}*/}
								</strong>
								<div className="chart-wrapper">
									<canvas id="sparkline-chart-1" width="100" height="30"> </canvas>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);

		return (<Fragment>{ out }</Fragment>);
	}
}

export default CompanyListCount;