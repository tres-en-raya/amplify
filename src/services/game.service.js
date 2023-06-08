import { takeEvery, call, put, select } from 'redux-saga/effects';
import delay from "../shared/delay";
import {API, Auth, graphqlOperation} from 'aws-amplify';

export const CHANGE_CELL = "CHANGE_CELL";
export const SET_WINNER = "SET_WINNER";
export const SET_ACTION = "SET_ACTION";
export const SET_USER = "SET_USER";
export const SET_RESET = "SET_RESET";
export const SET_HISTORY = "SET_HISTORY";
export const APPLY_HISTORY = "APPLY_HISTORY";
export const START_GAME = "START_GAME";

export const PLAYER_WIN = "PLAYER_WIN";
export const ROBOT_WIN = "ROBOT_WIN";
export const UNKNOWN_WIN = "UNKNOWN_WIN";
export const LETS_GO = "LETS_GO";


export const TRY_LOGIN = "TRY_LOGIN";
export const TRY_CONFIRM = "TRY_CONFIRM";
export const TRY_LOGOUT = "TRY_LOGOUT";
export const TRY_REGISTER = "TRY_REGISTER";
export const SET_FORM_ERROR = "SET_FORM_ERROR";


export const ACTION_MENU = "ACTION_MENU"
export const ACTION_LOGIN = "ACTION_LOGIN"
export const ACTION_REGISTER = "ACTION_REGISTER"
export const ACTION_CONFIRM = "ACTION_CONFIRM"
export const ACTION_START = "ACTION_START"
export const ACTION_GAME = "ACTION_GAME"
export const ACTION_BLACK = "ACTION_BLACK"
export const ACTION_WINNER = "ACTION_WINNER"
export const ACTION_EMOJI = "ACTION_EMOJI"
export const SET_LOGIN = "SET_LOGIN";


/**
 * Initial state.
 */
const initialState = {
    currentGame: [],
    player: 1,
    lastCellSuccess: false,
    winner: '',
    actionStep: '',
    history: [],
    user: {},
    login: {
        username: '',
        password: '',
        firstname: '',
        verify: '',
    },
    lastFormError: '',
};

/**
 * Actions handlers.
 */
const ACTION_HANDLERS = {
    [CHANGE_CELL]: (state,action) => {
        const success = state.winner === '' && state.currentGame.indexOf(action.payload) === -1 && state.currentGame.indexOf(action.invert) === -1;
        return {
            ...state,
            lastCellSuccess: success,
            currentGame: success ? [...state.currentGame].concat([action.payload]) : [...state.currentGame],
        }
    },
    [SET_LOGIN]: (state,action) => ({
        ...state,
        login: {...Object.assign({},state.login,action.payload)},
    }),
    [SET_WINNER]: (state,action) => ({
        ...state,
        winner: action.payload,
    }),
    [SET_ACTION]: (state,action) => ({
        ...state,
        actionStep: action.payload,
    }),
    [APPLY_HISTORY]: (state,action) => ({
        ...state,
        history: action.payload,
    }),
    [SET_FORM_ERROR]: (state,action) => ({
        ...state,
        lastFormError: action.payload,
    }),
    [SET_USER]: (state,action) => ({
        ...state,
        user: action.payload,
        actionStep: ACTION_START,
    }),
    [SET_RESET]: (state,action) => ({
        ...state,
        actionStep: ACTION_START,
        currentGame: [],
        lastCell: '',
        winner: '',
    }),
    [START_GAME]: (state,action) => ({
        ...state,
        actionStep: ACTION_GAME,
        currentGame: [],
        lastCell: '',
        winner: '',
        history: [],
        player: action.payload
    }),
};


const checkGame = (game,check) => {
    //check rows player
    if ([0,1,2].map(r => [0,1,2].map(s => r + '/' + s + '/' + check).filter(s => game.indexOf(s) !== -1).length === 3).filter(s => !!s).length > 0) {
        return true;
    }

    //check columns
    if ([0,1,2].map(r => [0,1,2].map(s => s + '/' + r + '/' + check).filter(s => game.indexOf(s) !== -1).length === 3).filter(s => !!s).length > 0) {
        return true;
    }

    //check diagonal
    if ([0,1,2].map(s => s + '/' + s + '/' + check).filter(s => game.indexOf(s) !== -1).length === 3)
        return true;


    if ([0,1,2].map(s => s + '/' + (2 - s) + '/' + check).filter(s => game.indexOf(s) !== -1).length === 3)
        return true;

    return false;
}

