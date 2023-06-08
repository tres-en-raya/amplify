import { call, all, spawn } from 'redux-saga/effects'
import { exportSagas as GameSagas } from '../services/game.service';

function* rootSaga () {
    const sagas = []
        .concat(GameSagas)

    yield all(sagas.map(saga =>
        spawn(function* () {
            while (true) {
                try {
                    yield call(saga)
                    break
                } catch (e) {
                    console.log(e)
                }
            }
        }))
    );
}

export default rootSaga;
