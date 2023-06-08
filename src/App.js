import React, {Component} from 'react';
import {connect} from 'react-redux';
import './styles/styles.css'
import Game from "./components/Game/Game";
import moment from "moment";
import {
    ACTION_BLACK, ACTION_CONFIRM, ACTION_EMOJI, ACTION_GAME, ACTION_LOGIN,
    ACTION_MENU, ACTION_REGISTER,
    ACTION_START,
    ACTION_WINNER,
    getGanador, SET_ACTION,
    SET_USER, TRY_LOGOUT
} from "./services/game.service";
import {Auth} from 'aws-amplify';
import Menu from "./components/Auth/Menu";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import ConfirmForm from "./components/Auth/ConfirmForm";
import MenuPlayer from "./components/Auth/MenuPlayer";

function mapStateToProps(state) {
    return {
        history: state.Game.history,
        actionStep: state.Game.actionStep,
        user: state.Game.user,
    };
}

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        Auth.currentAuthenticatedUser().then((user)=>{
            dispatch({type: SET_USER, payload: user.attributes});
        }).catch((err) => {
            dispatch({type: SET_ACTION, payload: ACTION_MENU})
        })
    }

    render() {
        const { dispatch, history, actionStep, user } = this.props;

        return (
            <div className="App">
              <div className="game-area">
                  {actionStep === ACTION_MENU && <Menu dispatch={dispatch} />}
                  {actionStep === ACTION_LOGIN && <LoginForm dispatch={dispatch} />}
                  {actionStep === ACTION_REGISTER && <RegisterForm dispatch={dispatch} />}
                  {actionStep === ACTION_CONFIRM && <ConfirmForm dispatch={dispatch} />}
                  {[ACTION_START,ACTION_GAME,ACTION_BLACK,ACTION_WINNER,ACTION_EMOJI].indexOf(actionStep) !== -1 &&
                  <div>
                      <div className="user-panel">
                          <span>Hola, {user.given_name}</span>
                          <div onClick={(() => dispatch({type: TRY_LOGOUT}))}>Logout</div>
                      </div>

                      {(history || []).length > 0 && <div className={"settings"}>
                          <table className={"history-table"}>
                              <thead>
                                  <tr>
                                      <th>Cuando</th>
                                      <th>E-mail</th>
                                      <th>Ganador</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {(history || []).map(row =>
                                      <tr key={row.id}>
                                          <td>{moment(row.createdAt).fromNow()}</td>
                                          <td>{row.email}</td>
                                          <td>{getGanador(row.ganador)}</td>
                                      </tr>
                                  )}
                              </tbody>
                          </table>
                      </div>}
                      {actionStep === ACTION_START && <MenuPlayer dispatch={dispatch} />}
                      {[ACTION_GAME,ACTION_BLACK,ACTION_WINNER,ACTION_EMOJI].indexOf(actionStep) !== -1 && <Game dispatch={dispatch}/>}
                  </div>}
              </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(App);