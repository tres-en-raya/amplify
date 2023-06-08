import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CHANGE_CELL} from "../../services/game.service";

function mapStateToProps(state) {
    return {
        currentGame: state.Game.currentGame,
        player: state.Game.player,
    };
}

class Cell extends Component {


    render() {
        const { currentGame, index, player, dispatch } = this.props;

        return (
            <td onClick={((e) => dispatch({ type: CHANGE_CELL, payload: index + '/' + player, invert:  index + '/' + (player === 1 ? 0 : 1) }))} >
                {currentGame.indexOf(index + '/1') !== -1 && <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" >
                    <path fill={"#545454"} d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
                </svg>}
                {currentGame.indexOf(index + '/0') !== -1 && <svg viewBox="0 0 128 128">
                    <path strokeDasharray={"301.635"} strokeDashoffset={"0"}  fill={"#f2ebd3"} d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16" />
                </svg>}
            </td>
        );
    }
}

export default connect(
    mapStateToProps,
)(Cell);