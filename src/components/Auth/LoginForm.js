import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTION_MENU, SET_ACTION, SET_LOGIN, TRY_LOGIN} from "../../services/game.service";
import config from "../../config/config";

function mapStateToProps(state) {
    return {
        login: state.Game.login,
        error: state.Game.lastFormError,
    };
}

class LoginForm extends Component {
    render() {
        const { dispatch, login, error } = this.props;

        return (
            <div className="game-menu form login-form">
                <div className="group">
                    <label htmlFor={"email"}>Correo electronico</label>
                    <input id={"email"}
                           value={login.username}
                           onChange={((e) => dispatch({type: SET_LOGIN, payload: { username: e.target.value }}))}
                           type={"text"} placeholder={"Su correo electronico"}/>
                </div>
                <div className="group">
                    <label htmlFor={"password"}>Contrasena</label>
                    <input id={"password"}
                           value={login.password}
                           onChange={((e) => dispatch({type: SET_LOGIN, payload: { password: e.target.value }}))}
                           type={"password"} placeholder={"Su contrasena"}/>
                </div>
                <div className="group error-text">{config.errorMessages[error] || ''}</div>
                <div className="button-group">
                    <div className="button gray" onClick={(() => dispatch({type: SET_ACTION, payload: ACTION_MENU}))}>Volver</div>
                    <div className="button" onClick={(() => dispatch({type: TRY_LOGIN}))}>Entrar</div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(LoginForm);