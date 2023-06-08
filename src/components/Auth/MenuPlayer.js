import React, {Component} from 'react';
import {connect} from 'react-redux';
import {START_GAME} from "../../services/game.service";

function mapStateToProps(state) {
    return {};
}

class MenuPlayer extends Component {
    render() {
        const { dispatch } = this.props;

        return (
            <div className={"game-menu"}>
                <div>
                <div className="button" onClick={(() => dispatch({ type: START_GAME, payload: 1 }))}>Jugar como X</div>
                <div className="button" onClick={(() => dispatch({ type: START_GAME, payload: 0 }))}>Jugar como 0</div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(MenuPlayer);