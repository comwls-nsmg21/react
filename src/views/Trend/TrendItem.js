import React, {Component} from 'react';

class TrendItem extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props;
    }

    render() {
        const item = this.props;
        const dates = item.item.dates;
        const val = dates.map((val,idx) => {    //switch 함수 임시
            
            const Icon = (()=>{
				switch(val.mobile.trend){
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
                    <td className="text-right">{ val.mobile.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } {Icon}</td>
                    <td className="text-right">{ val.pc.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } {Icon}</td>
                    <td className="text-right">{ val.total.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } {Icon}</td>
                </React.Fragment>
            )
        })
        return (
            <tr>
                <td className="text-center">{item.idx}</td>
                <td>{item.item.name}</td>
                {val}
            </tr>
        );
    }
} 

export default TrendItem;