const resultGame = (game = [], player = 1) => {
    if (checkGame(game, player))
        return PLAYER_WIN;

    if (checkGame(game, player === 1 ? 0 : 1))
        return ROBOT_WIN;

    //check full
    if (game.length === 9)
        return UNKNOWN_WIN;

    return LETS_GO;
}

export const getGanador = (ganador) => {
    if (ganador === PLAYER_WIN) return 'jugador';
    if (ganador === ROBOT_WIN) return 'robot';
    return 'empate'
}


/**
 * Export Redux reducers.
 */
export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    let nextState = {...state};

    return handler ? handler(nextState, action) : nextState;
}

/**
 * Robot's movement
 *
 * @returns {Generator<*, void, *>}
 */
function* _robotsMovement(action) {
    try {
        const game = yield select(s => s.Game);
        if (game.winner !== '') return;
        if (!game.lastCellSuccess && action.type !== START_GAME) return;
        if (action.payload === 1 && action.type === START_GAME) return;

        const result = resultGame(game.currentGame,game.player);

        switch (result) {
            case "LETS_GO":
                if (!!action.robot) return;

                const left = [0,1,2].map(r =>
                    [0,1,2].map(s => r + '/' + s + '/' )
                        .filter(s => {
                            return game.currentGame.indexOf(s + game.player) === -1 && game.currentGame.indexOf(s + (game.player ? 0 : 1)) === -1
                        })
                        .join(',')).join().split(',').filter(s => s !== action.payload).filter(s => s);

                const cell = left[Math.floor(Math.random() * left.length)];

                yield put({type: CHANGE_CELL, payload: cell + (game.player === 1 ? 0 : 1), invert: '', robot: true});
                break;
            default:
                yield call(() => API.graphql( graphqlOperation(createResult, { input: {
                        "ganador": result,
                        "play": game.player,
                        "sub": game.user.sub,
                        "email": game.user.email,
                        "createTime": Math.ceil((new Date()).getTime() / 1000),
                    } })));

                yield put({type: SET_WINNER, payload: result})
                yield put({type: SET_ACTION, payload: ACTION_BLACK});
                yield call(() => delay(1));
                yield put({type: SET_ACTION, payload: ACTION_WINNER});
                yield call(() => delay(1));
                yield put({type: SET_ACTION, payload: ACTION_EMOJI});

                yield put({type: SET_HISTORY });
                break;
        }
    } catch (e) {
        console.debug('TresEnRaya. Squad PHP 2.1. Catch error ' + JSON.stringify({
            message: e.message,
            trace: e.trace
        }))
    }
}

export function* robotsMovement() {
    yield takeEvery(CHANGE_CELL, _robotsMovement);
    yield takeEvery(START_GAME, _robotsMovement);
}

export const createResult = /* GraphQL */ `
    mutation createResult(
        $input: CreateResultsInput!
        $condition: ModelResultsConditionInput
    ) {
        createResults(input: $input, condition: $condition) {
            id
            ganador
            play
            sub
            email
            createTime
        }
    }
`;

export const getResultsQuery = (email) => ( /* GraphQL */ `
  query getResults {
      listResults(filter: { email: { eq: "${email}" } }, limit: 100, sortDirection: DESC) {
        nextToken
        items {
            id
          ganador
          play
          email
          createdAt
            createTime
        }
  }
}
`);

/**
 * Update history
 *
 * @returns {Generator<*, void, *>}
 */
