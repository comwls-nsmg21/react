import React, {Component} from 'react';

class TrendItemKeyword extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props;
    }

    render() {
        const item = this.props;
        const dates = item.item.dates;
        const val = dates.map((val,idx) => {    //switch 함수 임시
            const Icon1 = (()=>{
				switch(val.mobile_trend){
					case 'up':
						return (<span className="tri-ico" style={{'color':'red'}}>▲</span>);
					case 'down':
						return (<span className="tri-ico" style={{'color':'blue'}}>▼</span>);
					default:
						break;
                }
            })();
            const Icon2 = (()=>{
				switch(val.pc_trend){
					case 'up':
						return (<span className="tri-ico" style={{'color':'red'}}>▲</span>);
					case 'down':
						return (<span className="tri-ico" style={{'color':'blue'}}>▼</span>);
					default:
						break;
                }
            })();
            const Icon3 = (()=>{
				switch(val.total_trend){
					case 'up':
						return (<span className="tri-ico" style={{'color':'red'}}>▲</span>);
					case 'down':
						return (<span className="tri-ico" style={{'color':'blue'}}>▼</span>);
					default:
						break;
                }
			})();
            return (
                <React.Fragment key={idx}>
                    <td className="text-right">{ val.mobile_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } {Icon1}</td>
                    <td className="text-right">{ val.pc_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } {Icon2}</td>
                    <td className="text-right">{ val.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } {Icon3}</td>
                </React.Fragment>
            )
        })
        return (
            <tr>
                <td className="text-center">{item.idx}</td>
                <td>{item.item.name}</td>
                <td>{item.item.parent}</td>
                {val}
            </tr>
        );
    }
} 

export default TrendItemKeyword;