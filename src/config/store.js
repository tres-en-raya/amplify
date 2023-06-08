import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import reducer from "./reducer";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer,  applyMiddleware(sagaMiddleware))

sagaMiddleware.run(saga);