function* _updateHistory(action) {
    try {
        if (action.type === SET_ACTION && [ACTION_MENU,ACTION_LOGIN,ACTION_REGISTER,ACTION_CONFIRM].indexOf(action.payload) !== -1) return;

        const user = yield select(s => s.Game.user)


        const { data: { listResults: { items } } } = yield call(() =>
            API.graphql({
                query: getResultsQuery(user.email),
            }));

        yield put({type: APPLY_HISTORY, payload: items.sort((a,b) => a.createTime < b.createTime ? 1 : -1 ) })

    } catch (e) {
        console.debug('TresEnRaya. Squad PHP 2.1. UpdateHistory. Catch error ' + JSON.stringify({
            response: e.response,
            code: e,
            message: e.message,
            trace: e.trace
        }))
    }
}
export function* updateHistory() {
    yield takeEvery(SET_HISTORY, _updateHistory);
    yield takeEvery(SET_USER, _updateHistory);
    yield takeEvery(SET_ACTION, _updateHistory);
}


/**
 * Sign in
 *
 * @returns {Generator<*, void, *>}
 */
export function* tryLogin() {
    yield takeEvery(TRY_LOGIN, function* _tryLogin(action) {
        try {
            yield put({type: SET_FORM_ERROR, payload: ''})

            const login = yield select(s => s.Game.login);

            const empty = ['username','password'].find(s => (login[s] || '').trim() === '')
            if (empty) {
                yield put({type: SET_FORM_ERROR, payload: empty})
                return;
            }

            const response = yield call(() => Auth.signIn( login.username, login.password));

            yield put({type: SET_USER, payload: response.attributes})
        } catch (e) {
            if (e.code === 'UserNotConfirmedException')
            {
                yield put({type: SET_ACTION, payload: ACTION_CONFIRM});
                return;
            }
            yield put({type: SET_FORM_ERROR, payload: e.code})
            console.debug('TresEnRaya. Squad PHP 2.1. tryLogin. Catch error ' + JSON.stringify({
                message: e.message,
                code: e.code,
                trace: e.trace
            }))
        }
    });
}

/**
 * Create account
 *
 * @returns {Generator<*, void, *>}
 */
export function* tryRegister() {
    yield takeEvery(TRY_REGISTER, function* _tryRegister(action) {
        try {
            yield put({type: SET_FORM_ERROR, payload: ''})

            const login = yield select(s => s.Game.login);

            const empty = ['username','password','firstname'].find(s => (login[s] || '').trim() === '')
            if (empty) {
                yield put({type: SET_FORM_ERROR, payload: empty})
                return;
            }

            yield call(() => Auth.signUp({
                attributes: {
                    email: login.username,
                    given_name: login.firstname,
                }, username: login.username, password: login.password
            }));
            yield put({type: SET_ACTION, payload: ACTION_CONFIRM})
        } catch (e) {
            yield put({type: SET_FORM_ERROR, payload: e.code})
            console.debug('TresEnRaya. Squad PHP 2.1. tryRegister. Catch error ' + JSON.stringify({
                message: e.message,
                trace: e.trace
            }))
        }
    });
}

/**
 * Sign out
 *
 * @returns {Generator<*, void, *>}
 */
export function* tryLogout() {
    yield takeEvery(TRY_LOGOUT, function* _tryLogout(action) {
        try {
            yield call(() => Auth.signOut());
            yield put({type: SET_ACTION, payload: ACTION_MENU})
        } catch (e) {
            console.debug('TresEnRaya. Squad PHP 2.1. tryLogout. Catch error ' + JSON.stringify({
                message: e.message,
                trace: e.trace
            }))
        }
    });
}

export function* tryConfirm() {
    yield takeEvery(TRY_CONFIRM, function* _tryConfirm(action) {
        try {
            yield put({type: SET_FORM_ERROR, payload: ''})
            const login = yield select(s => s.Game.login);
            yield call(() => Auth.confirmSignUp(login.username, login.verify));
            yield put({type: SET_ACTION, payload: ACTION_LOGIN })
        } catch (e) {
            yield put({type: SET_FORM_ERROR, payload: e.code})
            console.debug('TresEnRaya. Squad PHP 2.1. tryConfirm. Catch error ' + JSON.stringify({
                code: e.code,
                message: e.message,
                trace: e.trace
            }))
        }
    });
}

export const exportSagas = [ robotsMovement, updateHistory, tryRegister, tryLogin, tryLogout, tryConfirm ]