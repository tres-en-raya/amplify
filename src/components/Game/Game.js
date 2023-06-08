import React, {Component} from 'react';
import {connect} from 'react-redux';
import Row from "./Row";
import {
    ACTION_BLACK,
    ACTION_EMOJI,
    ACTION_WINNER,
    PLAYER_WIN,
    ROBOT_WIN, SET_RESET,
    UNKNOWN_WIN
} from "../../services/game.service";
import config from "../../config/config";
import { Fireworks } from 'fireworks-js'
import SadGif from '../../styles/svg/sad.gif';

function mapStateToProps(state) {
    return {
        winner: state.Game.winner,
        actionStep: state.Game.actionStep,
    };
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.fireworks = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.actionStep === ACTION_WINNER && this.props.actionStep === ACTION_EMOJI && this.props.winner === PLAYER_WIN) {
            const fireworks = new Fireworks(this.fireworks.current, { /* options */ })
            fireworks.start()
        } else {
            if (this.props.actionStep !== ACTION_EMOJI) {
                this.fireworks.current.innerHTML = '';
            }
        }
    }
    render() {
        const { dispatch, winner, actionStep } = this.props;

        return (
            <div className="playfield">
                <div className="rows-border"/>
                <div className="cols-border"/>
                <table>
                    <tbody>
                        <Row dispatch={dispatch} index={0}/>
                        <Row dispatch={dispatch} index={1}/>
                        <Row dispatch={dispatch} index={2}/>
                    </tbody>
                </table>
                <div className={"win-background " + ([ACTION_BLACK, ACTION_WINNER, ACTION_EMOJI].indexOf(actionStep) !== -1 ? 'active' : '')}>
                    <div ref={this.fireworks}/>
                    {[ROBOT_WIN, UNKNOWN_WIN].indexOf(winner) !== -1 && <img alt={"sad-emoji"} src={SadGif}/>}
                </div>
                <div className={"win-message "  + ([ACTION_WINNER, ACTION_EMOJI].indexOf(actionStep) !== -1 ? 'active' : '')}>
                    {winner === PLAYER_WIN && <div>{config.messageGanado}</div>}
                    {winner === ROBOT_WIN && <div>{config.messagePerdido}</div>}
                    {winner === UNKNOWN_WIN && <div>{config.messageDesconocido}</div>}
                    <div className={"new-game-link"} onClick={(() => dispatch({type: SET_RESET}))}>{config.messageNuevo}</div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Game);