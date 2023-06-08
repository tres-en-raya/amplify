import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTION_LOGIN, ACTION_REGISTER, SET_ACTION} from "../../services/game.service";

function mapStateToProps(state) {
    return {};
}

class Menu extends Component {
    render() {
        const { dispatch } = this.props;

        return (
            <div className={"game-menu"}>
                <div>
                <div className="button" onClick={(() => dispatch({type: SET_ACTION, payload: ACTION_LOGIN}))}>Iniciar session</div>
                <div className="button" onClick={(() => dispatch({type: SET_ACTION, payload: ACTION_REGISTER}))}>Crear la cuenta</div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Menu);