import React, {Component} from 'react';

class NaverBankItem extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props;
    }

    render() {
        const item = this.props;
        const val = Object.values(item.item.items).map((val,idx) => (
            <React.Fragment key={idx}>
                <td className="text-right">{ val.mobileCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</td>
                <td className="text-right">{ val.pcCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</td>
            </React.Fragment>
        ))
        return (
            <tr>
                <td>{item.item.title}</td>
                {val}
            </tr>
        );
    }
}

export default NaverBankItem;