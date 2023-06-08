import React, {Component} from 'react';
import Cell from "./Cell";

class Row extends Component {
    render() {
        const { dispatch } = this.props;

        return (
            <tr>
                <Cell dispatch={dispatch} index={this.props.index + '/0'}/>
                <Cell dispatch={dispatch} index={this.props.index + '/1'}/>
                <Cell dispatch={dispatch} index={this.props.index + '/2'}/>
            </tr>
        );
    }
}

export default Row;