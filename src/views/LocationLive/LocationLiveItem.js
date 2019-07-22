import React, {Component} from 'react';

class LocationLiveItem extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props;
    }

    render() {
        const { item } = this.props; //console.log(item);
        const vals = Object.values(item[1]).map((val, idx) => (
            <td key={idx} className="text-right">{ val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</td>
        ));
        return (
            <tr>
                <td className="text-center">{item[0]}</td>
                {vals}
            </tr>
        );
    }
}

export default LocationLiveItem;