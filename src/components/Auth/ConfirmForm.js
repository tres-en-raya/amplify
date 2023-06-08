import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTION_MENU, SET_ACTION, SET_LOGIN, TRY_CONFIRM} from "../../services/game.service";
import config from "../../config/config";

function mapStateToProps(state) {
    return {
        login: state.Game.login,
        error: state.Game.lastFormError,
    };
}

class ConfirmForm extends Component {
    render() {
        const { dispatch, login, error } = this.props;

        return (
            <div className={"game-menu form confirm-form"}>
                <div className={"group"}>
                    <label className={"confirm-label"} htmlFor={"password"}>El código de la verificación</label>
                    <p>Por favor mira su correo electrónico</p>
                    <input id={"password"}
                           value={login.verify}
                           onChange={((e) => dispatch({type: SET_LOGIN, payload: { verify: e.target.value }}))}
                           type={"password"} placeholder={"Código"}/>
                </div>
                <div className={"group error-text"}>{config.errorMessages[error] || ''}</div>
                <div className="button-group">
                    <div className="button gray" onClick={(() => dispatch({type: SET_ACTION, payload: ACTION_MENU}))}>Volver</div>
                    <div className="button" onClick={(() => dispatch({type: TRY_CONFIRM}))}>Aceptar el código</div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ConfirmForm);